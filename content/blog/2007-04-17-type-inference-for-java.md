---
title: "Type inference for Java"
date: 2007-04-17T22:23:17+00:00
updated: 2007-04-17T22:24:00+00:00
url: /blog/2007/04/17/type-inference-for-java/
draft: false
comments: 0
---

InfoQ has an <a href="http://www.infoq.com/news/2007/04/type-inference">article on Type inference for Java</a>.

Commenter Steve Jones states the following:

<blockquote>Type inference is just a case of complete laziness and is brought to us by the same sort of people who think that typing is the most time consuming part of the exercise. 

Are there people who really think that the problem with Java is that there are too many characters in a .java file? It would be great to see some efforts focused around making Java a better language for support and professional development. Things like contracts on methods and classes (ala Eiffel) would be nice.

Saving 5 characters just because you think that will be quicker? Complete and utter muppetry.</blockquote>

Actually, yes I do. One problem with Java is indeed the amount of code that needs to be written. And generating code using some IDE is not a solution - code gets read a lot more often than written, so helping with writing doesn't help at all. Code needs to be easier to understand, not easier to write.

Java files tend to get enormous in size, even for really mundane tasks. This is partially due to bad APIs (I blogged about my experience of <a href="http://www.martin-probst.com/2007/01/20/embedding-xslt-transformations-in-jars-or-how-i-learned-to-not-love-the-resolver/">putting an XSLT transformation in a self-contained JAR</a>). The other part is just the language itself. I'd really hope that good type inference could solve a lot of the ugly to read code. It will require quite a change in how to write APIs, i.e. be more explicit on the return type of things in the method name. 

But still, reducing the SLOCs must be the major goal of any language. Reduce complexity, and the best measure for complexity is still to this day the number of lines of code. Given any certain task, the solution that requires less code is almost always easier to understand.
