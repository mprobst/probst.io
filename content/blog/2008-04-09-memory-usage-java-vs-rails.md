---
title: "Memory usage, Java vs. Rails"
date: 2008-04-09T09:52:51+00:00
updated: 2008-04-09T09:52:51+00:00
url: /blog/2008/04/09/memory-usage-java-vs-rails/
draft: false
comments: 3
---

This blog is running on a virtual server at <a href="http://www.hosteurope.de">Hosteurope</a>. The server is running a plain Apache 2, my Subversion repository, this blog, and since yesterday a Tomcat instance for the <a href="/blog/2008/04/08/xquery-pretty-printer">XQuery pretty printer</a>.

The interesting part in getting Tomcat to run was (apart from some mod_jk problems) that I exhausted the 128 MB of memory my virtual server has. Which  surprised me a bit - the JVM instance should not consume more than 64 MB, so who was taking all that memory?

This is the current list, according to RSS, which is not precise, but still:
<ul>
<li>Apache 2 - several processes, a total of some 10 megabytes</li>
<li>MySQL - about 25 MB</li>
<li>Java/Tomcat - about 55 MB</li>
<li>Ferret - a Lucene port for Ruby, providing full text search for the blog, about 15 MB</li>
<li>Mongrel/Rails - the blog, about 35 MB per instance</li>
</ul>

The interesting point is that due to Ruby not supporting kernel threads and Rails generally being single threaded (boo!), I end up with a lot more memory consumed for e.g. a simple blog running 3 mongrel instances plus ferret. RSS includes shared libraries and non-writable memory, but pmap -d reports something like 41592K non shared, private writable memory for the mongrel process.

I had to reduce the number of mongrels to one, so that I can run a Java VM on this host. Thus, my server can only process one concurrent request from one user at this time. When the Ruby process is waiting for filesystem or database operations, nothing else gets processed, even though CPU time would be available.

This is indeed pretty annoying. Some 50 MB don't seem much memory on a regular desktop machine these days, but for (shared) hosting, it still is a large issue. In the case of my puny blog this isn't really a problem, plus I've set up decent caching so most requests will be handled directly by Apache, but still...

Maybe switching to <a href="http://merbivore.com/">Merb</a> and Ruby 1.9 (or JRuby) would be useful, though I have no idea if that really runs concurrently in one process, or if it's just generally possible.
