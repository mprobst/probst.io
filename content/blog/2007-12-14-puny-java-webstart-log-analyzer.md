---
title: "Puny Java Webstart Log Analyzer"
date: 2007-12-14T11:17:56+00:00
updated: 2007-12-14T11:17:56+00:00
url: /blog/2007/12/14/puny-java-webstart-log-analyzer/
draft: false
comments: 0
---

Just for kicks I wrote a trivial Java Web Start application. I wanted to analyze my web server access logs, and while grep + some Ruby code work it's nicer to have something graphical. 

I couldn't find any existing JWS app, so I wrote one that parses a log in Apache's combined format and produces some charts (using the nice <a href="http://www.jfree.org/jfreechart/">JFreeChart</a> library).

So here is <a href="/apps/jla/jloganalyzer.jnlp">JLogAnalyzer</a>. It takes about one second per megabyte of logfile, which is quite awful, but it works. It displays the top 20 requested URIs, the top 20 User Agents and requests per day.

<a href="/apps/jla/jloganalyzer.jnlp"><img src="/apps/jla/screenshot-jloganalyzer.png" alt="screenshot of jloganalyzer"/></a>

Doing some Java after a long time work gave mixed feelings. Available libraries like JFreeChart are really nice, and Web Start is also great. Writing the code to parse and aggregate information from the log wasn't - at least if you compare to equivalent Ruby code. Collections without closures simply suck. Running the parsing in a background task, including progress meter and all bells and whistles is ridiculously easy using SwingWorker and <a href="http://java.sun.com/j2se/1.5.0/docs/api/javax/swing/ProgressMonitorInputStream.html">ProgressMonitorInputStream</a>. 

My only grief about JFreeChart is the use of a custom data set hierarchy that doesn't use generics, instead of providing an easy interface to the Java Collections API. E.g., why require a PieDataSet if you could simply accept a List containing Map.Entry's?
