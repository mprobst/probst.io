---
title: "Streaming XPath with SAX"
date: 2005-02-12T13:03:12+00:00
updated: 2005-02-12T13:06:46+00:00
url: /blog/2005/02/12/streaming-xpath-with-sax/
draft: false
comments: 1
---

<a href="http://weblogs.goshaky.com/weblogs/trackback/lars/Weblog/xpath_is_a_nice_dom">Lars writes:</a>
<blockquote><p>But I like SAX much more than DOM. It is faster, has reduced memory-consumption and I you have to think some seconds before you start to work, which leads to code that looks as if someone has thought about the problem before starting to write something. </p>

<p>It is obvious that a tree-based approach that is used by XPath cannot be used to wrap a SAX-like API. Perhaps STXPath, which is used for Streaming Transformations for XML (STX) might be a solution. This seems the be exacly the problem David Megginson already thinks of .</p></blockquote>

<p>That's actually not quite true. You can process at least a subset of XPath using a SAX-alike parser. See <a href="http://www.cs.umd.edu/projects/xsq/">here (XSQ)</a> or <a href="http://www.oreillynet.com/pub/wlg/2410">here (O'Reilly: Streaming XPath)</a> for a product and an overview with some pointers. There's also something going on in the .NET world (e.g. <a href="http://weblogs.asp.net/cazzu/archive/2004/02/13/XseIntro.aspx">here</a>). It's generally a subset because evil stuff like the ancestor axis is really painful to do in such systems, even though it's possible with large buffers. But the subset includes the important things like the child axis, generally every forward axis and you can even achieve predicates, again with buffers. I've read a paper about this though I lost the link to it, was quite interesting. The general idea was to visit XML tree elements (SAX events) only once but query tree elements a lot more often to see if they match.</p>

<p>Streaming XPath is IMHO the only solution to query big XML files if you don't have an XML database. Simple queries are even not necessarily slower, at least not slower than reading a big XML file into DOM and executing queries on that. It's probably sufficient for simple applications but for complex queries (or general queries, e.g. not a subset of XPath but all the axis and semantic sugar) it will probably be slower.</p>

<p>PS: reading more into the <a href="http://stx.sourceforge.net/documents/spec-stx-20040701.html">STX</a> it seems like an effort to standardize streaming XPath processors. Especially the STXPath seems to be interesting. The specification defines some sort of a minimum context for processors to provide. Programmatically <a href="http://www.tkachenko.com/blog/archives/000159.html">this example of a streaming XPath .NET API</a> seems interesting. It shows how you can filter relevant nodes out of a stream and assign a handler to them. This seems to remove the need to implement awkward DOM navigation or SAX handlers (mind you, context aware ones!) but leaves the interpretation/handling of the XML to you own C# code. This should - for example - enable users to easily parse XML and create their internal data representation from it.</p>
