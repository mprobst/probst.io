---
title: "XML file types"
date: 2005-03-06T12:16:47+00:00
updated: 2005-03-06T12:16:47+00:00
url: /blog/2005/03/06/xml-file-types/
draft: false
comments: 1
---

Just a quick note: why does every tool that uses XML files store them in files ending in ".xml"? This is really getting annoying. If you are using XML files in various different applications neither Windows nor Linux can provide the correct application when double-clicking them (I don't know about MacOS, the have MIME types associated with files, don't they?). You might have "mydoocbook.xml", "build.xml", "project.xml" etc.

This is especially striking when working with Eclipse. Every XML related plugin seems to consider it valid to conquer the ".xml" ending. So double-clicking an XML file in Eclipse most likely opens the wrong editor/view/whatever. Application programmers should really consider doing it like StarOffice. Provide a default filename ending for your XML application and use it!

On the other hand most current filesystems provide the ability to handle meta-data like MIME types. NTFS does, ReiserFS does, Ext3 does, XFS, JFS, etc. This has been around for quite some time so someone (<a href="http://mail.gnome.org/archives/nautilus-list/2004-January/msg00003.html">Gnome?</a>) should take the first step and use it.
