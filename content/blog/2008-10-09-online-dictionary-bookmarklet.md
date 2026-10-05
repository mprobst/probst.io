---
title: "Online Dictionary Bookmarklet"
date: 2008-10-09T09:48:35+00:00
updated: 2008-10-09T09:54:53+00:00
url: /blog/2008/10/09/online-dictionary-bookmarklet/
draft: false
comments: 0
---

<a href="http://www.online-dictionary.nl/">Online-Dictionary.nl</a> is a nice service that translates, amongst others, from Dutch to German. I created a small bookmarklet that allows to quickly translate text on web pages. It's a direct rip-off from the <a href="http://www.leo.org/">LEO Dict</a> bookmarklet.

First, drag this link: <a href="javascript:%20s%20=%20(window.getSelection%20?%20window.getSelection()%20:%20document.getSelection());%20if%20(s%20==%20'')%20{%20%20%20%20if%20(window.getSelection)%20{%20if%20(frames.length%20!=%201)%20{%20for%20(i%20=%200;%20i%20%3C%20frames.length;%20i++)%20{%20s%20=%20frames[i].document.getSelection();%20if%20(s)%20break;%20}%20}%20}%20}%20if%20(s%20==%20'')%20void(s%20=%20prompt('Enter%20a%20search%20term%20or%20select%20the%20text%20you%20want%20to%20translate%20before%20clicking%20on%20NL-DE.',%20''));%20if%20(s)%20{%20leow%20=%20open('http://online-dictionary.nl/result.php?SrcLang=1&DstLang=3&word='%20+%20escape(s),%20'NL-DE',%20'width=750,height=550,scrollbars=yes,resizeable=yes');%20leow.focus();%20}">NL->DE</a> to your address bar. Then select a word on a web page, and klick the link - this should open a window with the translation search. In case you didn't select anything, you will be prompted for a word to look up.

I'm trying to brush up my Dutch a bit, so apart from the great <a href="http://www.niederlandistik.fu-berlin.de/woordvandedag/">Woord van de dag</a> service by the Niederlandistik (is that Dutchery in English? ;-)) at FU Berlin, I've started reading a bit in the Dutch Wikipedia, and this tool really helps.
