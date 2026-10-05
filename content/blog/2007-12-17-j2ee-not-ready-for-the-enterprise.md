---
title: "J2EE not ready for the enterprise"
date: 2007-12-17T11:45:51+00:00
updated: 2007-12-17T11:45:51+00:00
url: /blog/2007/12/17/j2ee-not-ready-for-the-enterprise/
draft: false
comments: 1
---

Well, not really. But it's surprising how just about anything I've ever used gets i18n and especially Unicode support wrong, in some way or another.

After a lot of searching I just found out that you have to put "<%@ page contentType="text/html; charset=UTF-8" %>" on every single JSP page to get the correct encoding, putting it in one include doesn't work. How annoying. Thanks go to <a href="http://cagan327.blogspot.com/2006/05/utf-8-encoding-fix-tomcat-jsp-etc.html">Cagan</a>.
