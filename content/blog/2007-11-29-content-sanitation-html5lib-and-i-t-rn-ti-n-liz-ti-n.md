---
title: "Content sanitation, html5lib and Iñtërnâtiônàlizætiøn"
date: 2007-11-29T16:13:49+00:00
updated: 2007-11-30T09:18:09+00:00
url: /blog/2007/11/29/content-sanitation-html5lib-and-i-t-rn-ti-n-liz-ti-n/
draft: false
comments: 0
---

<a href="http://www.martin-probst.com/blog/2007/11/20/new-blog-engine">As I wrote</a>, I migrated to a handwritten blog engine mainly because I was unsatisfied with the way Wordpress handled my content*. So one of the goals was to properly handle any input HTML and Unicode characters.

<h2>Unicode</h2>

Unicode support turned out to be more tricky than expected. I decided that for anything written mostly in a western European language, there is only one encoding and it's called UTF-8. Debugging Unicode issues can be quite ugly, as it can be quite difficult to find out how something is actually encoded. Useful utility: hex editor to find out what these bytes really are. Sadly, that doesn't help much with MySQL.

First thing is to make sure that really every single part of the tool chain is unicode aware. There is a nice collection of tipps <a href="http://wiki.rubyonrails.org/rails/pages/HowToUseUnicodeStrings">here</a>. In my case, LC_ALL on my server had to be set to en_US.UTF-8, my MySQL tables had somehow been created as non-unicode. The original wordpress database had a totally bizarre mix of unicode and non-unicode columns in every table.

A very useful command in MySQL is
<pre class="prettyprint">mysql> show create table &lt;tablename>;</pre>
Watch out for the DEFAULT ENCODING and per-column encodings.

Also important is to run all mysql scripts with the proper charset set, it appears to default to some latin charset:
<pre class="prettyprint">mysql -u ... -p --default-character-set=utf8</pre>

<h2>HTML</h2>

I'm preprocessing all data from the outside using <a href="http://code.google.com/p/html5lib/">html5lib</a>. html5lib will parse anything and produce a DOM tree that is similar to what a browser would create. I added some code to wrap plain text outside of block level elements in &lt;p/> containers.

It works nice, although it's quite slow. One caveat: to html5lib, UTF-8 is called 'utf-8', not 'utf8'. You won't notice your Babylonian problems until a German U-Umlaut Ü shows up as the character '端' - probably some broken auto detection.

Anyways, now my database contents look good :-)
