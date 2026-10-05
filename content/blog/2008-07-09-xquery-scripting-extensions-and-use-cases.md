---
title: "XQuery Scripting Extensions and Use Cases"
date: 2008-07-09T07:48:50+00:00
updated: 2008-07-09T07:48:50+00:00
url: /blog/2008/07/09/xquery-scripting-extensions-and-use-cases/
draft: false
comments: 0
---

In march, the <a href="http://www.w3.org/">W3C</a> published a first draft of the <a href="http://www.w3.org/TR/2008/WD-xquery-sx-10-use-cases-20080328/">XQuery Scripting Extensions use cases</a> and a <a href="http://www.w3.org/TR/2008/WD-xquery-sx-10-20080328/">working draft</a>.

The XQSE propose to extend XQuery to add a defined expression evaluation order, variable assignments, a while loop, and some other control flow statements. This worries me a lot - I've spent considerable time implementing and using XQuery, and I really feel that this extension will break XQuery as a language.

The problem is that XQuery was intended to be a functional, declarative language. This allows implementations to reorder statements, executing them in a (hopefully) optimal order, benefiting from index lookups and the like. Now that they add side effects and state to the language, this is no longer possible in the general case. It will also greatly complicate XQuery implementations.

Of course, the question is, what benefits might this extension of the language give. The use cases document provides some insight.

Use cases section <b>R Q1-3</b> define queries that perform some modification of a persistent document and at the same time return a result (the new bid, number of deleted accounts, ...). 

Use case <b>Q4</b> describes the use of a while loop to constantly poll the current highest bidder on some item and perform an action if it changes. I'm not sure what this seemingly strange scenario is supposed to solve, and the editors appear to be weary of this, too.

<b>Q1-3</b> can easily be solved by allowing queries to perform modifications and return values at the same time. I've implemented this in X-Hive/DB, and it was actually simpler than what the W3C prescribed. I've since argued against this arbitrary limitation of the XQuery Updates specification, and maybe now would be a good time to fix that issue? Simply drop the separation between modifying and non-modifying queries and be done with it. About Q4, I'm not really sure. It looks like something that could be easily solved with some event based or message sending system. The fact that the editors are unsure how to implement this should probably be taken as a warning sign. Are we sure someone really needs this?

The use cases <b>XHTML / AJAX</b> both describe a scenario where a script first has to show a "busy" notice to the user, and then look up some data. I'm not sure if they envision XQuery running on the client, but otherwise this is perfectly solvable today. The client side JavaScript execution allows this trivially, and I really see no reason why to mix this client side GUI stuff with the server side operation. It breaks the MVC pattern for no really good reason.

Use case <b>WS</b> is again a variation of the "I want to perform changes and report results" theme. Drop the limitation in the XQuery Updates spec and be done with it.

In summary, it seems like they want to solve an actual problem, but approach it at a really complex angle. 5 use cases can trivially be solved by modifying the updates spec, 2 use cases (XHTML) should probably be considered harmful anyways, and one (R-Q4) I fail to understand. The collateral damage caused by the XQSE spec in complexity is not worth the net effect, if it can also be achieved by simplifying another spec!

I think we should rather concentrate on <a href="http://www.w3.org/TR/2008/WD-xquery-11-use-cases-20080327/">XQuery 1.1</a> with the grouping and windowing functionality that many people really need. Which, by the way, could also really use some simplification.
