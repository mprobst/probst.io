---
title: "Storing XML"
date: 2004-05-25T12:17:54+00:00
updated: 2004-12-03T17:20:21+00:00
url: /blog/2004/05/25/storing-xml/
draft: false
comments: 0
---

I'm currently doing research on how to store XML with object-oriented means. It's of course rather trivial to store XML somehow. The interesting question is which system makes most sense if the XML is to be queried using XPath or XQuery expressions.
&lt;!--more--&gt;
Just to write down some of the ideas:

<ul>
  <li>Standard DOM - not really efficient because of the awful lot of pointers. If one element is changed, lots of others have to be updated too</li>
  <li>AST/TA developed at the Humbold University in Berlin - interprete XML Nodes as a tree-structured index above a simple text array with the contents of the XML file. This can probably be implemented quite efficient using a double-linked list of strings or whatever.<br />Might be useful if your XML application is very text-centered, e.g. true XHTML files where the Markup can be considered eye-candy.</li>
  <li>eXist style with pseudo nodes inflating every partial tree to be symmetric. This makes sibling questions very easy, but on every update a full rebuilding of the tree is necessary.</li>
</ul>

Also a lazy update of pointer lists might be nice. Every XML node keeps a list of pointers to the nodes on its axis like siblings, predecessors, children, successors etc. which is kind of virtual. It's only created when needed and updated if certain timestamps (which have to be somehow kept in the data dictionary) are updated.
