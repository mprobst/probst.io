---
title: "JSPs suck, episode 217"
date: 2008-04-22T13:41:18+00:00
updated: 2008-04-22T13:41:18+00:00
url: /blog/2008/04/22/jsps-suck-episode-217/
draft: false
comments: 2
---

Turns out that the JSP parser doesn't even try to be an HTML parser (I figured it's not an XML parser long time ago...). If you comment out JSP code like this:

<pre class="prettyprint">
&lt;!--c:if&gt; ... bla ... &lt;/c:if--&gt;
</pre>

You'll get this:

<pre class="prettyprint">
org.apache.jasper.JasperException: /WEB-INF/jsp/task/showTask.jsp(109,4) The end tag &quot;&amp;lt;/c:if-&quot; is unbalanced
</pre>

I truly have to find myself another Java templating engine/language. JSPs come out of the box, but they are simply to annoying in the long run. I guess the effort to integrate something - anything! - else would already have payed off.
