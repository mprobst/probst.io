---
title: "Reducing XPath"
date: 2010-01-05T14:43:51+00:00
updated: 2010-01-05T14:43:51+00:00
url: /blog/2010/01/05/reducing-xpath/
draft: false
comments: 1
---

Michael Kay writes on his blog: <a href="http://saxonica.blogharbor.com/blog/_archives/2010/1/5/4420740.html">"Could XPath have been better"</a>, suggesting XPath would have been a nicer language without all the little inconsistencies. Instead, he'd rather map more or less everything to built in functions and their application to sequences, including the axes, predicates, and so on.

This very much sounds like an implementors pipe dream: remove all the annoying inconsistencies and make it easier to create fast implementations.

If you are done replacing all implicit syntax with function calls, I think you might find that you have written a LISP interpreter with built in functions (some with funny or punctuation names) for DOM navigation. Not that that would be a bad thing.

Though this makes one wonder what the actual proposed value of XPath is, once you reduced it to a LISP dialect. Probably the restricted expressiveness and from that the ability of analyzing the function applications to produce a clever execution strategy.

This always reminds me of Erik Meijer and his presentation on LINQ at VLDB 2005 (?), where he demonstrated how LINQ effectively maps certain function applications (selection, projection) to different repositories. I still like the approach: provide a somewhat unified syntax, hand over an Abstract Syntax Tree at run time to the data source/repository, and let that find a good way of executing the query. Integrating the query language into the programming language very much reduces the pain for users, and creates a uniform interface for many different data sources.

This is of course limited to the .NET platform and effectively SQL only, afaik, and I have never actually used LINQ, so I have no idea how good it works out in practice. I might imagine that tool support (profiling! indexes!) can be difficult.
