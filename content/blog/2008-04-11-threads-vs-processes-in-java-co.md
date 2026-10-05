---
title: "Threads vs. Processes in Java & Co."
date: 2008-04-11T08:13:31+00:00
updated: 2008-04-11T08:13:31+00:00
url: /blog/2008/04/11/threads-vs-processes-in-java-co/
draft: false
comments: 5
---

Erik Engbrecht posted a <a href="http://erikengbrecht.blogspot.com/2008/04/multiprocess-versus-multithreaded.html">very interesting article on Multiprocess versus Multithreaded System design</a>. It includes a lot of insight, but just one quote:
<blockquote>
<p>One one hand on most operating systems threads involve less overhead than processes, so it is more efficient to use multiple threads than multiple processes. On the other hand multiple processes ultimately will give you better reliability because they can be spawned and killed independently from one another.</p>
<p>[...]</p>
<p>My rule of thumb is to look at the amount of shared data or messaging required between concurrent execution paths and balance against how long the "process" (not OS process) is expected to live.</p>
</blockquote>

I think one important point is missing here. It's the question of what your underlying framework is, and how you access it.

Early on, C-written CGI applications were an acceptable solution as the applications mostly used the underlying UNIX system as their framework and API. Spawning a simple process that more or less only accesses the basic C library in a short lived transaction is fast and safe.

But eventually applications get more and more complex, and you will have more and more shared functionality that is accessed in a library fashion. You will want to write this in the same language and environment as your application, as this makes debugging, lifecycle management etc. much easier.

As these libraries start to get more complex, their initialization will start to take significant time and resources. And at some point, you will no longer be able to load them every time a request hits your CGI program.

So now you can either put those into some kind of daemon that is accessed by IPC, or you will have to create a long running server process that handles multiple requests, either sequentially (FCGI) or even truly multithreaded like todays Java servers.

It's also not just the cost of initializing these libraries, it's also their footprint. As <a href="/blog/2008/04/09/memory-usage-java-vs-rails">I've written before</a>, running a herd of mongrels can get really expensive, memory wise.

<h2>MVM a solution?</h2>

That being said, losing the simplicity and reliability of processes is indeed highly problematic. I'm not sure about the state of Sun's <a href="http://java.sun.com/developer/technicalArticles/Programming/mvm/">Multi VM</a> project, which was designed to solve some of these issues.

Maybe this thing could be overcome if our programming languages allowed us to define application parts that are effectively stateless, ambient libraries, executing more or less purely functional (well, except for logging and such...) once they are initialized.

If you could define such constraints on program parts, you could have your cake and eat it, too. Multiple instances of your application could share a possibly very large part of their code base, but you could still kill single instances at will, as they don't share state with other instances.

The problem is with the "more or less" part of "purely functional". I'm not sure if it's actually possible to find that niche where you can still have some state. And of course you would have to be ably to statically prove those constraints, or else everything is moot.

Also highly interesting in this context is Microsofts <a href="http://research.microsoft.com/os/Singularity/">Singularity</a>, which achieves a runtime that doesn't need processes but still has all the nice properties of processes (isolation, 'kill -9'), due to some carefully chosen, statically verifiable constraints.
