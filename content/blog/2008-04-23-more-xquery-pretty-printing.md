---
title: "More XQuery pretty printing"
date: 2008-04-23T17:57:59+00:00
updated: 2008-04-23T17:59:00+00:00
url: /blog/2008/04/23/more-xquery-pretty-printing/
draft: false
comments: 0
---

I've upgraded the XQuery pretty printer once again. It's actually surprisingly difficult to get whitespace handling and indentation only close to 'right', at least in a language that is syntactically as complex as XQuery.

This version should insert whitespace at the correct places, properly handle long lines in many more cases (before, you'd get long runs of empty lines in some cases), and remove whitespace in other cases.

I've also added some options for the curious. You can now <a href="http://java.martin-probst.com/xqpretty/format.html?q=for+%24x+in+1+to+10%0D%0Areturn+%3Chello+x%3D%22123%22%3E%7B+%24x+%7D%3C%2Fhello%3E&mode=HTML">display regular HTML</a>, <a href="http://java.martin-probst.com/xqpretty/format.html?q=for+%24x+in+1+to+10%0D%0Areturn+%3Chello+x%3D%22123%22%3E%7B+%24x+%7D%3C%2Fhello%3E&pure=true&mode=HTML">pure HTML with no other tags around it</a>, <a href="http://java.martin-probst.com/xqpretty/format.html?q=for+%24x+in+1+to+10%0D%0Areturn+%3Chello+x%3D%22123%22%3E%7B+%24x+%7D%3C%2Fhello%3E&mode=TEXT">plain text, indented</a>, <a href="http://java.martin-probst.com/xqpretty/format.html?q=for+%24x+in+1+to+10%0D%0Areturn+%3Chello+x%3D%22123%22%3E%7B+%24x+%7D%3C%2Fhello%3E&mode=PARSE_TREE">the parse tree before formatting</a>, and <a href="http://java.martin-probst.com/xqpretty/format.html?q=for+%24x+in+1+to+10%0D%0Areturn+%3Chello+x%3D%22123%22%3E%7B+%24x+%7D%3C%2Fhello%3E&mode=PRE_INDENT">the HTML before it is run through the indenter</a>. The options are available through the <a href="http://java.martin-probst.com/xqpretty/format.html">XQuery formatter form</a>, too.

Of course you can get all the other formatting modes without HTML decoration around it, too. And as you can see you can easily construct URLs for the formatter. So the only thing left is to wire this up to my JavaScript syntax highlighting in this blog, and I'll have nicely formatted XQuerys!
