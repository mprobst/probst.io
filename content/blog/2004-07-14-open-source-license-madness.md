---
title: "Open Source License Madness"
date: 2004-07-14T20:35:32+00:00
updated: 2004-12-02T16:48:35+00:00
url: /blog/2004/07/14/open-source-license-madness/
draft: false
comments: 0
---

When I checked my email today after having ignored it for 2 days I first thought there was an email problem with the MonoDevelop mailing list. There were 47 new emails in the last two days which is a lot more than usual.

It wasn't a misconfiguration of the mailinglist tool though, but a discussion about MonoDevelops license and eventual compatibility issues with SharpDevelops license.

<a href="http://www.monodevelop.com/">MonoDevelop</a> is an IDE developed for UNIXoid platforms (afaik mainly used on Linux & MacOS X) and its based on <a href="http://www.icsharpcode.net/OpenSource/SD/">SharpDevelop</a> to quite some extent. SharpDevelop is an IDE running under Mono and MS .NET but it's currently limited to Windows because of its dependancy on Windows.Forms.

The discussion started with Todd Berman, one of the main MonoDevelop guys, announcing that he will license all his own contributions under the <a href="http://www.x.org/Downloads_terms.html">MIT X11</a> license as opposed to SharpDevelops <a href="http://gnu.unixsoft.org/licenses/gpl.html">GPL</a> policy. The MIT X11 license is some kind of LGPL/BSD/Apache style license which allows the mixture of free and non-free software.

The SharpDevelop guys (namely Christoph Wille) then remarked, that this is not possible as the MonoDevelop modules depend/extend GPLed SharpDevelop code. This effectively means that the authors cannot decide about the license of their own code because of the GPL limitations. This kind of annoyed  some MonoDevelop guys as they wanted a more liberal license, especially to allow third parties to provide non-free plugins to MonoDevelop. One of the major developers, John Luke, decided to let go on MonoDevelop because of that.

I'm not really sure what the definitive conclusion of the rather interesting debate was, but in the end (at least, the current state) Todd Berman announced that he will relicense his contributions to bei MIT X11 / GPL dual licensed. When being distributed with SharpDevelop parts they have to be licensed under the GPL though.

What does this mean to other developers? Be careful about license issues with your Open Source project. Noone wants to struggle with strange juristical issues instead of writing cool code. Especially when including source code from other projects you might irrevocably bork up your project in terms of what you can use it for.

After all, I don't really understand the position of the SharpDevelop guys - they do not really seem very happy with the existence of MonoDevelopl. Otherwise they might go ahead and try to find a compromise, e.g. LGPLing the plug-in interfaces or the parts MonoDevelop depends on. I'm not a lawyer, but this might make non-GPL plug-ins and enhancements possible.

It's their sourcecode and their copyright so they can ofcourse freely decide what should be possible and what shouldn't. But I don't consider it a good idea to enforce the use of your favorite license on other people. It doesn't sound very "free" (freedom, not beer, german "frei") either.
