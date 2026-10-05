---
title: "Create a document browser with XQuery in 50 SLOC"
date: 2006-04-22T15:49:44+00:00
updated: 2006-04-22T15:52:05+00:00
url: /blog/2006/04/22/create-a-document-browser-with-xquery-in-50-sloc/
draft: false
comments: 0
---

Some time ago I was asked to create a quick demo of how to create a documentation browser with X-Hive/DB. The idea was to present one huge document with a tree navigation on the left and the content of a selected tree node on the right. An XSL stylesheet to transform the document into HTML already existed.

<a class="imagelink" href="http://www.martin-probst.com/wordpress/wp-content/uploads/2006/04/ammbrowser.png" title="AMM Browser"><img id="image83" src="http://www.martin-probst.com/wordpress/wp-content/uploads/2006/04/ammbrowser.thumbnail.png" alt="AMM Browser" height="53" width="128" /></a>

For the curious: AMM stands for "aircraft maintenance manual", this documents the procedures necessary for different defects or routine maintenance on air planes. And no, the engineers don't do Lorem ipsum all the time ;-)

This is something XQuery was designed for. I took an existing JavaScript tree library that eats a trivial XML format and the X-Hive/DB JSP taglibrary. The whole application consists of three jsp files:

<h3>index.jsp</h3>

Some quirky HTML and my misguided attempts to create CSS, plus this script code:
<pre class="prettyprint">
  tree=new dhtmlXTreeObject("treeboxbox_tree","100%","100%",0);
  tree.setImagePath("imgs/");
  //set function object to call on node select
  tree.setOnClickHandler(onNodeSelect);
  tree.setXMLAutoLoading("tree.jsp");
  tree.loadXML("tree.jsp");
  function onNodeSelect(nodeId) {
    ajaxpage("content.jsp?id=" + nodeId, "content_box");
  }</pre>
  ... which just tells the JavaScript library to use tree.jsp for the tree and content.jsp for the content. Can't get much easier.

<h3>content.jsp</h3>

Probably the most trivial query possible:
<pre class="prettyprint">
      1 &lt;?xml version="1.0" encoding="utf-8" ?>
      2 &lt;%@ taglib uri="http://www.xhive.com/taglibs/xhivetags-1.0" prefix="xhtags" %>
      3 &lt;xhtags:session>
      4   &lt;xhtags:transaction>
      5     &lt;xhtags:contextnode contextNodePath="/amm"/>
      6     &lt;xhtags:xquery>
      7       //*[@KEY = "&lt;jsp:expression>request.getParameter("id")&lt;/jsp:expression>"]
      8     &lt;/xhtags:xquery>
      9     &lt;xhtags:foreach>
     10       &lt;xhtags:transform styleUrl="amm-common.xsl" />
     11     &lt;/xhtags:foreach>
     12   &lt;/xhtags:transaction>
     13 &lt;/xhtags:session>
</pre>
This JSP simply imports the X-Hive taglib, opens a session with the database, within that a transaction, takes a context node in the library, runs an XQuery for nodes with a specific ID (the parameter passed as "id") and runs a stylesheet on each of the returned nodes. The necessary configuration (X-Hive database path, DB user and password, cache size) is taken from web.xml.

<h3>tree.jsp</h3>

A simple XQuery to produce the XML format the JavaScript library requires from the document in the database. The library expects something like this:
<pre class="prettyprint">
      1 &lt;tree id="0">
      2   &lt;item id="1" text="foo" child="false"/>
      3   &lt;item id="2" text="bar" child="true"/>
      4 &lt;/tree>
</pre> 

Which simply means: the tree with the ID "0" (which is an opaque string, it is only expected to be unique) has two children, one with the description "foo" and the other called "bar" and IDs 1 and 2, respectively. The latter has children, too. It also supports fancy stuff like special icons etc., but I left this out for simplicity.

The document which is queried roughly looks like this:
<pre class="prettyprint">
      1 &lt;?xml version="1.0" encoding="utf-8" ?>
      2 &lt;AMM>
      3   &lt;CHAPTER KEY="..." CHAPNBR="3">
      4     &lt;TITLE>...&lt;/TITLE>
      5     &lt;SECTION KEY="..." CHAPNBR="3" SECNBR="1">...&lt;/SECTION>
      6     ...
      7   &lt;/CHAPTER>
      8 &lt;/AMM>
