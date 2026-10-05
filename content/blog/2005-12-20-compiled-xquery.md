---
title: "Compiled XQuery"
date: 2005-12-20T23:53:06+00:00
updated: 2005-12-20T23:53:06+00:00
url: /blog/2005/12/20/compiled-xquery/
draft: false
comments: 1
---

<a href="http://weblogs.goshaky.com/weblogs/page/lars?entry=compiled_xslt2_xquery_vs_interpreted">Lars</a>, just because XQuery can be statically typed you can't remove all the runtime checks and by that be much faster, there are still a lot of (possibly non-type related) runtime errors. It might get faster if you don't have to parse a lot of integers because they are already stored as such, but that won't give you that much.

An XSLT processor might benefit from the schema information where it knows that "//foo/bar" can only occur at very certain points, so it doesn't have to match it against the whole tree. But for XQuery that's more or less pointless, as the language is for querying, not for transformation. Meaning, in most usecases you will not want all bars below foos because you want to make a nice table out of them, but rather all foos with a @bar value of 5, because you need the endpoint of that link, or all nodes containing the text "baz". In that case, you need indexes, and schema information doesn't help much.
