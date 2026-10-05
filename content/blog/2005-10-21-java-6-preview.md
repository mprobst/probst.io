---
title: "Java 6 Preview"
date: 2005-10-21T23:44:48+00:00
updated: 2005-10-21T23:54:59+00:00
url: /blog/2005/10/21/java-6-preview/
draft: false
comments: 0
---

<a href="http://weblogs.goshaky.com/weblogs/page/lars/20051021#java_6_mustang_gtk_look">Lars Trieloff is happy that Java 6 Swing picks up GTK themes</a>. While that is certainly nice, what I like a lot more is that Java 6 runs <a href="http://www.x-hive.com/products/db/">a certain native XML database</a> about 15% faster in our benchmarks.

Of course it's quite hard to tell why, but it seems that Java 6 is bringing several new optimisations to the HotSpot virtual machine, most notably the ability to have small, local objects created on the stack, and not on the heap. That saves general allocation overhead plus the time needed for GC, so this may or may not be a reason. Anyways, it's cool, and quite suprising that they can still get such big improvements.
