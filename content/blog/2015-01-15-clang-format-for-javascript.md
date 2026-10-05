---
title: "clang-format for JavaScript"
date: 2015-01-15T16:24:54.985878+00:00
updated: 2015-01-15T17:26:26.876581+00:00
url: /blog/2015/01/15/clang-format-for-javascript/
draft: false
comments: 0
---

[clang-format](http://clang.llvm.org/docs/ClangFormat.html) is a very neat code formatter developed as part of the Clang project by my colleague Daniel Jasper here at Google. It's so good that many projects have decided to just completely rely on `clang-format` and never indent code manually nor use a linter. `clang-format` is reasonably well known in the C++ community by now, but it's much less well known that it also works for a bunch of other vaguely ALGOL-shaped programming languages. I've been working a bit with Daniel to make sure it works on JavaScript, which sorely lacks a robust formatter.

Two days ago [my pull request](https://github.com/Homebrew/homebrew/commit/08e363cd65a20f27cc2980a9f75c2db1f7c11723) to [Homebrew](http://brew.sh/) was accepted (yay!), so you can now easily install `clang-format` on any Mac and enjoy awesome code formatting.

1. Install [homebrew](http://brew.sh/)
1. `brew install clang-format`
1. There's no step three

Now when you run `clang-format -style=Google somefile.js`, it'll automatically spit a nicely indented version back at you. For example this terrible mess:

```js
function Foo() {
     this.bar =
    function() {this.doX(); this.doY();
  for (var x =
0; x < 12; x++) { if (this.z) 
    new 
 Foo(). callWithArgs   (
        {arg1: 'hello',
arg2: 'world'});}
    };          this.baz = 123;
           this.bam = {some: 'object literal', including: function() { calls(); }, asdSomeMoreKeysToWrap: 123};
}
```

With one keypress turns into this nicely indented piece:

```js
function Foo() {
  this.bar = function() {
    this.doX();
    this.doY();
    for (var x = 0; x < 12; x++) {
      if (this.z) new Foo().callWithArgs({arg1: 'hello', arg2: 'world'});
    }
  };
  this.baz = 123;
  this.bam = {
    some: 'object literal',
    including: function() { calls(); },
    asdSomeMoreKeysToWrap: 123
  };
}
```

I really like it - it takes a lot of the tedium out of writing code, and its indentation is really beautiful - usually much nicer than what I would bother with on a typical day.

`clang-format` already has integration with many editors, e.g. [vim](http://clang.llvm.org/docs/ClangFormat.html#vim-integration), or [Sublime Text](https://packagecontrol.io/packages/Clang%20Format), and the command line is straight forwad to use.

[Discuss on HN](https://news.ycombinator.com/item?id=8893620)
