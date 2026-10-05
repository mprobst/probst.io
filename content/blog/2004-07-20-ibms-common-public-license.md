---
title: "IBMs Common Public License"
date: 2004-07-20T12:28:47+00:00
updated: 2004-12-02T16:49:05+00:00
url: /blog/2004/07/20/ibms-common-public-license/
draft: false
comments: 0
---

As posted before I took a look at the <a href="http://www.ibm.com/developerworks/oss/license-cpl.html">CPL</a>, IBMs OpenSource license.

It seems to be some kind of a "mid-way" between the BSD style licenses (e.g. Apache or LGPL) and the GPL (or similar licenses). With the LGPL one may use and modify the source in own projects and distribute the resulting applications in binary without providing the full sourcecode and under your own licensing terms. You only have to give credit to the authors. This is IMHO a nice thing as it might help Open Source software to spread. Company lawyers are probably less afraid of such licensing terms than those of the GPL requiring full redistribution of source code.

On the other hand, this might result in some Evil Company&trade; taking over your nice open source project and making bigbucks while suppressing their userbase. There is nothing wrong with companies making bigbucks but I wouldn't really feel happy with that. Look for example at Transgamings WineX - if I was one of the Wine developers I would be fairly pissed. They took most of the Wine work, only added features for gaming support, and didn't give their improvements back to the community. This seems somewhat unfair as their product seems to be heavily dependend on Wine.

With the CPL it's possible to have some kind of a middle way. If others are modifying your source and redistributing it they have to provide the source code with it. But if they only use the program (e.g. link against it, use it like one would use an XML parser) it's ok for them to include it in closed source distributions while providing appropriate creadit to the original authors. This might be a way to go.

The only obstacle is that the definition of "uses the source code" versus "is a derivative of the source code" is rather weak or non existant. One would also have to look at the compatibility of the CPL to other licenses. This comes in handy if one needs to change the license of ones product.
