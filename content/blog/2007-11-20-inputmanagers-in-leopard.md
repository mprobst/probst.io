---
title: "InputManagers in Leopard"
date: 2007-11-20T21:12:19+00:00
updated: 2007-11-21T15:02:13+00:00
url: /blog/2007/11/20/inputmanagers-in-leopard/
draft: false
comments: 1
---

In Leopard, InputManagers need to be installed in /Library and owned by root, for security reasons. Tutorials how to re-enable them can be found e.g. <a href="http://www.macosxhints.com/article.php?story=20071026235641392">on Mac OS X hints</a> or <a href="http://blog.macromates.com/2007/inputmanagers-on-leopard/">in the TextMate blog</a>.

Something not mentioned in those tips is that not only the input managers themselves but also the InputManagers directory must be owned by root and only writable by the owner (g-w).

These two commands did the trick for me:

<pre class="prettyprint">$ sudo chown -R root:wheel /Library/InputManagers
$ sudo chmod -R go-w /Library/InputManagers
</pre>

By the way, does anyone know what the '@'-sign after the rights in a directory listing means? As in <code>drwxr-xr-x@ 11 root  wheel   374B 11 Sep 04:25 SafariBlock</code>?
