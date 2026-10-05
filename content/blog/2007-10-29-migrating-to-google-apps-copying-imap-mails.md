---
title: "Migrating to Google Apps (copying IMAP mails)"
date: 2007-10-29T12:35:00+00:00
updated: 2008-02-11T18:24:55+00:00
url: /blog/2007/10/29/migrating-to-google-apps-copying-imap-mails/
draft: false
comments: 0
---

Now that Google has <a href="http://gmailblog.blogspot.com/2007/10/sync-your-inbox-across-devices-with.html">announced IMAP support for Gmail</a> I’m migrating my email to Google Apps.

I’ve always had a HostEurope WebPack that provides some webspace, PHP, MySQL and IMAP. Some time ago I also ordered a virtual root server, to have some fun with rails, and a general space for experimentation. Then I wanted to take the webpack down as I didn’t need it anymore. But to be honest, I soon figured out that configuring and properly maintaining a whole email setup (MTA, IMAP, various spam filters, …) is indeed a lot of work.

So I moved all my email related stuff to Google Apps. So far it looks quite nice. It’s a bit strange that my regular Google user account didn’t integrate with the new one, but I simply dropped the old account.

Now I’m copying all my IMAP emails over to Google Mail. Surprisingly, I couldn’t find an easy to use, readily working script to copy IMAP messages from one host to another. There are several, but they seem to be either unmaintained, requiring obscure dependencies, or require bizarrely complicated setup.

So in a first class wheel reinvention act I wrote my own IMAP copy tool, in ruby; <a href="/imapcopy.rb">imapcopy.rb</a>. Only dependency is highline for the password prompt, but if you don’t want that, you can easily adapt the code.

I really like it: it does everything I needed, doesn’t require any configuration, it only copies messages that are not present on the new host, and even prints a nice spinner ;-). Sample usage:

<pre class="prettyprint">
ruby imapcopy.rb user1@somehost.com user2@gmail.com@gmail.com
Password for user1@somehost.com:
Password for user2@gmail.com@gmail.com:
...
</pre>
