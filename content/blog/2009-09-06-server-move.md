---
title: "Server move"
date: 2009-09-06T19:16:47+00:00
updated: 2009-09-06T19:16:47+00:00
url: /blog/2009/09/06/server-move/
draft: false
comments: 0
---

As you might know, I used to run this weblog on a virtual server hosted by <a href="http://www.hosteurope.de">Hosteurope</a>, the smallest possible configuration. However a small virtual server <a href="/blog/2008-09-19-memory-accounting-in-linux">doesn't seem to be enough for even the smallest weblog possible</a> (at least when it's written in Rails...), so I moved this weblog to my own server today.

The trick is that I got a DynDNS domain and point my real domain (martin-probst.com) to that one through a CNAME record, and the media server / TV in my living room happily serves the files.

<pre>
$ dig www.martin-probst.com
[... snip ...]
;; ANSWER SECTION:
www.martin-probst.com.	81215	IN	CNAME	martinpr.homeip.net.
martinpr.homeip.net.	60	IN	A	92.225.50.126
</pre>

The server is a new Mac mini, so it will certainly not have the dreaded out of memory problems. I think I'm even saving money - Apple claims an idle energy consumption of about 14 Watt, which should be slightly cheaper than my server hosting in total. Of course this calculation doesn't include the hardware, but I wanted that media server anyway ;-)

In the process I also upgraded Rails to 2.3.4, which was a bit painful. But I came from 1.2.something, so some friction probably has to be expected.
