---
title: "Why is String.format() static?"
date: 2008-01-16T11:01:18+00:00
updated: 2008-01-16T11:01:18+00:00
url: /blog/2008/01/16/why-is-string-format-static/
draft: false
comments: 0
---

I really wonder why they made java.lang.String.format(String format, Object... args) a static method. Compare:

```
String message = String.format("Failed to quizzle the fibble: %s", fibble);
```

with:

```
String message = "Failed to quizzle the fibble: %s".format(fibble);
```

The latter isn't only more object-oriented (static methods are in effect global procedures), it's also less typing.
