---
title: "Wiring up Jersey JAX-RS & Hibernate"
date: 2008-04-22T11:42:51+00:00
updated: 2008-04-22T11:49:10+00:00
url: /blog/2008/04/22/wiring-up-jersey-jax-rs-hibernate/
draft: false
comments: 0
---

Recently I started playing with JAX-RS, and in particular Jersey's implementation thereof. JAX-RS is specified in <a href="http://jcp.org/en/jsr/detail?id=311">JSR311</a>. The goal is to create a common annotation-based library to ease the development of RESTful Java web applications.

So far, this is really nice. The basic idea is that you annotate your Java classes that represent resources with URI templates through the @Path annotation, and the framework takes care of mapping requests, parameters and so on. At the moment, this approach seems a lot more natural to me than other stuff I tried (Spring MVC for example).

Of course, some assembly is required ;-) My goal was to wire up Jersey's resource classes with Hibernate (JPA flavor), so that resources can directly map to persistent classes. This should allow for a pretty natural development process - decide on your resources, annotate them for persistence, and publish them on the web through Jersey annotations.

I had to jump through three hoops to get this working.

<h2>Opening a transaction for web requests</h2>

This was fairly simple. If you resources are persistent classes, you'll need a database session to load and manipulate them. I created a class ("Persistence") that stores Hibernate Sessions in a ThreadLocal variable, so that resources can access it.

The only trouble was that Jersey's default ServletContainer class has it's service() method marked final, so I couldn't override it to open a transaction before the request and close it afterwards. After some playing with AspectJ, I  figured that it's easier to simply create my own HttpServlet that only wraps Jersey's servlet. All methods forward to Jersey's ServletContainer, but the service() method looks like this:

```
  @Override
  public void service(HttpServletRequest req, HttpServletResponse resp) throws ServletException,
      IOException {
    System.out.println("Start transaction");
    String method = req.getMethod();
    boolean readonly = "GET".equals(method) || "HEAD".equals(method);
    try {
      persistence.open(readonly);
      container.service(req, resp);
      if (readonly) {
        System.out.println("Read only - rollback");
        persistence.rollback();
      } else {
        System.out.println("Transaction commit");
        persistence.commit();
      }
    } catch (RuntimeException e) {
      System.err.println("Transaction rollback");
      persistence.rollback();
      throw e;
    }
  }
```

Paul Sandoz of Jersey changed <code>service()</code> to be non-final, so in the future you should be able to simply inherit from ServletContainer for this.

<h2>Loading persistent resources from Hibernate</h2>

By default, Jersey simply instantiates resource classes (those with a @Path annotation) using the default constructor. Of course this doesn't work when your classes are supposed to be loaded from a persistent store.

There are two possibilities here. First is to always access persistent classes through a container class that represents the whole collection, and that isn't persistent itself:

<h3>Persistent sub-resources</h3>

```
@Path("books")
class Books {
  @Path("{id}")
  Book getBook(@PathParam("id") long id) { ... }
}
```

Pro: fairly simple. We'll see how to properly inject the Hibernate session into resource classes in the next session.

Con: your paths are slightly less cool. You'll have <code>/books/12</code> instead of <code>/book/12</code>, and also you'll be in trouble with implicit views where <code>/books/new</code> is supposed to map to Books, but then use some <code>new.jsp</code> to render an HTML input form. Also, if you have many sub resources it might be a bit ugly to force all requests through some initial container class, instead of only manipulating the nested resource.

<h3>Hooking into resource creation</h3>

The second method is to hook into Jersey's way of instantiating resources. Instead of using the plain SerlvetContainer from Jersey, you can override it and tell it to use your own ComponentProvider, which is basically your own IoC container.

I created a HibernateComponentProvider like this. Persistence is our persistence class from above:

```
public class HibernateComponentProvider implements ComponentProvider {

  private final Persistence persistence;

  public HibernateComponentProvider(Persistence persistence) {
    this.persistence = persistence;
  }

  public <T> T getInjectableInstance(T instance) {
    return instance;
  }

  public <T> T getInstance(Scope scope, Class<T> c) throws InstantiationException,
      IllegalAccessException {
    T o = c.newInstance();
    inject(o);
    return o;
  }

  @SuppressWarnings("unchecked")
  public <T> T getInstance(Scope scope, Constructor<T> constructor, Object[] parameters)
      throws InstantiationException, IllegalArgumentException, IllegalAccessException,
      InvocationTargetException {
    Class<T> clazz = constructor.getDeclaringClass();
    Entity entity = clazz.getAnnotation(Entity.class);
    if (entity != null && parameters.length == 1) {
      // assume find by id
      T instance = (T) persistence.getSession().get(clazz, (Serializable) parameters[0]);
      if (instance == null) {
        throw new WebApplicationException(Response.Status.NOT_FOUND.getStatusCode());
      }
      inject(instance);
      return instance;
    } else {
      T instance = constructor.newInstance(parameters);
      inject(instance);
      return instance;
    }
  }

  public void inject(Object instance) {
    // no-op for us
  }

}
```

