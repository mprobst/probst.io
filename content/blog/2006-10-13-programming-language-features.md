---
title: "Programming language features"
date: 2006-10-13T09:49:32+00:00
updated: 2006-10-13T09:49:32+00:00
url: /blog/2006/10/13/programming-language-features/
draft: false
comments: 0
---

<a href="http://www.joelonsoftware.com/items/2006/10/12.html">Joel Spolsky reviews "Beyond Java"</a>:
<blockquote>
Programming consists of overcoming two things: accidental difficulties, things which are difficult because you happen to be using inadequate programming tools, and things which are actually difficult, which no programming tool or language is going to solve. An example of an accidental difficulty is manual memory management, e.g. "malloc" and "free," or the singleton classes people create in Java because they don't have top level functions. An example of something which is actually difficult is dealing with the subtle interactions between different parts of a program, for example, figuring out all the implications of a new feature that you just added.
</blockquote>
I'm not so sure this is correct, at least the example is quite bad. Managing the subtle interactions between different parts of a program can be made a lot easier by programming language features. That, and particular programming styles (aka patterns), but most of those are only enabled by programming language features.

For example, the Model-View-Controller pattern eases managing the interaction between parts of your application, and it's near impossible without an object oriented programming language. Or encapsulation of data types, which reduces the impact of modifying the actual (physical) data representation on the rest of the program. Or polymorphism, which eases adding additional data types.

I think this list goes on, and also spreads into other areas of programming. For example generators ("yield") in python.

Programming language features enable us to use/invent new patterns, which in turn make programming easier. There are hard problems and they will probably stay hard, but certain programming techniques can make them at least a bit easier (ie. look at the new java.util.concurrent libraries for Threading).
