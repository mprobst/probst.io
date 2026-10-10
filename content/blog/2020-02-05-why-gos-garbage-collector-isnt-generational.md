---
title: "Why Go's garbage collector isn't generational"
date: 2020-02-05T13:06:50+00:00
updated: 2020-02-05T13:06:50+00:00
url: /blog/2020/02/05/why-gos-garbage-collector-isnt-generational/
draft: false
comments: 0
source: https://news.ycombinator.com/item?id=22246379
---

*Originally posted as a [comment on Hacker News](https://news.ycombinator.com/item?id=22246379) on [Why Discord is switching from Go to Rust](https://blog.discordapp.com/why-discord-is-switching-from-go-to-rust-a190bbca2b1f). Another commenter explained Discord's garbage collection problems like this:*

> The problem is that garbage collectors are optimized for applications that mostly have short-lived objects, and a small amount of long-lived objects.

I think it's not quite that.

Applications typically have a much larger old generation than young generation, i.e. many more long-lived objects than short-lived objects. So GCs do get optimized to process large heaps of old objects quickly and efficiently, e.g. with concurrent mark/sweep.

However, there is an additional observation: once an application has reached steady state, most newly allocated objects die young (think: the data associated with processing a single HTTP request or user interaction in a UI).

So as an additional optimization, GCs often split their heap into a young and an old generation, where garbage collecting the young generation earlier/more frequently overall reduces the amount of garbage collection done (and offsets the effort required to move objects around).

In the case of Go, though, the programming language allows "internal pointers", i.e. pointers to members of objects. This makes it much harder (or much more costly) to implement a generational, moving garbage collector, so Go doesn't actually have a young/old generation split, nor the additional optimization for young objects.
