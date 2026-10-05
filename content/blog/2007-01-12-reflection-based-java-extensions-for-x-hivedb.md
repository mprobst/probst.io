---
title: "Reflection based Java extensions for X-Hive/DB"
date: 2007-01-12T17:34:48+00:00
updated: 2007-01-12T17:49:57+00:00
url: /blog/2007/01/12/reflection-based-java-extensions-for-x-hivedb/
draft: false
comments: 1
---

I've just finished a nice feature for X-Hive/DB 8.0, Java extensions based on reflection. The idea is to use reflection to introspect in a Java class and provide the functionality there to an XQuery statement. This is (intentionally) quite similar to functionality in other XQuery or XSLT implementations. Example:
<pre class="prettyprint">
import namespace math = 'java:java.lang.Math';
$math:PI, $math:sqrt(4)
</pre>

<h3>Type marshalling</h3>

Most of the work went into type marshalling from XQuery to Java and back. The code inspects Java method and constructor parameters and then creates appropriate parameters for it from whatever is passed in XQuery, casting types as necessary (using XQuery type promotion). The code also maps Java collections as necessary, using Java 5 generics to find the actual type. So this basically means you can write:
<pre class="prettyprint">String getFoo(Iterator<org.w3c.dom.Element> it, String[] s, int x);</pre>
And in XQuery:
<pre class="prettyprint">
import module namespace x = 'java:package.MyClass';
let $nodes := //foo
let $s := ("hello", "world")
return x:get-foo($x, $nodes, $s, 5)
</pre>
... and X-Hive/DB will automatically create the required arrays/iterators etc. Same goes for return values. It currently understands anything that is Iterable, Iterator, Lists and Collections, Arrays, and Sets. You might have noticed the extra $x parameter - this is an instance of MyClass as non-static methods naturally need an instance of the declaring class. Such instances can be constructed using constructors via x:new(...) or passed in via external variables. Also note that the Java-ish "getFoo" is translated to a more XQueryish "get-foo" :-)

I think this is really handy. It should also not be that expensive as all reflection stuff is done at compile time, so in large queries this should not make a difference. Additionally you can of course always create your XQuery once and re-use it. 

I initially started to implement this to make an integration with the Java Servlet API less painful. I.e. you would import a module from 'java:javax.servlet.http.HttpServletRequest' and access it's methods to handle sessions and such. More on that in a later post.

<h3>Academic re-use</h3>

Coincidentally, this project was also a nice match with my University schedule. I held a presentation about Java reflection in the <a href="http://www.hpi.uni-potsdam.de/lehre/lehrangebot/veranstaltung/meta_programming.html">Metaprogramming and reflection course</a> this semester, and was able to use examples and experience from the code there. The drawback of the topic was that research on Java reflection is actually quite boring. The other topics included somewhat esoteric Smalltalk stuff, dynamic languages (Ruby, Python) etc. To compensate this I started looking into Erlang ;-)

<h3>Bad books</h3>

While doing research for that paper I found a sample chapter from the book "Java Reflection in Action" (<a href="http://www.manning.com/forman/">the book</a> and <a href="http://www.manning-source.com/books/forman/forman_chp5.pdf">the sample chapter</a>) about "Call stack introspection". The book describes how you might use Throwable.getStackTrace() to inspect the current call stack. Quite surprisingly they recommend this to prevent infinite recursion, do logging, and <b>for security checks</b> to see if the code calling you came from the right package. However they do not mention that it's totally o.k. for JVMs to randomly leave out any or even all the information from that, even though that's <a href="file:///System/Library/Frameworks/JavaVM.framework/Versions/1.5.0/Resources/Documentation/Reference/doc/api/java/lang/Throwable.html#getStackTrace()">clearly documented in the API</a>.
