---
title: "Why do XML APIs suck?"
date: 2005-02-09T00:32:52+00:00
updated: 2005-02-09T00:36:21+00:00
url: /blog/2005/02/09/why-do-xml-apis-suck/
draft: false
comments: 3
---

<p><a href="http://www.megginson.com/blogs/quoderat/archives/2005/02/08/the-complexity-of-xml-parsing-apis/">The complexity of XML parsing APIs</a> seems to be a general complaint about XML parsing APIs. So why do these APIs suck?</p>

<p>I've worked with the three major API styles myself (DOM, SAX, XML Push thingies) and yes, they do suck. But if you come to think about why they suck and how to make them better you'll find out it might be about your programming language. I've used these APIs with Java and C++ (or C) and it was unbelievably complex and hackish to navigate and recognize the XML structure. Even navigation to some element at the child axis takes a lot more code than it should. Creating XML is just a nightmare, just writing out pointy parentheses to a stringbuffer or the equivalent is way easier than using any API. But after all, how would you formulate that in Java (without just using an XPath library) in a better way?</p>

<p>I think the problem is using an imperative language with good support for single leveled structured data of statically known types to query/modify/whatever a data type which is strongly oriented on hierarchical, dynamic, ordered structures. To really manage this you would need a language that provides built-in support for lists, hierarchical navigation and a good approach to dynamic typing. Also it would need to be extensible to really mary the XML support with the language. So you could either go and create/use something like EAX or CΩ (C-omega) or start with XQuery. XQuery sounds like a better candidate as stable engines with good typing support seem to be a lot less science fiction than the other languages.</p>

<p>Implementing something XML-ish starting of with writing a SAX consumer is IMHO just the wrong approach. It seems to be like implementing a GUI application starting of with raw drawing primitives and a user event queue. Those things have to be done, but they should be done ideally only once. In a slightly less ideal world it will be several times but at least not every application programmer.</p>

<p>Oh and yes, there will be a performance drawback with using an interpreted high-level language like XQuery. But if you really need that performance in the area where your application is dealing with XML you might be either one of the guys who really has to use DOM and SAX or your doing really strange stuff ;-)</p>
