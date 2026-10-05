---
title: "Blog on Google App Engine"
date: 2011-02-04T13:56:58.891000+00:00
updated: 2011-07-01T09:10:32.420000+00:00
url: /blog/2011/02/04/blog-on-google-app-engine/
draft: false
comments: 1
---

Over the last couple of days, I took up another recreational programming project: I ported this blog to <a href="http://appengine.google.com">Google App Engine</a>, using Python and <a href="http://www.allbuttonspressed.com/projects/django-nonrel">django-nonrel</a>. Partially this is of course preparation for my next job, but App Engine also looks like a good solution for a personal blog. You can run your own code, hosting is free for small projects, and you don't have to worry about most system administration minutiae.

Whenever I look at a new web framework, I estimate how much work it would be to create a weblog in it - I think weblogs are sort of the hello world of web applications. If a weblog isn't easy to implement, then something about the framework is a bit fishy.

Porting my blog from Ruby on Rails to App Engine was a bit more work than I originally expected, but I think it's not necessarily the platform's fault. After all, I tried to learn Python, App Engine, and Django all at once, with the added bonus of using a non-mainline, patched version of Django. Also, like I guess most software engineers, I consistently underestimate the work associated with more or less anything. I mean, writing out articles from a database, how hard could it be, right?

In the end, I spent 4 or 5 days on this, mostly browsing through the Django documentation to find out how things are done over here, and cursing that in Python all the standard library functions have The Wrong Name&trade; (when coming from Java and Ruby). Some things are still a bit hacky (I insisted on putting the required libraries in a subfolder, for which I had to patch django-nonrel...).

It's also been a bit of a pain putting the individual pieces together. The individual App Engine APIs are explained properly, but the built-in "webapp" framework is clearly lacking, so you have to pick up something like django-nonrel. Getting that to work nicely with App Engine however requires quite some reading and fiddling around. Not sure how that looks on the Java side of App Engine, but for the Python framework, the batteries are definitely not included. Python is a nice language though, and I already love using the datastore instead of a relational database. The framework also has a lot of nifty features, like the bulkloader system, or the XMPP support.

<h3>Rails vs Django</h3>

Compared to Rails, Django seems to be influenced by the Python spirit of doing things correctly. Rails is "anything that works and looks cool is ok", Django seems to be searching for the right way to do things a bit more. For example, Django has another level of indirection with separate classes handling forms, where Rails just uses the model classes directly. Both works, Rails a bit less verbose, Django is a bit stricter. It's probably easier to customize Django's form handling through the added level of abstraction, and obviously easier to get different behaviour in different places. Rails on the other hand wins with simplicity and a clear "this is the way to do things".

I'm not sure which approach I like better. Rails is clearly easier to pick up, and solving the simple, expected problems is probably easier.

Another thing one notices is that Rails has a lot more mindshare, a lot more features, documentation, plugins, etc. I'm sure there is something comparable to Ruby's XML builder, AJAX handlers, etc., but I couldn't find an easy way to do that. Django is also missing a bunch of features you take for granted in Rails, like migrations, RESTful handlers, easy support for content types and so on. Django users can certainly get all of that, but need to put in more effort.

I wonder how these things are done internally at Google. I guess I'll see in a month ;-)

<h3>Features!</h3>

While being at it, I added some nice features: I finally put a proper anti-spam solution together (the one before didn't require a CAPTCHA, but was a bit flaky - I suspect it had a bunch of false positives, and it effectively disallowed talking about Viagra ;-)). When someone leaves a comment, a chat bot now informs me about it using Jabber. And for authentication I can rely on Google Accounts through the User service.

What's still missing is support for pingbacks and trackbacks. Both specs are somewhat annoying (trackback with its pseudo RDF-embedding in articles, pingback with its XML-RPC requirement). Before doing that, I'd like to put at least some rudimentary testing system together; at the moment, this is all just a hack without any quality control whatsoever.

I guess I should get back to posting a bit more often on this blog to set off the investment. Currently I feel I wrote more code for the blogging system than text on the blog itself - somewhat like having an oldtimer car where you spend more time lying under the car than sitting inside of it.

<b>PS:</b> excuses to the feed subscribers, I had to change the permalinks for entries once again, so your readers probably marked all old entries as new... I promise this will be the very last time! Until I migrate everything to my new domain probst.io, that is ;-)
