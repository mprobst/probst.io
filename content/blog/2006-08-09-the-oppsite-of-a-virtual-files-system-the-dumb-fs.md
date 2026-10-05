---
title: "The oppsite of a Virtual Files System - the Dumb FS"
date: 2006-08-09T08:57:35+00:00
updated: 2006-08-09T08:57:35+00:00
url: /blog/2006/08/09/the-oppsite-of-a-virtual-files-system-the-dumb-fs/
draft: false
comments: 0
---

Many development platforms implement a virtual file system. The basic idea is that you abstract away the actual location, access methods etc. of files to provide a coherent view to applications on top of that. These virtual file systems then provide some sort of hooks or plugin mechanism to allow others to extend this VFS.

Now the great extensibility platform Eclipse takes a surprising approach at this. It kind of goes in the opposite direction and implements a DumbFS. Everything useful needs to be a Resource in Eclipse, and a Resource does not only have to be a local file, it also needs to be in a project, which needs to be in the workspace.

But wait, there are non-local resources! See the great level of abstraction! From the JavaDocs of IResource:
<blockquote>
 * Phantom resources represent incoming additions or outgoing deletions<br />
 *		which have yet to be reconciled with a synchronization partner.
</blockquote>
Did someone say CVS? Anyways, non-local resources have the interesting property that they are like resources, except completely useless because no IO is possible on them. So if you want to work on files, they need to be local, and in a project, in your workspace. Anything else is black magic and evil, so it got abstracted away.

Now, this is kind of sad, especially as Eclipse tries to reach beyond IDE stuff with the Rich Client Platform (RCP), and it's really sad if you can't do anything with files in there. But no problem, there is an <a href="http://www.eclipse.org/eclipse/platform-text/development/rcp/examples/index.html">example of how you create a RCP text editor</a>. Of course, actually using the Text Editor component (part of RCP!) is such a special use case, you will have to do some coding on your own. In the example, this is ~500 LOCs, not counting anything Text Editor or application related, only the file access stuff, over 3 classes and one XML file (they didn't expect that people might want to open files, so you have to extend the platform to provide that advanced feature). Oh and of course you don't end up with a plain Eclipse text editor, several features wont work because it doesn't have it's beloved Resources.

I've always wondered why it's so difficult in Java to open and read a file, but these guys play in a whole different league. Provide a text editor component, but then require every user of it to write  his or her own file handler. Provide an advanced application development framework, but require anyone who wants to open a file to do some black magic adding an "Open file" command to the platform. Great stuff.
