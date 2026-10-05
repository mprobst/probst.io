---
title: "Eclipse PDE builds"
date: 2006-06-13T08:02:46+00:00
updated: 2006-06-13T08:02:46+00:00
url: /blog/2006/06/13/eclipse-pde-builds/
draft: false
comments: 1
---

Something that really leaves me wondering is the Eclipse Plugin Development Environment (PDE). The folks at Eclipse certainly know how to make a great IDE, they show it with the Java Development Tools, but the PDE?

They provide some nice GUI editors for the various XML files used by plugins, but some very basic things fail, consistently. One of the most annoying things is building plugins. It just never works. There is a long standing bug that plugins don't build if they are not in the exact same folder hierarchy, there is apparently a bug where it doesn't pick up the right versions for feature projects, there is a bug where having a plugin installed in some version conflicts with building it, there is a bug where changes in one of the projects don't show up in another if you've also got another plugin of that name installed - everytime I upgrade my feature to a new version I first change the version number in the GUI editor, then I manually edit the file because it never picks it up, then I try building, which always fails, then I restart Eclipse, then building usually works. Of course only because I found out about the bugs I mentioned before by painfully searching bugzilla and implemented workarounds. 

Additionally the current release candidate sprinkles generated build.xml files and temporary folders all over your projects if you're unwise enough to press that build button. But never think that these build.xml files might be usable with a standalone, plain ANT, they seem to only be there for added user annoyance. 

After building the update site, installing the newer version fails mysteriously and silently - everyhting claims to have worked, but the code running is obviously still the old one, even after a restart.

This is really making Eclipse development a huge pain. Add to that the bad documentation of many things (most of the time you have to browse example code from somewhere on the net), the over-complicated and cryptic API, and I sometimes really wonder why everyone is so enthusiastic about Eclipse's great extensibility and blah. Maybe it's just the glamour of the Java IDE in Eclipse that makes people think the foundation of that must be great.
