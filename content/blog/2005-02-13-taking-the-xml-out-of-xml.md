---
title: "Taking the XML out of XML?"
date: 2005-02-13T12:10:45+00:00
updated: 2005-02-13T12:11:48+00:00
url: /blog/2005/02/13/taking-the-xml-out-of-xml/
draft: false
comments: 1
---

<p>You could use regular expressions <a href="http://weblogs.goshaky.com/weblogs/trackback/lars/Weblog/streaming_xpath_you_don_t">Lars</a> ;-)</p>

<p>But seriously, why would you want to do that? The major good things about XML are interoperability and that you don't need to flatten hierarchical data structures like in relational data storage. And you're proposing some sort of a flat query language on a tree-based data structure?</p>

<p>What good would that be? You're forcing developers who start to finally drop that "data flattening" attitude to walk back that abstraction again to write queries in a pattern matching language as if the input was a big string with special boundary symbols. Even if this had a positive effect on performance (which it probably wouldn't, it's basically the same as writing XPath expressions for a streaming processor) you would get another impedance mismatch. Writing such patterns would really be difficult, comparable to using SAX directly.</p>

<p>XPath and XPath 2 are languages designed for accessing trees and (at least for the simple things) very intuitive for someone who has worked with filesystem paths. They are good for exactly that. I don't see the point in querying something that is semantically a tree as if it was a flat line of event symbols using a pattern matching language.</p>
