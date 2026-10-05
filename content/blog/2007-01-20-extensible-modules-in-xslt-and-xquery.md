---
title: "Extensible modules in XSLT and XQuery"
date: 2007-01-20T13:14:46+00:00
updated: 2007-01-20T13:14:46+00:00
url: /blog/2007/01/20/extensible-modules-in-xslt-and-xquery/
draft: false
comments: 0
---

Michael Kay <a href="http://saxonica.blogharbor.com/blog/_archives/2007/1/20/2665644.html">notices something on the extensibility of XSLT vs. XQuery code</a>:

<blockquote>(2) It's interesting to note how hard it would be to do this in XQuery. The main XQueryX stylesheet certainly benefits immensely from XSLT's top-down apply-templates processing model, but in theory it could have been written in XQuery. The modification layer, however, that changes the behaviour of the transformation to do something slightly different, would be quite impossible to add without modifying the source code of the original query. This is an observation I've made in a number of larger applications: once you want to write code that can be reused for more than one task, XSLT has quite a few features that make it a stronger candidate for the job than XQuery.</blockquote>

Where "this" is importing an existing stylesheet and overwriting part of it's implementation by redefining a specific template. This is indeed something that is currently very difficult in XQuery. Templates are somewhat like a function in XSLT, and it's possible to selectively overwrite/replace certain templates/functions. 

Quite remarkably this kind of extensibility wouldn't even possible if XQuery had higher order functions - in that case the original module would have had to anticipate that someone might want to replace that certain function.
