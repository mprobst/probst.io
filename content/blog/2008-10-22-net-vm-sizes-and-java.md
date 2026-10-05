---
title: ".NET VM sizes and Java"
date: 2008-10-22T15:39:07+00:00
updated: 2008-10-22T15:39:07+00:00
url: /blog/2008/10/22/net-vm-sizes-and-java/
draft: false
comments: 0
---

I just installed all the new Windows XP patches in my virtual machine running parallels, including a bunch of hotfixes and service packs for Microsoft .NET.

As the download took quite a while, curious, I checked the size of the various .NET frameworks after installation. According to the Add/Remove programs dialog (no idea where these files really end up, so I can't check directly), .NET 2.0 and 3.0 consume ~280 MB and ~335 MB respectively, including the German language packs, each at ~100 MB. For the also installed .NET 1.1 there is no size given, but I'd guess it's not that much smaller then .NET 2.0, so about 150 MB should be a conservative guess.

So in summary, to run Microsoft .NET programs, I spend probable well above 750 MB of hard drive space. Compare to Java, where one version suffices due to backwards compatibility, where the JRE is 114 MB (and the JDK is larger, but not by much if I remember correctly). This is actually a pretty good argument for at least some investment in backwards compatibility.

I wonder what they include in those .NET packs? And what if they continue "innovation" (or whatever) at this pace? In 6 years since 2002 there are 3 incompatible version, does that mean we'll have to install 2 GB in 6 frameworks in another 6 years?
