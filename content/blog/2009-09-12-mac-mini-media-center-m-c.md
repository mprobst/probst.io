---
title: "Mac Mini Media Center (M³C)"
date: 2009-09-12T19:23:43+00:00
updated: 2009-09-12T19:23:43+00:00
url: /blog/2009/09/12/mac-mini-media-center-m-c/
draft: false
comments: 0
---

So, after much procrastination I bought myself a new Mac Mini and have set up my Mac Mini Media Center (M³C).

Some observations:
- While equinux' TubeStick has a cute name and is much cheaper than Elgato's EyeTV, the hardware didn't work well for me (only received 16 of about 30 DVB-T stations), and the software is just no comparison to EyeTV, both usability and features are much better in EyeTV.
- Snow Leopard completely messes up the Apple Remote, and full screen video display seems to lag sometimes. Hopefully they'll fix this.
- I got myself an Apple wireless desktop, which works, but the next time I think I'd rather go for a keyboard with integrated touchpad
- Getting my Toshiba TV to display the digital video over a digital connection <b>without</b> cutting of the screen or black borders was hard. I used to <a href="http://www.madrau.com/SRX3/index.html">SwitchResX</a> and all looks good with these exact settings. Create a new custom screen resolution and enter the values for horizontal and vertical in the text boxes. Then reboot and see if you can select the resolution (good luck!).

  ```
  Vendor 5262
  Type 103.00

  H 48
  V 24

  Horizontal / Vertical
  1832		1024
  572		32
  44		10
  192		58
  28,1		50
  ```

- Running my own webserver (i.e. this weblog) on the Mac works fine so far, I just have to understand launchd some day so that I can make the services start at boot time. Well, another day ;-)
