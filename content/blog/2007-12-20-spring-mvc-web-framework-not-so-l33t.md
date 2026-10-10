---
title: "Spring MVC / web framework. not so l33t"
date: 2007-12-20T13:03:20+00:00
updated: 2011-12-10T11:25:51.898000+00:00
url: /blog/2007/12/20/spring-mvc-web-framework-not-so-l33t/
draft: false
comments: 2
---

I'm currently digging into the Spring framework a bit and just finished walking through the <a href="http://www.springframework.org/docs/Spring-MVC-step-by-step/index.html">step-by-step tutorial</a>. It creates a simple application that displays a list of products, and then allows you to increase the price of all of them. The price increase is validated and persisted in an HSQL database.

Behold the line counts:

```
      23 ./.classpath
      23 ./.project
      33 ./bin/test-context.xml
      16 ./build.properties
     308 ./build.xml
       5 ./db/create_products.sql
       2 ./db/load_data.sql
       1 ./db/server.sh
       0 ./db/test.lck
     151 ./db/test.log
      17 ./db/test.properties
      10 ./db/test.script
      39 ./src/springapp/domain/Product.java
      23 ./src/springapp/repository/InMemoryProductDao.java
      48 ./src/springapp/repository/JdbcProductDao.java
      11 ./src/springapp/repository/ProductDao.java
      20 ./src/springapp/service/PriceIncrease.java
      53 ./src/springapp/service/PriceIncreaseValidator.java
      11 ./src/springapp/service/ProductManager.java
      29 ./src/springapp/service/SimpleProductManager.java
      36 ./src/springapp/web/InventoryController.java
      46 ./src/springapp/web/PriceIncreaseFormController.java
      37 ./test/springapp/domain/ProductTests.java
      45 ./test/springapp/repository/JdbcProductDaoTests.java
     100 ./test/springapp/service/SimpleProductManagerTests.java
      26 ./test/springapp/web/InventoryControllerTests.java
      33 ./test/test-context.xml
       2 ./war/index.jsp
      54 ./war/WEB-INF/applicationContext.xml
       3 ./war/WEB-INF/classes/jdbc.properties
      12 ./war/WEB-INF/classes/messages.properties
      18 ./war/WEB-INF/jsp/hello.jsp
       5 ./war/WEB-INF/jsp/include.jsp
      30 ./war/WEB-INF/jsp/priceincrease.jsp
      34 ./war/WEB-INF/springapp-servlet.xml
      33 ./war/WEB-INF/web.xml
    1337 total
```

So apart from telling me that either I or Spring are indeed totally 1337, how on earth do they justify this? To be fair, it's about 200 lines less if you don't calculate the DB log and the Eclipse specific files, but still, well over 1000 LOC for that?

What's even worse is the number of concepts you have to understand. Apart from the probably ok Java and SQL stuff - why do we need a build file that says essentially "do as usual", but on >300 lines? And in the particular funny ant style - lots of <code>&lt;property name="src.dir" value="src"/></code>. When did this change the last time? Why do we need a JSP taglib for even the most basic stuff? Separate setup for the application server for each tiny project? Three separate properties files? Lots of copying  jars around?

And then all the XML configuration. >150 LOC not counting the build file. With gems like this:

```
      <property name="driverClassName" value="${jdbc.driverClassName}"/>
      <property name="url" value="${jdbc.url}"/>
      <property name="username"  value="${jdbc.username}"/>
      <property name="password" value="${jdbc.password}"/>
```

Isn't that the kind of stupid, repetitive task we created computers for?

<h2>Repeated bloat</h2>

And it's not just the one-time setup. Creating the form to increase prices with, i.e. a simple form to enter exactly one integer requires these five(!) components. The PriceIncreaseFormController (50 LOC), the PriceIncrease class to hold the integer(!) (20 LOC), the PriceIncreaseValidator (50 LOC), the priceincrease.jsp (30 LOC), and the XML configuration to glue it all together with 10 lines. That's 160 lines of code for one simple form, without the code that actually performs the operation or any tests.

<h2>Loosely coupled XML</h2>

Something else that bugs me is the looseness of this thing. Not as in loose coupling, but as in "loose and falls apart". Spring uses Java, a static, compiled, type checked language. This static-ness results in less expression, but usually better performance and earlier-caught errors. So far so good. But then we outsource half of our application logic into XML configuration files, with no checks at all. With an abundance of unchecked references to Java classes, field names, hard coded and duplicated URLs and so forth.

The benefits of a compiled language like Java are effectively eliminated by this. Typos in XML files will create NullPointerExceptions at runtime, refactoring doesn't work anymore and the code cannot be understood as is anymore, but only through reading several XML files. This dispersion of single concerns into lots of files really scares me.

<h2>A better framework?</h2>

I wonder if this mess is simply due to Java or if there is a better way of doing this. I have seen references to Spring's annotation based configuration, maybe that helps a bit. Even in static Java it should be possible to do better, with some reflection and by-convention magic.
