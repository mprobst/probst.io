---
title: "Namespaces"
date: 2005-03-14T13:08:21+00:00
updated: 2005-03-14T13:17:19+00:00
url: /blog/2005/03/14/namespaces/
draft: false
comments: 1
---

Every now and then someone thinks about namespaces and nearly everyone seems to be at least slightly confused afterwards. <a href="http://www.megginson.com/blogs/quoderat/">David Magginson</a> tries to clarify on that, although he admits the decision the Namespace group has taken is not really perfect.

Now what really bugs me is that <a href="http://www.megginson.com/blogs/quoderat/archives/2005/03/12/attributes-and-namespaces/">according to his post</a> (and Dare Obasanjo has written about that before too) there are three cases for the namespace of an attribute:
<ul>
<li>It's in the empty ("NULL") namespace as in <code>&lt;foo xmlns:empty=&quot;&quot; empty:bar=&quot;5&quot;/&gt;</code></li>
<li>It's in some namespace <code>&lt;foo xmlns:a=&quot;mynamespace&quot; a:bar=&quot;5&quot;/&gt;</code></li>
<li>It's "locally scoped to the element" as in <code>&lt;foo bar=&quot;5&quot;/&gt;</code>, probably the most common case</li>
</ul>

The annyoing thing about that is in my opinion the "locally scoped" case. I might miss something, but I don't see any other XML standard that really requires or uses that "locally scoped" feature. At least XPath, XQuery etc. don't use it, and XML Schema as far as I know doesn't too, does it?

The namespace should have been either inherited from the element the attribute is in or (in my opinion clearer) been the default namespace set with <code>&lt;myelem xmlns="foo"/&gt;</code>. There should really not be any difference between elements and attributes regarding XML namespaces as both use the same syntax (QNames). Using the inherit-mechanism not only for attributes but for elements also might bring strange effects when including XML snippets within other documents.

Another solution would be to forbid elements without explicit namespace prefixes altogether. This would bring some annyoance to users who do not use XML namespaces or just use one within one document, but it would also be absolutely clear. I would prefer to have a clear syntax instead of surprising effects when using namespaces ...
