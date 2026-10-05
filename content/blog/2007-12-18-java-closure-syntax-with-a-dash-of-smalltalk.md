---
title: "Java closure syntax with a dash of Smalltalk"
date: 2007-12-18T12:24:34+00:00
updated: 2007-12-18T12:24:34+00:00
url: /blog/2007/12/18/java-closure-syntax-with-a-dash-of-smalltalk/
draft: false
comments: 0
---

I just came across a curious paragraph in the <a href="http://wiki.java.net/bin/view/JDK/ClosuresSyntaxInJava7">Closure Syntax Proposal for Java 7 by Gilad Bracha, Neal Gafter, James Gosling, and Peter von der Ahé</a>, on page 8:

<blockquote>
<p>We are also experimenting with generalizing this to support an invocation syntax that interleaves parts of 
the method name and its arguments, which would allow more general user-defined control structures that 
look like if, if-else, do-while, and so on.</p>
<p>This doesn't play well with the return statement being given a new meaning within a closure; it returns 
from the closure instead of the enclosing method/function. Perhaps the return from a closure should be 
given a different syntax: </p>
<p><code> ^ expression; </code></p>
</blockquote>

Note the Smalltalk-ish "^" return symbol, with the reference to interleaving method name parts and arguments before. I first thought this was an insider joke, but they seem to be serious about that ;-)

Other than that the proposal is really nice, I think. It fits very well into the existing Java syntax - the new blocks are simply blocks as they always have been, and the syntax for nested functions looks exactly like regular Java methods. They also seem to have made up their minds about the necessary type system changes.
