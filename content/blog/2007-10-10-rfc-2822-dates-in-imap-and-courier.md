---
title: "RFC (2)822 dates in IMAP and Courier"
date: 2007-10-10T07:44:52+00:00
updated: 2007-10-10T07:45:34+00:00
url: /blog/2007/10/10/rfc-2822-dates-in-imap-and-courier/
draft: false
comments: 0
---

I'm writing a little ruby script to download emails from my IMAP server and put them in a Maildir structure. It's more of a learning exercise - I'm aware that there are working tools for this task, but they all seem a bit complicated in use.

Something strange I noticed is that Courier-IMAP seems to return INTERNALDATE in non-RFC822 (or RFC2822) compliant format:
<pre class="prettyprint">
irb(main):008:0> imap.uid_fetch(16860, 'INTERNALDATE')[0].attr['INTERNALDATE']
=> "01-Jun-2007 09:04:04 +0200"
</pre>
That should have been "01 Jun 2007 09:04:04 +0200", with an optional "Fri, " in front (no dashes!).

This is probably a problem with the standard. While <a href="http://www.faqs.org/rfcs/rfc3501.html">RFC 3501 (IMAP)</a> does not say anything specific about the correct date format to use, it seems to implicitly reference <a href="http://www.faqs.org/rfcs/rfc2822.html">RFC 2822</a> for that. It also contains examples in RFC2822 format. Another hint that writing good standards and specs is really hard. 

Interesting thing: this does not seem to be a problem in reality. I.e. except for my little script, all Mail clients don't seem to bother and probably do some fuzzy parsing.
