---
title: "XQuery too complex?"
date: 2005-12-06T09:22:10+00:00
updated: 2005-12-06T09:30:24+00:00
url: /blog/2005/12/06/xquery-too-complex/
draft: false
comments: 1
---

I'm repeatedly reading that XQuery was 'too complex', i.e. from <a href="http://www.stylusstudio.com/xmldev/200511/post30060.html">Uche Ogbuji on xml-dev</a> or in <a href="http://www.xmldatabases.org/WK/blog/6530_XML_is_done.item">this  article</a>. That may be true if your implementing an XQuery engine, but the surprising thing is that this is mostly claimed by XQuery users (not implementors!).

I kind of wonder why. Sure, the spec took much too long, it's quite complicated, and with all it's references too static typing, XML schema etc. it can be quite scary. But which user reads the spec? And why should they?

What you have to know about XQuery are three things:
<ul>
	<li>XPath is a part of the language, it directly works</li>
	<li>XML is part of the language, just type ahead</li>
	<li>The FLWOR statement is useful for XML aggregation</li>
</ul>

What you don't need to know (but may find interesting) is: there is a lot more to XQuery (functions, typing, ...), but it wont get into your way if you don't explicitly ask for it. The whole syntax a newbie who knows XPath and XML, e.g. the typical XSLT 1.0 user, has to understand is this:

```
  let $foo := "bar"
  for $x in doc('a.xml')/my/xpath[@attr = $foo]
  for $y := doc('b.xml')/more/xpath
  where $x/@id = $y/@id
  order by $x/name
  return
    <newtag>{ $x/name, $y/address }</newtag>
```

There's a lot more out there, but this is everything you really have to know. <code>for</code> loops and <code>let</code> statements to aggregate XML, <code>where</code> for easy-to-use joins, XPath to actually get the data, XML literals to group it together. If that's too complex for you, I don't know. Anyone who was able to twist his mind around XSLT should be able to use that. Plus, in the areas where XSLT 1.0 fails horribly (strings, grouping, ...) XQuery provides the functionality without forcing you to write 20 lines of stylesheet code for "replace($haystack, $needle, $replacement)". This is just a subset of what XQuery has to offer, but it's the most important part, and it's the part that gives the user direct, large benefits over other XML technologies (XSLT, XPath) in querying XML. 

The working group took a long time, actually too long, but this is something they really did right. There is a subset, a 'core' as Uche Ogbuji calls it, that gives all the important benfits and is really easy to learn.
