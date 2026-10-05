---
title: "The holy grail CSS"
date: 2007-04-04T08:55:38+00:00
updated: 2007-04-04T08:55:38+00:00
url: /blog/2007/04/04/the-holy-grail-css/
draft: false
comments: 0
---

Eliotte Rusty Harold <a href="http://cafe.elharo.com/web/the-holy-grail-refactored/">writes about a slightly modified version of the "The holy grail" CSS layout</a> on his weblog.

Something that really annoys me with this sort of CSS layout is the need to specify actual widths; be it in percentage or in ems or whatever. What I really want is a CSS layout that has a left and/or right column, and the columns extend to the size they actually need, and the center div shrinks accordingly, maybe in some min/max boundary. This very useful behaviour that HTML tables had seems to be simply impossible with current CSS standards.

It's surprising how much unintuitive, hackish CSS is needed for such stuff, even without the IE hacks, just regular CSS. If one needs to go to these lengths just to get some really basic stuff everyone needs, maybe the spec is simply not that good? I always struggle with CSS, and the number of web pages with CSS layout templates suggests other people have problems, too.
