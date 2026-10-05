---
title: "Applied XML in RSS, SOA(P) and REST"
date: 2005-03-29T15:46:08+00:00
updated: 2005-03-29T15:46:08+00:00
url: /blog/2005/03/29/applied-xml-in-rss-soap-and-rest/
draft: false
comments: 3
---

Lately there have been lots of debates about SOAP vs REST. To quickly summarize it: both SOAP and REST are about making ressources accessible via the web using XML. They have two different solutions for this. SOAP provides a toolkit that (in the best case) seamlessly integrates with your programming language of choice and provides the access to ressources by e.g. method calls on an object. This is done by providing a machine-readbale definition of the interface (WSDL file).

REST is about not providing a toolkit but rather defining simple APIs using HTTP GET, POST, PUT and DELETE as the commands, passing around chunks of XML. People argue that this is simpler than SOAP with all it's toolkits (which are partially incompatible to each other etc.) and much more similar to the current architecture of the web, which is a great success after all.

Now all this stuff about Service Oriented Architectures seems to be marketing speak. But will REST really be better then SOAP? RSS feeds are an XML application which is already deployed very widely. It's supported by many different tools in a read-only mode and by some even with a posting method.

The pro for REST is that RSS somehow works. People started providing content via HTTP GET in some rather loosley defined format, other people wrote aggregators for these ressources, and today we can read news from many different sites on our desktops easily.

The con is the effort needed to provide RSS support. Some of this comes from the "loosely defined format". But the biggest part is from malformed XML, at least as far as I can see (blog posts by prominent RSS tool authors seem to support this). There is hardly any feed out there that really adheres the format. Additionally, there are lots of feeds out there which aren't even XML. There is a huge amount of issues, from simple bad nesting to unescaped content, double-escaped content, bad namespaces, bad content encodings, etc. pp. And this is not even about adhering to a special schema. XML looks as if it was very easy to write and read, but in reality it's a lot more complicated than you might think.

Now what does this mean for REST? I think it is very likely that all custom XML applications where people don't use toolkits, but rather write angle bracktes themselves, will suffer from the mentioned problems. You might argue that this is not such a big problem as RSS reader authors seem to get along with it too. But in this case everyone who wanted to use a specific REST application would need to write some magic, ultra-liberal parsing application. She wouldn't be able to use XML technologies like XPath, DOM, XSLT out of the box, she wouldn't even be able to use SAX.

Apart from that, assuming people were able to at least provide valid XML. What about the API. With RSS it's relatively easy, there is only one big GET. But what if you wanted to provide more, like GET last 5 posts? You would start inventing an API, e.g. via query strings. Nothing bad about that, but how do you document that API? As far as I have seen it, most documentation in companies is done using Word documents. Most of this documentation is either too old, barely understandable, much too short, simply wrong or a combination of these.

A decent SOAP toolkit would provide the XML serialization of objects. It would also provide a basic minimum of documentation of the API (people would at least know which functions exist). Noone really has to care about the exotic WS-* stuff, but it's there if you need it.

REST might be good for really small, really simple applications. But if you want to start something bigger, something that might involve lots of developers, might change over time, has an API that provides more than two methods, you should really use a toolkit or it will be a mess.
