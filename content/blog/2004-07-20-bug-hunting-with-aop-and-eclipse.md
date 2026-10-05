---
title: "Bug hunting with AOP and Eclipse"
date: 2004-07-20T12:04:23+00:00
updated: 2004-12-02T16:48:50+00:00
url: /blog/2004/07/20/bug-hunting-with-aop-and-eclipse/
draft: false
comments: 0
---

Today I stumbled across an Eclipse Plugin called <a href="http://www.csg.is.titech.ac.jp/~usui/bugdel/index-e.shtml">Bugdel</a>. Bugdel provides an Aspect Weaver to include debugging code into your existing Java applications. This results in a clear separation of debugging/logging code and real application logic which is generally regarded to be a Good Thing &trade;.

Bugdel supports the common set of points to weave aspects into as method calls, method executions, field getting and settings etc. It's also possible to weave aspects to line numbers. Bugdel supports wildcards in method and class names so you can easily weave certain debugging aspects to a lot of methods.

What looks really good is the integration into Eclipse. Bugdel provides an own Editor to Eclipse (based on the standard Java editor) where you can easily add the "pointcuts" (Bugdel term for AOP join points).

I have to look into this to find out whether the Bugdel pointcuts can only be used from within Eclipse. It would be great if they could also be compiled into the app using Ant or something similar.

Bugdel is distributed under the terms of the CPL (IBMs OpenSource license). I only took a glimpse at the CPL but it looks kind of strange to me. I'll read some more on it.

(via <a href="http://www.eclipse-plugins.info/eclipse/plugin_details.jsp?id=640">Eclipse Plugins</a>)
