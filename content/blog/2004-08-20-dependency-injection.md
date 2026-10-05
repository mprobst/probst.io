---
title: "Dependency Injection"
date: 2004-08-20T08:15:15+00:00
updated: 2004-12-02T16:49:18+00:00
url: /blog/2004/08/20/dependency-injection/
draft: false
comments: 0
---

<a href="http://jroller.com/page/rickard/20040814#dependency_injection_and_open_vs">Rickard Oberg writes about Dependency Injection</a>. This is completely new to me but it looks like an interesting approach. Oberg is using a Container called <a href="http://www.picocontainer.org/">Pico</a> to manage his Java objects, their lifecycle and their dependencies. He writes about new design goals he adopted after writing code using Pico.

Pico can be used to group objects together in a container. If you have dependencies between your objects (especially objects which need another objects in their constructor) Pico will try to solve them using reflection. After adding several classes to a PicoContainer you can start the whole container and Pico will create your objects and start those which are capable of doing something.

By grouping objects together in nested containers you can manage whole cloud of dependent objects. This looks nice, but it obviously needs a lot of thinking in the design phase as well as a really different approach to OO software design. Pico (and possibly other similar frameworks) hide the dependencies, object configuration and lifecycle issues from the programmer. This might be a good idea in many situations but I'm pretty sure that you can blow an impressively big hole into your own foot with this.
