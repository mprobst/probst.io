---
title: "Namespace prefixes in XML"
date: 2004-11-07T18:34:38+00:00
updated: 2005-02-01T15:57:17+00:00
url: /blog/2004/11/07/namespace-prefixes-in-xml/
draft: false
comments: 0
---

In the latest <a href="http://www.w3c.org/TR/2004/WD-xquery-20041029/">W3C XQuery Working Draft</a> the type <code>xs:QName</code> was altered. In former specifications it represented a qualified name as the namespace URI in combination with the local name, now the XQuery processor has to keep track of the user defined namespace prefix too. This seems to be a minor change which is useful to convert <code>xs:QName</code>s into strings, but in my opinion it's a major change of the data model.

The question is whether to see an XML document as a text document or whether to interprete it as a tree of nodes. The former way has the pro that users editing XML documents with notepad will usually be less suprised by the actual results of queries. While this would be nice, I think it's a horrible idea for a structure oriented query language, especially in a database context.

While designing an XQuery database we quite stumbled over such questions very often. What about whitespaces and indentation, what about character references, what about XML namespace prefixes etc., I'm sure there are still things to come. Others have run into this kind of problems too as you can read <a href="http://www.25hoursaday.com/weblog/PermaLink.aspx?guid=9b799a26-c1f9-40ba-9502-e30569c39e11">this post from Dare Obasanjo</a>.

I think the only clean solution is to draw a line clearly separating the text representation and the tree representation of XML documents. In the tree representation, namespaces are just unique IDs and the prefixes are completely ignorable. Each qualified name has a namespace ID, but once it has been transformed from text to tree representation the namespace prefix is gone. Same goes for ignorable whitespace, character references and CDATA sections. Otherwise it becomes really tedious to store such things as where namespaces were declared with which prefix or you would even need to store texts twice, once in a normalized format usable for full text search and once in the representation the user expects. But what happens if these contents are updated?

Assigning prefixes, escaping non-representable characters to (character- or entity-) references, inserting CDATA sections and many other things are presentational logic. This might be handled by the XML editor or by an output filter when converting XML documents into their text representation, everything else clearly borks things outside the text representation. And even worse  it keeps people thinking of XML as text with a bunch of angle brackets, as opposed to tree-structured data.
