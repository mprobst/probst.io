---
title: "Mail and server woes"
date: 2006-05-30T16:14:10+00:00
updated: 2006-05-30T16:47:37+00:00
url: /blog/2006/05/30/mail-and-server-woes/
draft: false
comments: 0
---

Quite some time ago I lost my login password to my hosters configuration area. It didn't really bother me as I didn't have anything to set up, but yesterday I actually called them and received a new password (positive: they will only ever give you a password if they call you back on the previously set up telephone number).

<h3>Strange business practice</h3>

After that, I noticed they have a new offer which is significantly, so I upgraded my "Hosteurope WebPack L (r1)" to a "Hosteurope WebPack L (r2)". What I failed to note whas the warning text telling me that I would loose all my data. So when I called support today asking why my email and webpage didn't work, I was quite surprised. Hosteurope is a good hoster, I've never had any problems with them. But this is pretty annoying - I can't think of a technical reason not to just copy the data over (if they even have to migrate to a different server), in case someone changes the contract.

So my guess is that they only do this to keep customers from upgrading to cheaper contracts. Which I really don't like, and also the way they do this is quite dangerous: there is a single dialogue comparing prices in the two systems and then a button that says "upgrade" below that. As far as I can remember, there was no 40pt red letter warning confirmation or anything, the warning must have been in the small text above that. Which is totally ridiculous, an operation that can cost you your whole email archive not guarded by anything but some small text? And that only for the small commercial benefit of increasing the opportunity cost for upgrading?

Luckily I noticed soon enough so they still had the original email server running, so I could just copy my mail using IMAP. I would also have had a local backup of my ~/Library/Mail dir, but still.

<h3 id="spam">Spam</h3>

I had quite some trouble creating a backup of the MySQL database on the server, surprisingly phpMyAdmin refused to "send" a backup. After some time I found out that an old webpage I keep around had a public comment function which was largely abused by spammers. The corresponding SQL tables had grown to 75 MB. I wonder how beginners create webpages nowadays, you have to get an expert in anti-spam technology before you can put something online "

If you've tried emailing me yesterday or today and didn't receive a response, try contacting me again, some stuff might have been lost.
