---
title: "Implementing a blog"
date: 2008-05-13T13:10:10+00:00
updated: 2008-05-13T13:10:10+00:00
url: /blog/2008/05/13/implementing-a-blog/
draft: false
comments: 0
---

It's quite funny. Implementing a basic blog is basically the "hello world" of web application frameworks. You simply shove titles, body text and some timestamps into a database and retrieve it from there, again. Next lesson is 1-to-many mapping with comments.

The funny thing is that implementing a blog that way is not really implementing a blog. Implementing a blog is writing a tiny handler that shoves stuff into the database and out of it, and then spending ridiculous amounts of time filtering comments for spam. Which is one of the really difficult things to do on the internet - validating users as real users, without being inaccessible.
