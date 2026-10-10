---
title: "Why a different language can't replace JavaScript"
date: 2018-09-02T13:27:34+00:00
updated: 2018-09-02T13:27:34+00:00
url: /blog/2018/09/02/why-a-different-language-cant-replace-javascript/
draft: false
comments: 0
source: https://news.ycombinator.com/item?id=17896925
---

*Originally posted as a [comment on Hacker News](https://news.ycombinator.com/item?id=17896925) on Evan Martin's post [TypeScript at Google](http://neugierig.org/software/blog/2018/09/typescript-at-google.html). The post considers the tempting option of abandoning JavaScript altogether for something like GWT, Dart, WASM, Clojure, Haxe or Elm, and explains why that doesn't work. At the time, Evan and I were working on TypeScript at Google together, and this describes the thinking behind our approach.*

I thought about this for quite a while when we started on TypeScript at Google. I've convinced myself that using a different language cannot solve the problem that we're looking at.

The argument goes like this: if you use a different language than JavaScript for front end development, you're (hopefully) doing it for a reason. That is, you (a) want the other language's semantics (e.g. bounds checks on array accesses, runtime types, method dispatch, you name it), or you (b) might want the programming language's ecosystem: editors, IDEs, etc., but most importantly libraries and frameworks. Most likely, you're looking for a combination of (a) and (b).

The problem with (a) is that the more different the runtime semantics of your programming language are, the more emulation code you need. Emulation code is costly in code size, performance, interop with JS, and often understandability (at some point you will need to debug the output, believe me).

The problem with (b) is that you typically opt into a large ecosystem that was originally written for a very different environment. This was a big issue with GWT: people would pull in Java libraries, but those libraries, amazing as many are, were not written for the web or with code size in mind. This meant using a common library like Guava required a lot of engineering effort to keep code size in check. This also applies to WASM, possibly even more so.

These mechanisms work together to make it very hard to hit the sweet spot between performance, developer experience, and interoperability. And ironically, the better you get at the goals you're aiming for (different semantics, different ecosystem), the farther you get away from a working solution.

I don't think it's impossible to achieve a transpile-to-JS language that works really well with enough investment, but keeping in mind the other reasons Evan lists (mind share, existing code base), incrementally improving JavaScript where needed is IMHO the much more promising approach.
