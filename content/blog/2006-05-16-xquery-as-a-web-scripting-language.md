---
title: "XQuery as a web scripting language"
date: 2006-05-16T08:17:48+00:00
updated: 2006-05-16T14:01:45+00:00
url: /blog/2006/05/16/xquery-as-a-web-scripting-language/
draft: false
comments: 1
---

In my last post, I threw some XQuery together to provide a browsable outline of an XML document in a browser. I used XQuery as a web language by embedding it into JSP pages and using our X-Hive/DB tag library. This somewhat sucks, because I don't like JSP generally and our tag library is somewhat under maintained. It would probably be quite easy to get it up to speed again as it's not really much code, and of course customers can modify it as we deliver the source code to them. 

I'd really like to use XQuery exclusively. On first thought, it's a perfect fit for a web language, being functional and such, but on after thought you run into quite some problems. Just returning the query result as a web page is nice, but that doesn't get you very far. To provide a useful web interface you need to set arbitrary HTTP headers (most importantly response codes).

MarkLogic uses <a href="http://xqzone.marklogic.com/pubs/3.0/apidocs/AppServerBuiltins.html#set-response-content-type">custom functions</a> to do that, e.g.
<pre class="prettyprint">
xdmp:set-response-content-type("text/html"),
&lt;html>
  ...
&lt;/html>
</pre>
eXist goes with the <a href="http://exist.sourceforge.net/xquery.html#N10396">same approach</a>, I can't find something about headers though.

We used to do that with our debugging capabilities, e.g.
<pre class="prettyprint">
xhive:queryplan-debug('stdout'), ...
</pre>
But the problem with that method is that it's highly un-functional. It doesn't fit the language to have side-effect functions that always return the empty sequence. And it's not only ugly, it might get you into real trouble, e.g.
<pre class="prettyprint">
  let $doc := doc($uri)
  return
   if ($doc/type = "text") then
     xdmp:set-response-content-type("text/html")
   else
     xdmp:set-response-content-type("application/pdf")
</pre>
This is a bit contrived and you could work around it in this case (construct the content type first, then call the method), but in the general case the query processor is allowed to evaluate both function calls, and in any random order it finds suitable. So you might end up first setting the content type to html, then to pdf, and then delivering an HTML document. We now use a syntax like "declare option xhive:queryplan-debug ...;" in the query header, but that of course doesn't work for HTTP headers. (I'm not writing this to bash on MarkLogic, I can understand their decision to do it like this very well, and it's simply an ugly problem - I just took them as an example as their documentation is readily available).

The only XQuery-ish solution would probably be to provide a custom document format to encapsulate those web specific results. Have a document type called HTTP response (and one called HTTP request) and have the query return this document, e.g.
<pre class="prettyprint">
&lt;response xmlns="http://http/what/ever">
  &lt;header>
    &lt;code>HTTP/1.1 404 Not found&lt;/code>
    &lt;entry name="Location" value="..." />
  &lt;/header>
  &lt;body xmlns="">{
    for $x in ...
  }&lt;/body>
&lt;/repsonse>
</pre>
This would probably work, though it puts a bit more work on the user. Should be possible with some library functions though ... one would need to pay attention to some escaping issues etc. And there is probably quite a lot I didn't think of ...

Now, does anyone now such a format? I didn't really research, and "xml http format" doesn't make up a good Google query. Maybe having a consistent format between different XQuery implementations would be nice, too, as this stuff goes into the query, and the whole point of XQuery is to have portable queries. Or other people have completely different ideas on how to do this, I'd like feedback anyways.

Update: <a href="http://weblogs.goshaky.com/weblogs/page/lars">Lars Trieloff</a> comments that he would rather use processing instructions on the document root level, e.g.
<pre class="prettyprint">
&lt;?http.header Location: /other/path ?>
</pre>
where the name is open to discussion. This raises two minor escaping issues: the user might already use < ?http.header?> (or whatever) and PIs don't support namespaces, and the user might include line breaks in the processing instruction. The latter is probably just an error. The benefit of this technique is that it would be a lot less invasive to user code.
