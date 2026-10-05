---
title: "That boot thing again"
date: 2006-11-30T13:46:28+00:00
updated: 2006-11-30T13:47:12+00:00
url: /blog/2006/11/30/that-boot-thing-again/
draft: false
comments: 0
---

Every once in a while I mess up my old Thinkpad X30 (currently in use by my girl friend) so that it stops booting, I have to reinstall the operating system or something similar.

Now the problem is, the Thinkpad X30 does not have any removable drives. That's right, any. So no CD-ROM, no Floppy, no nothing. Which leaves three methods to boot:
<ul>
<li>External USB/FireWire CD-ROM drive</li>
<li>PXE network boot</li>
<li>USB KeyDrive boot</li>
</ul>

The external CD-ROM trick is by far easiest and - as far as I know - the only way to (re-)install Windows on the machine. Problem is: I don't own an external CD-ROM, and I don't feel like buying one just for this old notebook.

PXE network booting is quite elegant. You set up a server that serves boot images to clients, and at some point in time I had a working setup that distributed a kernel to clients that would be able to install a full Debian system via network. Problem is: this requires quite a complicated setup, custom compilation of a fitting kernel etc. pp.

The USB KeyDrive should be the easiest way. Should. It's totally beyond me why every single web page lists a whole set of instructions to make a key drive bootable. Why not just: download this image-usb.bin, dd if=image-usb.bin of=/dev/sda, or even better some sort of executable that does that for you. The only exception is HPs tool, but I didn't get that to work either.

So next steps will be to try and find someone who owns an external CDROM, then try setting up that PXE server.
