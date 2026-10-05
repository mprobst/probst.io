---
title: "Silent errors from JSTL"
date: 2008-01-31T16:15:00+00:00
updated: 2008-05-13T15:15:36+00:00
url: /blog/2008/01/31/silent-error-loss-from-jstl/
draft: false
comments: 0
---

The <a href="http://java.sun.com/products/jsp/jstl/">JavaServer Pages Standard Tag Library</a> appears to have <a href="http://www.crazysquirrel.com/computing/java/jsp/jstl-not-working.jspx">a</a> <a href="http://www.manning-sandbox.com/thread.jspa?threadID=13401">habit</a> of silently failing to work.

<h3>Boring technical details</h3>

Today I ran into a very nice issue: I tested and coded my webapp against Tomcat 6.0 with a version 2.5 web.xml. Deploying this on Tomcat 5.5 on the target system seemed to work: no errors, database was filling from webservice, Spring worked, I could access webpages, etc. But due to the niceness of JSTL a c:choose statement containing an EL expression was always false, so the page always came up with no content. Very nice to debug, as no error or anything shows up and the developer of course assumes some failure to load data.

End of the story: JSTL silently fails if the web.xml version tag and Tomcat combination doesn't fit JSTLs expectations. I needed to change my web.xml to 2.4.

<h3>Slightly less boring rant</h3>

Another example of really great software: include a versioning scheme, but don't give any errors if versions don't match, but rather silently fail.

While Java has it's deficiencies, I'm beginning to think that much could be fixed by replacing the totally broken toolchain (yes, Maven, Tomcat & Co.; I'm looking at you!) with proper software.

My current hit list would be:
<ul>
<li>Tomcat - for sins against humanity in configuration, error messages, and general ease of use</li>
<li>Maven - which I thankfully didn't have to use, for the most broken implementation of a nice idea ever</li>
<li>JSPs - PHP-style tag soup still sucks if you give it a fancy name. Added points for two different but equally broken programming models in one package</li>
<li>Excessive configuritis - everything in Java land wants to be configured in some ugly, custom XML file format, or - even worse - in a generic, standard XML format where you have to program Java method calls and object construction graphs in XML syntax</li>
</ul>

And there's still a lot missing on that list.

The JVM is an awesome platform, and Java as a language is totally tolerable, and most of the platforms/libraries even sound rather sane in theory, but are a real pain to work with in practice. It's interesting to see that a small group of Ruby guys was able to craft a tool chain that's much easier to use in so little time, with no big vendor support. I think Java web applications are looking for some sort of a Rails like renovation, or they will fade into irrelevance.
