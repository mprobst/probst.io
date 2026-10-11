---
title: "DocBook to Word (with free bibliography converter!)"
date: 2007-02-16T14:02:57+00:00
updated: 2007-02-16T14:02:57+00:00
url: /blog/2007/02/16/docbook-to-word-with-free-bibliography-converter/
draft: false
comments: 1
---

My girlfriend is writing her PhD thesis at the moment. This gives the big problem of what format to use for the document. The options are (as far as I know) LaTeX, DocBook, OpenOffice.org and Word.

<h3>LaTeX</h3>

I've tried LaTeX on her in the past, and she was not to happy. First I tried LyX, which is simply not working for the task we had. It's actually really confusing, instable, ugly etc. Not a choice. Editing LaTeX source by hand is nothing she wants to do. Also, she needs to be able to manage the document structure etc. by herself, so this simply doesn't work. Pro for LaTeX: really nice documents as a result, citation support is ok, though customising it is a pain.

<h3>DocBook</h3>

So I went on and looked for a more modern publishing format with decent editors. As Lars Trieloff is a friend of mine I know DocBook and have used it several times in the past. There are editors for it that do not totally suck and it's fairly easy to customise using XSLT. So we tried that for several months.

Net result: citation support totally sucks in DocBook. There are bibliography elements available, but no-one really seems to no which elements to use for what (e.g. how to properly document an article, inproceedings, etc.). This was a major obstacle, and tool support for it is also really bad in the editors we tried (XXE and Serna). XXE is a nice editor, but we settled with Serna because it's output is closer to the real end result and my girlfriend somehow preferred it.

Serna itself is a good XML editor, and they have a very strong technology behind it. The problem is that it doesn't really support DocBook out of the box very well. They have some stylesheets for a very old docbook version shipping with it, put apart from that there isn't much.

Another major problem along with citations: tables. There are the CALTECH tables, which are ridiculously complex to edit, and there are HTML tables, which are complicated to edit. Tool support in Serna is really bad for tables, I'm sorry to say.

So basically, after a long time trying, we gave up on that.

<h3>OpenOffice.org</h3>

We didn't try that. I've used OpenOffice in the past and I remember it as a horribly slow and ugly copy of MS Word, with a totally weird user interface. I've tried to get citation support to work in OpenOffice but didn't manage to. Also, I've had issues with OpenOffice and corrupted files... so if I want an unstable office suite, I can also use MS Office which is at least a bit easier to use.

<h3>Microsoft Word 2007</h3>

So we ended up here again. Which is really, really sad. Word 2007 sure is better than previous versions, especially the new user interface is very good. Also, they've added a lot of tools for academia, especially the citation support looks really good. But there are still the same stability problems. I've just tried saving a large document, and Word simply crashed. Plus, it somehow killed the backup copy - after restarting, 30 mins of work were gone. I'm quite scared at the perspective of creating a 300+ pages document with graphics, foot notes, citations etc. in this tool.

But there is no apparent alternative. OpenOffice is no better, plus it sucks more, and the other tools are simply not usable for someone without a strong technical or computer science background. This means frequent backups and crossing the fingers for the next two years...

<h3>DocBook exodus and the bibliography</h3>

So how did I get the existing document from DocBook to Word? I didn't get those transformation stylesheets available to run, but in the end I've more or less simply imported the full text from the XML document.

I've written a small stylesheet to convert the docbook bibliography to Word 2007 format *(no longer available)*. It's probably incomplete, erroneous etc. and will kill all your data, but hey, it's at least something ;-)

You can simply run your existing bibliography through it and then select that file as the bibliography source in Word, or alternatively merge it with the existing file using your favorite VIM, uh, text editor I mean ;-)
