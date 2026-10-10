---
title: "Opportunistic fixing vs. long-term planning"
date: 2018-09-13T08:59:09+00:00
updated: 2018-09-13T08:59:09+00:00
url: /blog/2018/09/13/opportunistic-fixing-vs-long-term-planning/
draft: false
comments: 0
source: https://news.ycombinator.com/item?id=17977087
---

*Originally posted as a [comment on Hacker News](https://news.ycombinator.com/item?id=17977087) on [Ending PHP Support, and the Future of Hack](https://hhvm.com/blog/2018/09/12/end-of-php-support-future-of-hack.html), the announcement that Facebook's HHVM would drop PHP support and focus on Hack, Facebook's own language derived from PHP.*

It's interesting to see HHVM drop PHP support, particularly if you look at it from an organizational decision-making standpoint. Hypothetically, because I'm not involved in any of this, but still:

Facebook was initially implemented using PHP, and you can read this process as continued iteration based on this very early decision. From the outside, Facebook seems to have always taken what they had, taken the problems they currently had, and made the most incremental change they could to fix whatever problem they had. From PHP to HHVM to Hack to dropping PHP support, they continued iterating on whatever code base and development chain they currently had.

If you take a step back, though, Facebook is gradually moving to a different programming environment, from a dynamic language with very loose semantics to a statically typed system with (from code I've seen in e.g. Phabricator) a very different programming style than run-of-the-mill PHP. While iterating incrementally, they still ended up forking PHP and moving to a different language.

The approach is quite different from e.g. Twitter, though, who started off using Ruby on Rails, and then moved everything to an entirely different toolchain (Scala) when they found Rails couldn't keep up with their problem set.

This difference in approaches isn't quite the same as the good old "rewrite vs. refactor" dichotomy. Twitter's change was certainly incremental too, moving individual services to Scala bit by bit and setting them live incrementally, instead of a "big bang" rewrite where everything moves to Scala one day.

I think the main difference is planning horizon: do you opportunistically fix whatever is broken right now, or do you make a long-term plan for what you want your future platform to be, and then set out to get there?

Opportunistic fixing has the advantage that you can be pretty certain you're fixing the right problem, and don't invest in YAGNI features. On the other hand, you risk ending up in local optima. Pouring a lot of effort into PHP makes sense if you plan to continue using it - but if you end up forking the language anyway, you lose a lot of the advantages of a shared ecosystem (and arguably damage the existing ecosystem in the process through fragmentation).

You could equally well imagine Facebook picking a different future tech stack five years ago, be it Rust or Go or whatever, and adding the features they miss from PHP to it. I think it's an interesting thought experiment where that'd have taken them. I have no idea if taking that path would have been better for any of {Facebook, PHP, target language X, world}.
