---
title: "Visual Tail -f in C#"
date: 2004-04-11T20:59:51+00:00
updated: 2004-12-03T17:22:00+00:00
url: /blog/2004/04/11/visual-tail-f-in-c/
draft: false
comments: 0
---

I have visited a lecture called DISCOURSE which is sponsored by Microsoft and aims at promoting the .NET framework. It was quite interesting and a friend of mine, <a href="http://trieloff.dyndns.org">Lars Trieloff</a>, and me wrote a sample C# .NET application for the University afterwards.

It's a Visual Tail -f using .NET. The application core (I know it's ridiculous to use that term in conjunction with about 2500 LOC) is portable in terms of running under MS .NET as well as Mono. We also have GUIs for both Windows.Forms and GTK#.

I wonder if it might be of any use except to us for learning the language (and getting some ECTS credits at the Uni). At least the syslog tool included in GNOME seems to suck, it doesn't support reading from e.g. a remote SSH session or a sudo.