This is a bit hackish. If a resource has a visible default constructor, <code>getInstance(Scope, Class)</code> will be called. If we instead have a public constructor that takes a single long parameter, <code>getInstance(Scope, Constructor, parameters)</code> will be called. At that point, we can check if the class is a persistent class (marked by the <code>Entity</code> annotation), and if so, load it from Hibernate instead of instantiating it the normal way.

The trouble is that I don't quite understand how Jersey picks the proper constructor yet, so this might break. Also, it kind of sucks that we have to provide a constructor that is never going to be used, just for Jersey to give us access to the parameters. But maybe this will get better in the future?

Anyways, you can now write your persistent class like this:

```
@Path("book/{id}")
@Entity
class Book {
  public Book(@PathParam("id") long id) { /* no-op, or whatever */ }
}
```

And you'll get the properly loaded persistent instance automagically.

Pro: nice URLs, more natural development, somehow seems right to me.

Con: some more work, resource classes might get injected twice, no idea if this will break due to the constructor picking stuff. Also, you may not provide another public constructor, which is kind of against the spirit of non-invasive annotation based frameworks. Hopefully we'll hear more about this.

<h2>Injecting persistent resource classes</h2>

One more thing we have to do is inject our persistent classes after load with the fields managed by Jersey. The problem is that if we simply load a class from Hibernate, e.g. as the result of a query, it will bypass Jersey's injection, and injected properties such as UriInfo or HttpContext will not be set.

Hibernate provides hooks into the object life cycle via the <code>org.hibernate.Interceptor</code> interface. I've changed my Persistence class to extend <code>org.hibernate.EmptyInterceptor</code>, and override <code>onLoad()</code> like this:

```
@Override
public boolean onLoad(Object entity, Serializable id, Object[] state, String[] propertyNames,
    Type[] types) {
  provider.inject(entity);
  return super.onLoad(entity, id, state, propertyNames, types);
}
```

Provider is a ComponentProvider we obtained from the WebApplication (see next section), and through the <code>inject()</code> call the loaded entity will get it's UriInfo and friends.

Combining this with the above HibernateComponentProvider will mean that in some cases (directly loaded root resources) classes will get injected twice, but that shouldn't be a problem. Well. I hope :-)

<h2>Wiring it all up</h2>

The only thing left is to wire all this stuff together. As I said, we have our own servlet that simple wraps a ServletContainer from Jersey. But we'll have to extend this ServletContainer to override it's configuration methods to supply our own component providers etc. Enter HibernatingServletContainer, a nested class of our custom Servlet:

```
  private final class HibernatingServletContainer extends ServletContainer {
    @Override
    protected void configure(ServletConfig sc, ResourceConfig rc, final WebApplication wa) {
      super.configure(sc, rc, wa);

      wa.addInjectable(Session.class, new Injectable<Context, Session>() {
        @Override
        public Class<Context> getAnnotationClass() {
          return Context.class;
        }

        @Override
        public Session getInjectableValue(Context a) {
          return persistence.getSession();
        }
      });

      wa.addInjectable(ComponentProvider.class, new Injectable<Context, ComponentProvider>() {
        @Override
        public Class<Context> getAnnotationClass() {
          return Context.class;
        }

        @Override
        public ComponentProvider getInjectableValue(Context a) {
          return provider;
        }
      });
    }

    @Override
    protected void initiate(ResourceConfig rc, WebApplication wa) {
      persistence = new Persistence();
      wa.initiate(rc, new HibernateComponentProvider(persistence));
      provider = wa.getComponentProvider();
      persistence.setComponentProvider(provider);
    }
  }
```

This basically creates our persistence instance (which loads the Hibernate configuration and provides transactions), registers our own HibernateComponentProvider with the web application and retrieves the ComponentProvider from Jersey's WebApplication (which wraps our own provider) so we can use it later.

First, <code>configure()</code> is called. This method delegates to it's parent, but then adds two additional injectable classes: the Hibernate Session, retrieved from persistence, and the ComponentProvider itself, which we'll need later.

Then initiate is called, which sets up our Persistence layer and our ComponentProvider. All happy and fine, now we can start to write our actual application code :-)

<h2>Using it</h2>

Using this code you will have to remember two things: classes that need Hibernate sessions, e.g. for queries or to persist instances, will need to get them injected like this:

```
@Path("books")
class Books {
  @Context Session session;
}
```

And when you need to instantiate sub-resources, for example when a resource is created by a POST request, you'll need to create them through the ComponentProvider. This way, their own @Context annotated fields will be set up properly:

```
@Path("books")
class Books {
  @Context Session session;
  @Context ComponentProvider provider;

  @POST
  @ConsumeMime("...")
  public Book createBook(...) {
    Book book = provider.getInstance(Scope.ApplicationDefined, Book.class)
    book.setFields(...);
    session.persist(book);
    return book;
  }
}
```

It might be easier to create resources from their representations through a BookProvider or similar, but I'll have to look into that another time.

I hope this will help people to get started with Jersey and Hibernate. I'm still researching this stuff, so maybe I'll come up with a better solution later. I'm also not yet sure if the whole thing - directly accessing persistent classes as resources - turns out to be a good idea, but I'm quite confident.
