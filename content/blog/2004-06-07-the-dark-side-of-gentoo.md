---
title: "The dark side of Gentoo"
date: 2004-06-07T17:37:30+00:00
updated: 2004-11-30T23:38:54+00:00
url: /blog/2004/06/07/the-dark-side-of-gentoo/
draft: false
comments: 0
---

I'm using Gentoo Linux which is great because it's building packages directly from source. This means you'll have packages optimized for your machine and also most packages get updated quite often. Lately I found out, that this is something I consider really annoying too.

I just typed a rather common command for me:

```
# sudo emerge -vpuU world
```

which means "search for updates to all software I have installed manually" (i.e. not as a dependency). This is what it spits out:

```
[ebuild     U ] app-office/openoffice-ximian-1.1.59 [1.1.57] +gnome -kde -ooo-kde  1,013 kB
[ebuild     U ] net-www/apache-2.0.49-r3 [2.0.49-r1] +berkdb -doc +gdbm -ipv6 -ldap +ssl -static +threads  0 kB
[ebuild     U ] dev-util/eclipse-sdk-3.0.0_rc1 [3.0.0_pre8-r2] +gnome +gtk -jikes -kde +motif +mozilla  0 kB
[ebuild     U ] sys-apps/module-init-tools-3.0-r2 [3.0] -debug  0 kB
[ebuild     U ] sys-apps/baselayout-1.9.4-r2 [1.8.12] -bootstrap -build -livecd -(selinux) -static  0 kB
```

The important lines are those with eclipse and openoffice. I would like to keep up to date, but I don't like to compile whole Eclipse or even OpenOffice for a "m8 to m9" or some similarily small step. Especially as they are java packages and compiling by hand doesn't give you anything.

While I also like the configuration system and baselayout of Gentoo I think I would install Debian on the next machine I set up.
