---
title: "Subversion and Eclipse again"
date: 2005-04-06T18:16:09+00:00
updated: 2005-04-06T18:29:30+00:00
url: /blog/2005/04/06/subversion-and-eclipse-again/
draft: false
comments: 0
---

Some time ago <a href="http://www.goshaky.com">Lars Trieloff</a> <a href="http://weblogs.goshaky.com/weblogs/page/lars/20050327#subversion_for_eclipse">helped me out</a> with my Eclipse/Subclipse/Subversion problems by pointing me to <a href="http://tmate.org/svn/">a pure Java implementation of SVN client</a>, which can be used to overcome Subclipses deficiencies.

This really made my day and solved everything - for about two days. Then I was back to normal, Subclipse didn't work and everything just annoyed me.

Today I took another try at it. The problem with JavaSVN was it couldn't find some jar (SVNClient.jar) in the (...).subclipse.core_0.9.28.1 plugin directory. Turns out there are two directories, one with version 0.9.28 and one with 0.9.28.1 - but only the first one contains the jar and is actually used according to plugin.xml and feature.xml. After some fiddling around with texteditors, the xml files and some file-copy tries I gave up.

Subclipse itself is intended to work with the JNI javahl bindings, which it couldn't find on my system. The Subclipse page states that Linux distributions should actually provide these bindings, they only ship them to Windows systems. And by following that hint I found out that Gentoo includes these bindings in the subversion ebuild (when compiled with USE flag java and berkdb). The only problem is that by default $LD\\_LIBRARY\\_PATH is apparently not set on Gentoo Linux systems.

Long story, short fix:

```
martin@perseus ~ $ export LD_LIBRARY_PATH=$LD_LIBRARY_PATH:/usr/lib
martin@perseus ~ $ eclipse-3.1
```

And everything (?) works again. On Gentoo you can set this environment variable permanently by editing e.g. <code>/etc/env.d/00basic</code>, add the line "<code>LD\\_LIBRARY\\_PATH=$LD\\_LIBRARY\\_PATH:/usr/lib</code>" and do an <code>/sbin/env-update && source /etc/profile</code> (as root). On the next login you should have your environment set up.
