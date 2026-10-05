---
title: "Trackback spam"
date: 2005-02-01T10:52:59+00:00
updated: 2005-02-01T15:30:45+00:00
url: /blog/2005/02/01/trackback-spam/
draft: false
comments: 0
---

<p>Early this morning I got hit with a run of trackback spam - one trackback for every article I wrote. The spammers seem to have found wordpress blogs as many writers complain in the WP forums.  Luckily the comments in my blog were very uniform so I was able to remove all spams with a single SQL statement ( DELETE FROM wp_comments WHERE comment_author_uri = '...' ). These spammers are really getting annoying.</p>

<p>While everyone is talking about identification needs on the web this sounds somewhat linked to getting rid of spammers. To defeat spammers we would need a technology that is able to cleanly identify whether something approaching you website is human or not. Turing tests with images containing numbers don't work as they break trackbacks completly.</p>

<p>The next problem is that the spammer might just use his real identification and change it afterwards. So the identification technology would need to map IDs to single persons in an irrevocable manner - no possibility for a spammer to register 5000 IDs. While this would fix spamming and maybe several online fraud related problems it obviously violates privacy so noone would really use it.</p>

<p>So what to do? Simple filters won't help for long, disabling trackbacks would suck, Turing tests don't work here too. Some kind of an adaptive bayesian filtering would be nice but this would mean a lot of work on weblogs. I think I'll start looking for the simple filters ...</p>

<p><a href="http://blog.mookitty.co.uk/wordpress/spaminator/">Kitten's Spaminator</a> seems to be a good start for filter plugins.</p>
