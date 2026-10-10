---
title: "Blog on AppEngine, Java, Jersey / JAX-RS"
date: 2012-03-07T21:02:22.574000+00:00
updated: 2012-03-07T21:48:02.082000+00:00
url: /blog/2012/03/07/Blog-on-AppEngine-Java-Jersey-JAX-RS/
draft: false
comments: 0
---

Continuing the theme that I mostly use  this blog to experiment with software, not so much for writing an actual blog, I moved over the software from Django/Python to Java, both running on <a href="http://code.google.com/appengine/">AppEngine</a>.

<h3>Django Out</h3>

First of all, I'll have to admit that I'm not a Python programmer. I can program in the language, but I don't feel at home. I've never really used it long enough at a time to grow familiar with the APIs and the pythonic way of doing things. I still struggle to remember the basic string manipulation APIs and such. I've always felt that Python is a nice, clean language (except for the constant "self." that is), I've just never gotten around to use it enough.

That being said, coming from Rails, <a href="https://www.djangoproject.com/">Django</a> is a big step back, and <a href='http://www.allbuttonspressed.com/projects/django-nonrel'>Django nonrel</a>, the patch to make Django run on AppEngine, is worse. Django itself lacks a lot of things taken for granted in Rails, and Django non-rel is not only cumbersome to install, it also lacks many of the compelling features of Django (e.g. the automated administration backend).

So I didn't really see a compelling reason to stay with Django, and as I wanted to move away anyway, I could go back to Java as well. I also wanted to play around with a couple of Java technology pieces that seem nice.

<h3>Jersey In</h3>

I've used Jersey from time to time before. It's a web framework that revolves mostly around HTTP. Jersey (and JAX-RS) is not trying to abstract HTTP away, it's trying to model HTTP well and give a good framework to program on the web, which resounds with me a lot.  It's geared towards writing RESTful APIs more than towards writing actual dynamic web sites, so a bit of setup/customization is required, but nothing too bad.

Jersey of course only gives you the basic web interaction layer, i.e. the controller. I'm using <a href="http://code.google.com/p/objectify-appengine/">Objectify</a> to persist Plain Old Java Objects (POJOs) for the (trivial) models, <a href="https://developers.google.com/closure/templates/">Closure Templates</a> to render views, and <a href="http://code.google.com/p/google-gson/">Gson</a> to convert model objects into JSON like data structures for the views (Closure doesn't support accessing POJOs directly so that it can support Java and JavaScript from the same templates).

<h3>Validation</h3>

I haven't really found any compelling library for validation. <a href="http://jcp.org/en/jsr/detail?id=303">JSR 303</a>'s model driven approach through annotations seems nice, <a href="http://static.springsource.org/spring/docs/current/spring-framework-reference/html/validation.html">Spring Validation</a> is more of a (quite trivial?) utility library, and I'm not going to touch <a href="http://commons.apache.org/validator/">Apache Commons Validator</a> and its XML configuration with a 10 foot pole. I ended up just rolling something similar to Spring's support library on my own; after all it's only a trivial blog.

<h3>Form Support</h3>

The other thing missing from a productive toolkit is converting from submitted form data to objects (application/x-www-url-encoded, not multipart/form-data). Spring MVC offers something like that with its Command or Form objects, but that seems not very useful if not combined with all the rest of Spring. Given that we have an excellent library for JSON->POJO conversion with Gson, maybe it'd just be a naming convention for form fields that allows translating them to JSON (a bit like Objectify translates Datastore's simple maps to objects). Again, not really needed for a blog.

<h3>Webstack</h3>

Overall I'm quite happy with it. If you don't opt into Java's traditional AbstractViewHandlerControllerFactory patterns (Spring, I'm looking at you) you can end up with pretty productive environments. None of the components I use are overly ceremonial, nothing needs "configuration", and no XML involved in any form, you can even (mostly) get around web.xml and appengine-web.xml :-) I do realize that all of this is complete overkill for a tiny blog, as is writing your own blog in the first place. On the other hand, I kind of enjoy putting these pieces together and writing something on AppEngine, and I'm always interested in seeing how hard it is or how easy it should be to build certain things.

It's always hard to get started from nothing, and I suspect this might be interesting for others. I'll write a couple of blog posts about the different parts of the system, including putting it together using Guice.
