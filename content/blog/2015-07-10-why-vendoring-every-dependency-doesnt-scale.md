---
title: "Why vendoring every dependency doesn't scale"
date: 2015-07-10T09:15:47+00:00
updated: 2015-07-10T09:15:47+00:00
url: /blog/2015/07/10/why-vendoring-every-dependency-doesnt-scale/
draft: false
comments: 0
source: https://news.ycombinator.com/item?id=9862972
---

*Originally posted as a [comment on Hacker News](https://news.ycombinator.com/item?id=9862972) on [Go 1.5's vendor/ experiment](https://medium.com/@freeformz/go-1-5-s-vendor-experiment-fd3e830f52c3). Go 1.5 added experimental support for `vendor/` directories, in which a package keeps its own copies of the packages it depends on.*

Go's vendoring is similar to node_modules + npm, in essence.

Having used node and npm on both small (~200 transitive deps) and large (~1000 transitive deps) projects, I think this is an approach that's conceptually not a good idea (outside of possible implementation issues with npm).

With vendoring, you end up with a _very_ large tree of transitive vendored dependencies. You have no idea of, or control over, what's in it, and what versions of what packages are in it.

Nearly all of the time, the two allegedly incompatible versions of a library that you install separately turn out to be 2.0.13 and 2.0.14, and you only get two because, well, somebody hasn't upgraded yet.

This might seem trivial, but in the end you have a project tree where every dependency gets installed separately for everything that depends on it, so you end up with something like O(number of deps * number of deps) installed libraries, which obviously doesn't scale.

You also end up with the versioning problem. Imagine there's an important reason to upgrade some package P, e.g. a security issue. Now you have to hunt down every single project in your transitive dependencies that depends on it, and ask them to upgrade or fork.

You also still have version issues. If you transitively depend on the same library C in versions Cv1 and Cv2, and you want to pass an object/data structure/... from Cv1 to Cv2 through some path, you open yourself up to all kinds of hilarious version mismatches and failures.

This isn't new - e.g. Eclipse/OSGi did the same thing with separated class loaders, and it was a mess.

I think flattening your dependency/vendor tree to only ever have one version of library C, and hoping/testing for minor version mismatches to work out, is the most viable thing to do.