</pre>
Levels also include SUBJECT and PGBLK. The KEY attribute is always unique and each level element has a TITLE child and other structural elements are always direct children of their parent. This is all we need to know about our source.

tree.jsp looks like this:
<pre class="prettyprint">
      1 &lt;?xml version="1.0" encoding="utf-8"?>
      2 &lt;% response.setContentType("text/xml"); %>
      3 &lt;%@ taglib uri="http://www.xhive.com/taglibs/xhivetags-1.0" prefix="xhtags" %>
      4 &lt;xhtags:session>
      5   &lt;xhtags:transaction>
      6     &lt;xhtags:contextnode contextNodePath="/amm"/>
      7     &lt;xhtags:xquery>
      8       declare function local:tree($root as element()) as element()
      9       {
     10         let $rootId := if ($root/@KEY) then $root/@KEY/string() else "0"
     11         return
     12         &lt;tree id="{ $rootId }">
     13           {
     14             for $child in $root/(CHAPTER | SECTION | SUBJECT | PGBLK)
     15             let $numStr := string-join( ($child/@CHAPNBR,
     16                                          $child/@SECTNBR,
     17                                          $child/@SUBJNBR,
     18                                          $child/@PGBLKNBR),
     19                                         '-')
     20             let $hasChildren := exists($child/(CHAPTER | SECTION | SUBJECT | PGBLK))
     21             return
     22               &lt;item id="{ $child/@KEY/string() }" text="{ $numStr , ' ', $child/TITLE/string() }" child="{ if ($hasChildren) then 1 else 0 }"/>
     23           }
     24         &lt;/tree>
     25       };
     26 
     27       let $root := //*[@KEY = "&lt;jsp:expression>request.getParameter("id")&lt;/jsp:expression>"]
     28       return
     29         if (empty($root)) then
     30           (: empty root, return main doc :)
     31           local:tree(/AMM)
     32         else
     33           (: children of the node with the given ID :)
     34           local:tree($root)
     35     &lt;/xhtags:xquery>
     36     &lt;xhtags:foreach>
     37       &lt;xhtags:tostring/>
     38     &lt;/xhtags:foreach>
     39   &lt;/xhtags:transaction>
     40 &lt;/xhtags:session>
</pre>

The query retrieves the element with the given ID if existant, the root node (/AMM) otherwise. It then calls to the function local:tree to create an XML document that matches the format. local:tree first checks whether we have a KEY attribute on the root (in AMM documents the root node doesn't have an ID) and makes sure we always have something. It then creates the root of the tree in line 12 and for each child of the root node an &lt;item/> with the proper text, ID and child flag. It only iterates over CHAPTER, SECTION, SUBJECT and PGBLK nodes (line 14), everything else is considered non-structural and shouldn't show up in the tree. In line 20 it creates the chapter number that is prepended to the title of each element. This could also be calculated dynamically from the XML, but if you're handling fragments of the document that wouldn't work. The "child" attribute (which should have been named "hasChildren") is just an optimization so that the client doesn't have to ask for the children of each node just to decide whether to display a "+" in front of them.

While this certainly has deficits (e.g. no proper escaping used on parameters to the queries, should be query parameters, XSL stylesheet runs on the server) it shows how easy it is to query XML with XQuery. I wrote the whole thing in less than a day, most of the time was spent debugging the JavaScript library and setting up Tomcat and the build environment. As a bonus, the interface between the server and client components couldn't be more trivial. Using the ID attribute we can easily drop our browser based editing component into the application to make the whole thing read/write.

To have the whole thing run fast I added an index on the attribute KEY of any element. This can also easily benefit from HTTP caching. If the whole thing needs to scale up, you can simply change the path to the database file (e.g. /var/xhivedb/data/XhiveDatabase.bootstrap) in your web.xml to a remote machine running X-Hive/DB (e.g. xhive://server:1235/). This way, all requests to the application servers will use a local data cache and the server is only ever queried if pages have been modified. Using that technique you can serve a lot of users.
