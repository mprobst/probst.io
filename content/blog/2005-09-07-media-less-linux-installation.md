---
title: "Media-less Linux installation"
date: 2005-09-07T14:11:17+00:00
updated: 2005-09-07T14:11:17+00:00
url: /blog/2005/09/07/media-less-linux-installation/
draft: false
comments: 0
---

<a href="http://marc.herbert.free.fr/linux/win2linstall.html">Install Linux without any media</a>. If I had known of this slightly earlier (don't know since when it exists, though) it would have saved me a lot of trouble. Installing linux on a ThinkPad X30 without any external drive can get quite difficult.

When installing Gentoo on it I managed to get there by booting a kernel which had it root filesystem on a NFS share on a second box. Works, but is quite a lot of hassle setting up the server. Plus you learn a lot of things about tftp, NFS etc. you really never wanted to know.

When installing Ubuntu I found out that you just need to have the kernel + initrd. I formatted my USB key, marked the primary partition as bootable using fdisk, installed grub and the Ubuntu kernel on it, and it actually worked, pulling the whole installer from the net. Except that sometimes my wireless LAN card was recognized in the installer, sometimes not. This works probably better by now.

The method described by Marc Herbert seems a little more difficult than the USB key drive, but if you don't have a Linux system to set up the keydrive or don't have a Notebook that supports booting from keydrives, it's definetly the way to go.

<em>[via <a href="http://bmaurer.blogspot.com/2005/08/linux-for-college-students.html">Ben Maurer</a>]</em>
