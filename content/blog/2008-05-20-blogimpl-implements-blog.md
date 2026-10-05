---
title: "BlogImpl implements Blog"
date: 2008-05-20T15:27:13+00:00
updated: 2008-05-20T15:27:13+00:00
url: /blog/2008/05/20/blogimpl-implements-blog/
draft: false
comments: 3
---

There's a weird thing you'll see all over the place in Java frameworks and applications of all kind. One might call it <b>Implitis</b>.

The symptoms are that each and every class implements some interface, and it's always the sole implementor of the interface. So you have a Blog and a BlogImpl, a Window and a WindowImpl, and so forth.

While in some cases there may be reasons for this pattern (e.g. Java's limited visibility rules force you to make some methods public that really shouldn't be), I think in many cases this is just someone who has read some book, and now wants to decouple everything and everyone.

If there is only one thing that implements your Foo interface, and you can't even give it a better name than FooImpl, I declare this a code smell. If the class is conceptually any different from it's interface, there should be a qualifying name addition for that, like a DatabaseFoo vs. a FileFoo, or a MailFoo vs. an HTMLFoo. If not, you're probably just complicating you application for no apparent reason.

I was reminded of this by the Spring criticism, see last post. This really ticks me off, people talking with glazing eyes off decoupled everything (do they realize that decoupled means no connection whatsoever? how does that work then?), and in practice only writing horribly complicated, ugly, implitis-infected code.
