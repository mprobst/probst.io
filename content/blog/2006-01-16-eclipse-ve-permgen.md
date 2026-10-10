---
title: "Eclipse VE & PermGen"
date: 2006-01-16T10:57:04+00:00
updated: 2006-01-16T10:58:26+00:00
url: /blog/2006/01/16/eclipse-ve-permgen/
draft: false
comments: 0
---

I currently use the Eclipse Visual Editor (VE) to create some SWT layout. The tool itself is really great as it produces high quality code that actually looks as if it had been written by a developer - for appropriate values of 'developer'. It's still a bit messy, but you can take it as a good start. I'm currently not sure how to use the code - I'd like to c&p it from the generated class to break it up a little bit, as my dialog is quite complex, though this probably makes it impossible to do further work on the code with the VE. (That's actually the great thing about VE - it operates on real Java code, no compilation step between it, and you can even modify the code without it biting you.)

The only problem I ran into were frequent OutOfMemoryErrors using it. I finally figured it's probably because of PermGen space, the heap area where interned strings and classes are stored. You can increase the PermGenSpace with this VM flag (on Sun's VM):

```
java -XX:MaxPermSpace=128M
```

Default is 64M, I'll see if this helps me.
