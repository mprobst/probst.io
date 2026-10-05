---
title: "More proof that XML Schema is A Bad Thing (tm)"
date: 2006-07-12T09:41:07+00:00
updated: 2006-07-14T06:22:09+00:00
url: /blog/2006/07/12/more-proof-that-xml-schema-is-a-bad-thing-tm/
draft: false
comments: 0
---

I'm currently converting the <a href="http://www.w3.org/TR/xqupdateusecases/">XQuery Update Facility Use Cases</a> into our XML format to use them as preliminary test cases for X-Hive's implementation.

The use cases include several tow test documents that have schema information. Both are invalid in my schema editor (&lt;oXygen/> XML editor) - one because of the order of elements (attribute definitions after sequence in a complexType), the other because something doesn't work with qualified element names and "ref"erences to elements in the schema. I'm not an expert on XML Schema (thank God) so I don't know whether it's my processor that's wrong or the documents. 

The error messages of the tool were something like "there is something wrong here", or alternatively misleading ("components without a namespace cannot be imported from document ....xsd", but it's not at all about the document, apparently), so it's been quite annoying to fix.

The same document set includes three files with a DTD, all of them work.

X-Hive 8.0 will probably have support for RELAX NG, so there is some bright light at the end of the tunnel.
