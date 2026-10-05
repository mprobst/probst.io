---
title: "External functions in XQuery"
date: 2005-06-04T12:20:20+00:00
updated: 2006-06-13T09:19:12+00:00
url: /blog/2005/06/04/external-functions-in-xquery/
draft: false
comments: 0
---

I recently implemented a (IMHO) much handier way to provide external functions to XQueries in X-Hive/DB.

External functions can be declared in XQuery like this:
<pre class="prettyprint">
declare function myfunc($a, $b, $c) external;
</pre>

In X-Hive, you can now create a statement on an arbitrary XML node, register functions, and execute the query (this is from memory and will probably not compile like that):
<pre class="prettyprint">
  XhiveNodeIf node = ...;
  XhiveXQueryQuery statement = node.createXQuery(
    "declare function extract-post($author, $title, $content, $time) external;" +
    "declare namespace dc = 'http://purl.org/dc/elements/1.1/';" +
    "declare namespace content= 'http://purl.org/rss/1.0/modules/content/';" +
    "for $item in /rss/channel/item" +
    "return extract-post($item/dc:creator, $item/title, $item/content:encoded, $item/pubDate)")
  ArrayList<RSSPost> posts = new ArrayList<RSSPost>();
  statement.setExternalFunction(null, "extract-post", new XhiveExtensionFunctionIf() {
    Object[] call(Iterator< ? extends XhiveXQueryValueIf>[] params) {
       String author = params[0].next().toString();
       ...
       posts.add(new RSSPost(author, title, content, date));
       return null;
    }
  });
  statement.execute();
</pre>

While in general you have to be very careful with functions having side effects, this is a pretty handy way to extract Java objects from a given XML source. As long as you do not make any assumptions about the order, in which the function calls happen, it should also not break.

There are quite a lot of other projects about converting your XML into Java objects (e.g. <a href="http://xmlbeans.apache.org/">Apache XMLBeans</a> or <a href="www.asciiarmor.com/blog/default/%3Fpermalink%3DIntroducing_DAX.txt">DAX</a>). Using XQuery has the advantage of giving you a real XML query language at hand for value extraction, and in combination with an XML database you can also handle really large documents very efficiently.
