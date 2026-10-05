---
title: "Usability of Command Line Interfaces"
date: 2006-01-29T13:30:01+00:00
updated: 2006-01-29T13:30:01+00:00
url: /blog/2006/01/29/usability-of-command-line-interfaces/
draft: false
comments: 1
---

Something really astonishing about Ubuntu (and all Debian distributions) is the state of the Command Line Interfaces to the package management system.

First, there is "dpkg", coming in several incarnations (20 different programs). This is not supposed to be used by actual humans, and there are good reasons for that, it's just unusable. Then there is apt (9 different programs) providing something somewhat usable. With package management, I have 4 main things I usually want to do:
<ul>
	<li>Install a package</li>
	<li>Remove a package</li>
	<li>Upgrade all packages</li>
	<li>Find out information on installed packages</li>
</ul>
Installing and removing is pretty straightforward, but upgrading and finding out information about installed packages is surprisingly complicated. If an upgrade just works, your fine. But if it e.g. wants to remove some package you'd rather not see removed, 'apt' doesn't tell you why. Plus, finding out which version a package is usually means first searching for the name of the package using apt-cache (and reading through screens full of names to find what you were actually looking for, ending up with three candidates of which 2 are 'transitional', 'obsolete' or whatever), as everything has rather obscure names, and then querying information about it using dpkg-query. Why is this so difficult? And why is it so easy with Gentoos "emerge" command?

Speaking of Gentoo, the whole init/rc system of Debian/Ubuntu is also a huge step backwards from Gentoos rc system. The command line tools are obscure, the user has to specify the start order manually where this could be specified by package maintainers. In Gentoo there are runlevels which have clear, understandable names and a tool that manages all the dependencies for you. Instead of pondering when to start which service in what order, and especially when to stop them again, you simply state that you'd like to have service x running at runlevel y, or not. While there is somewhat of a GUI for that in Ubuntu, it doesn't seem to work all too often and it doesn't include many of the services.

This was pretty surprising to me, as I figured that Debian was the system used by many administrators and they'd probably care about such things. Strange.
