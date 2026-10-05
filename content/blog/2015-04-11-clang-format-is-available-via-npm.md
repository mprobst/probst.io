---
title: "clang-format is available via npm"
date: 2015-04-11T19:24:34.097742+00:00
updated: 2015-04-11T19:24:34.097876+00:00
url: /blog/2015/04/11/clang-format-is-available-via-npm/
draft: false
comments: 0
---

Thanks to the effort of my colleague Alex Eagle (mostly), `clang-format` is now available via [npm](http://npmjs.com). You can install it via `npm install -g clang-format`, and then just use the `clang-format` command normally. Binaries are available for Mac OS X and Linux, both 64 bit.

Beyond JavaScript, `clang-format` now does a pretty decent job at formatting [TypeScript](http://typescriptlang.org), too, including support for classes, interfaces, generics, and of course type annotations. While TypeScript comes with a simple indenter, that doesn't really support full formatting - e.g. it won't wrap overlong lines, doesn't align function parameters, etc. This is of course highly subjective, but I think clang-format does a better job, and it's nice to be able to use the same formatter across more or less all your languages (C++, Java, JS, TypeScript).

See my [clang-format for JavaScript](http://probst.io/blog/2015/01/15/clang-format-for-javascript/) for more details on how to use it.
