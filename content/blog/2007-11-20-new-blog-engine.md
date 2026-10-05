---
title: "New blog engine"
date: 2007-11-20T10:59:08+00:00
updated: 2007-11-20T10:59:08+00:00
url: /blog/2007/11/20/new-blog-engine/
draft: false
comments: 1
---

I ported my old WordPress blog over to a hand-written Ruby solution. You probably already noticed that my permalinks were not that perma, so apologies for re-appearing entries in your feed readers.

I decided to move away from WordPress after taking a look in my archives. Through various import/export operations and the liberal re-formatting of entries - done by WordPress itself or various plugins - the data in the database was a complete mess. Corrupt UTF-8, double, triple and quad escaped anything, mixed encoded and non-encoded HTML... took me quite some time to clean it up (thank God for RegExps).

Writing a simple blog in Ruby on Rails is an easy exercise, at first. It gets a lot more complicated once you consider trackbacks/pingbacks, proper permalinks, comment spam, etc., but more on that in separate entries.
