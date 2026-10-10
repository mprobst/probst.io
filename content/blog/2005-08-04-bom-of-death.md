---
title: "BOM of death"
date: 2005-08-04T16:40:23+00:00
updated: 2005-08-04T16:45:20+00:00
url: /blog/2005/08/04/bom-of-death/
draft: false
comments: 0
---

Note to self: next time you get really strange XML parse and comparison errors, try running this before looking at XML and Java files, cursing at XSLT, JUnit, Eclipse & the world in general for an hour:

```
find | grep -v .svn | xargs sed "s|\xEF\xBB\xBF||" -i.from-bom
```

(Unix shell script to remove UTF-8 byte order marks from all files below the current directory).

Afterwards start cursing about Notepad, Windows, and Microsoft's use of the BOM in general.
