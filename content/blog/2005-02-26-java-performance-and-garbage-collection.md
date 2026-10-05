---
title: "Java Performance and Garbage Collection"
date: 2005-02-26T13:23:31+00:00
updated: 2005-02-26T13:23:31+00:00
url: /blog/2005/02/26/java-performance-and-garbage-collection/
draft: false
comments: 0
---

I've never really read a lot about Java performance tweaking which is something I'm going to change in the future. Partially because of a new job that will presumably require these skills, partially because it's just quite interesting to see what the guys at Sun and other companies did under the hood of the JVM.

There are two general areas, optimization of your code and tweaking of the JVM parameters. I found really <a href="http://java.sun.com/docs/hotspot/gc5.0/gc_tuning_5.html">interesting information about GC tweaking at Sun</a> (they have a truly ugly stylesheet for that article, but Opera users can use the custom stylesheet ...).

More about memory management can be found in <a href="http://www.javaspecialists.co.za/archive/Issue098.html">this article about Soft-,  Weak- and PhantomReferences</a>. I hadn't heared about these and the <a href="http://java.sun.com/j2se/1.5.0/docs/api/java/lang/ref/package-summary.html">package java.lang.ref</a> at all before. Looks very interesting especially for server applications that need caches.

So far about memory management. I'm still lacking information about performance programming dos and don'ts. Apart from general stuff programmers should know (virtual functions, allocation/deallocation, ...) I haven't read much about things in Java. Can anyone recommend me a good book about java performance programming?
