---
title: "Packages, Classes, Methods - Scopes?"
date: 2007-04-01T16:57:06+00:00
updated: 2007-04-04T08:51:34+00:00
url: /blog/2007/04/01/packages-classes-methods-scopes/
draft: false
comments: 1
---

I wonder why there is a distinction between the concepts of packages, classes, and methods. If you think about it a bit, it's all just scopes. You could simply drop the distinctions.

A scope is an basic building block in a programming language that has
<ul>
<li>a parent scope</li>
<li>a set of child scopes</li>
<li>a set of static fields</li>
<li>a set of non-static fields</li>
</ul>

Scopes can be instantiated - in the case of packages, it's loading the package. In the case of classes, it's actually instantiating the class. In the case of methods, it's calling the method. Instantiating a scope will initialize the non-static fields to something and yield a a scope instance - the activated package, an object instance or the functions stack frame/closure. The scope instance can then be passed around and members of it can be called.

To make it look nicer, you would probably end up providing some syntactic sugar like how function calls return their 'return value' member by default or something. But there doesn't really seem to be a big conceptual difference here. Packages are currently not used or implemented in this instantiation way (or are they? OSGi?), but I think this might be really beneficial...

The idea probably doesn't hold up, but whatever, it sounded nice at first :-)
