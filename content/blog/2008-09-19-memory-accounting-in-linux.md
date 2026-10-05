---
title: "Memory accounting in Linux"
date: 2008-09-19T09:07:06+00:00
updated: 2008-09-19T09:08:18+00:00
url: /blog/2008/09/19/memory-accounting-in-linux/
draft: false
comments: 0
---

Once again random processes on my virtual server running this blog were killed, due to out of memory errors. This time, it actually led to some outage, because Apache was killed.

Normally, Apache servers the whole blog from a static cache, and only comments and new posts are handled by Rails, which makes the whole thing pretty fast - otherwise it would be unusable. Rendering single requests takes something close to seconds on my MacBook Pro, and thus much longer on the vserver. I have no idea why, and it's probably some bug in my own implementation, but introducing efficient caching was both easier and more interesting than performance tracing the rails code.

This is getting quite annoying. I have 128 MB guaranteed memory on the vserver, and this is simply not enough for Apache, SVN, Rails, and Tomcat. Interestingly, Tomcat is much less of a culprit than Rails, which consumes a lot more memory through the several process instances, as I <a href="http://www.martin-probst.com/blog/2008/04/09/memory-usage-java-vs-rails">found out earlier</a>.

The bad thing is that there really is currently no way under Linux to find out which of your applications is actually using your memory, and how much of it. RSS, VSZ, "size" and others simply don't give any relevant insight into memory usage - the only thing you can probably do is look at memory consumption, start the app, and compare. Which is a pretty bad state, IMHO.

Lately I found that the /proc filesystem provides a 'smaps' file for each process, which contains its memory mappings, each explained with segment, rss, private and shared pages. This might actually lead to a useful memory analysis. One could probably write a simple tool that reports the private memory usage of each process, and accounts the memory usage through shared libraries to the apps using them. This should probably separate fixed cost (i.e., the shared memory consumed by running anything Ruby based) and dynamic costs (i.e., the added private memory for each Ruby/Rails instance).

I've started playing around a bit with a small Ruby script, and maybe if I have some spare time, I can turn it into something useful, though this will probably take a lot of learning about virtual memory in Linux.

Maybe I'm just using the wrong tools or operating systems, but I find it somehow depressing that we don't have a proper way of accounting memory  to applications. It's really annoying that even today a badly written application that does something like <code>while (true) malloc(...);</code> can effectively bring down your whole system...
