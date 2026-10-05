---
title: "The ability to say no"
date: 2006-06-20T07:11:33+00:00
updated: 2006-06-20T07:11:33+00:00
url: /blog/2006/06/20/the-ability-to-say-no/
draft: false
comments: 0
---

Some time ago I <a href="http://www.martin-probst.com/2005/12/06/xquery-too-complex/">commented on Uche Ogbuji describing XQuery as too complex</a>. Now <a href="http://www.25hoursaday.com/weblog/PermaLink.aspx?guid=04c90e4f-4045-4e5e-a3b3-5c3087109e0d">Dare Obasanjo writes this</a>:
<blockquote>The lessons listed above seem rather self evident and obvious yet it s a sad fact of the software industry that the mistakes of CORBA keep getting made all over again. Core XML technologies like W3C XML Schema and XQuery are 'standards' without a reference implementation which invented new features by committee instead of standardizing best practice.</blockquote>

I won't comment on XML Schema, but of course I'll have to defend XQuery :-)

Dare's criticism is partially right, XQuery apparently had some problems with the innovation by commitee thing, which has bloated the spec significantly and delayed it a lot. However XQuery (and XSLT 2.0 and the related specs) do have an inofficial reference implementation, it's <a href="http://www.saxonica.com">Michael Kay's Saxon</a>. It also has a very good test suite (which just got even better due to the tests from the KDE guys) and the <a href="http://www.w3.org/XML/Query/test-suite/XQTSReportSimple.html">results</a> show that there are at least three implementations taking very different approaches that manage to cover most of XQuery correctly. XQuery is an existing, working technology with support from major industry players and a lot of implementations. 

I think the major problem with CORBA was it's huge complexity for the user. This really doesn't compare with XQuery, which may be complicated to implement, but it's really trivial to use. Dare quotes a list of important traits a spec should have, originally from <a href="http://acmqueue.com/modules.php?name=Content&pa=showpage&pid=396">Michi Henning</a>:
<blockquote>5. To create quality software, the ability to say "no" is usually far more important than the ability to say "yes.".</blockquote>

This is something XQuery gets exactly right. You can use it directly, without XML Schema, without static, strict or any typing at all, without validation, without functions etc. Every feature is optional to the user and invisible if unused.

It's quite important to look at XQuery how it is lately - use one of the implementations or at least take a look at the spec, the implementations and all. If you're just looking at the time from the first WD (which is indeed a legit complaint), you might get the impression of failure all over, but I don't think XQuery is going to be the next XML Schema.
