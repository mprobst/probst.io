---
title: "Should developers write their own tests?"
date: 2006-08-09T07:47:01+00:00
updated: 2006-08-09T07:47:51+00:00
url: /blog/2006/08/09/should-developers-write-their-own-tests/
draft: false
comments: 0
---

<a href="http://www.25hoursaday.com/weblog/PermaLink.aspx?guid=46f1251d-0740-4cde-a075-1da65b22ee88">Dare Obasanjo</a> wonders if having your developer team do the testing and operations, too, is actually such a great thing. I'm not sure about operations/deployment, I've never worked in a company that does any serious deployment.

However regarding test teams the major problem with a lot of people is that they don't make a clear distinction between source level Unit Tests (as in Test Driven Development), which is something only the developer can do. And then there is this completely different thing called end-to-end test or function tests. There you test your application (not the source code!) against a specification - either an explicit, proper one, or an implicit, informal one. This is probably best done by real test engineers.

If you can afford to do both, you should certainly do so. Unit Tests are a great development and productivity tool, they make you write better code faster. End-to-end tests are what your customers actually want and need, they assure the product is working as advertised, so you certainly have to do that, in one way or the other.
