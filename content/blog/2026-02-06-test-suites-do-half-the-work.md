---
title: "Test suites do half the work"
date: 2026-02-06T03:54:48+00:00
updated: 2026-02-06T03:54:48+00:00
url: /blog/2026/02/06/test-suites-do-half-the-work/
draft: false
comments: 0
---

Anthropic recently described how a team of Claude agents [built a C compiler](https://www.anthropic.com/engineering/building-c-compiler), presented as a project where they handed the task to the agents and then mostly stepped back: about 100,000 lines of Rust that can build a bootable Linux kernel and pass 99% of most compiler test suites, including GCC's torture tests.

But: the agents had access to extremely detailed and comprehensive test suites and execution harnesses, both written by humans, with the harness built specifically for the AI to consume. And they got a working compiler, but no commercial-grade product.

This is still quite the achievement, don't get me wrong.

But I'd expect the test suites to go a long way not just in validating the result, but also in structuring the task. The AI didn't solve "how do I compile Linux", but "there's a test with this description, part of the built-ins suite, to correctly handle GCC's `__attribute__((constructor))` declaration attribute; get the compiler to emit this specific assembly for this input".

That is, some of the input wasn't just what to do, but also how to structure the compiler, how to break the overall goal down into jobs, and how precisely to validate them.

I think the "mostly walked away" framing could have been more honest about that. I guess "we got Claude to follow along these test suites, until finally getting Linux to compile" is a bit less impressive, though.
