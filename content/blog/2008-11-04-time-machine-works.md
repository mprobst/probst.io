---
title: "Time Machine works"
date: 2008-11-04T06:26:46+00:00
updated: 2008-11-04T10:30:42+00:00
url: /blog/2008/11/04/time-machine-works/
draft: false
comments: 0
---

I'm happy to report that I tested Time Machines Backup-Restore capability yesterday evening, and it works, sigh.

I brought my MacBook Pro (1st gen.) in for repairs, because the left fan failed again, and I also had them build in a bigger hard drive. Restore from Time Machine took about 2.5 hours, maybe a bit more, but afterwards you're directly booting into your complete system. Very nice!

On the fan: Apple decided to fix it on guarantee, as the very same fan failed a bit less than two years ago. Also, not long before that fan, the right fan failed. So Apple, you're building a computer that sells for more than 2000 €, and you cannot build/buy/ship fans that last more than a year?

<strong>Update:</strong> after booting into Mac OS, you'll have to re-import your Mail.app emails, and then the next Time Machine run took ages, at least for me. My machine crashed twice while importing the mails before I increased fan speed - apparently there is still a heat problem. I also get some weird graphics errors (violet areas in windows, horizontal lines). I think I will get to know some more people in the Apple hotline shortly ...

Trying to control the heat issue, I switched from <a href="http://homepage.mac.com/holtmann/eidac/software/smcfancontrol2/index.html">smcFanControl</a> to <a href="http://www.lobotomo.com/products/FanControl/">Fan Control</a>. smcFanControl only allows a user to set specific fan speeds (via presets), where Fan Control dynamically adjusts fan speed depending on current temperature (which in turn depends on work load). So if you have a large job running, it will dynamically increase fan speed a bit more than Mac OS would, to keep your computer a bit cooler. Nice.
