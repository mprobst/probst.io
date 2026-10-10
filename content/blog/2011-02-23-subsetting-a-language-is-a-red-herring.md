---
title: "Subsetting a language is a red herring"
date: 2011-02-23T15:14:24+00:00
updated: 2011-02-23T15:14:24+00:00
url: /blog/2011/02/23/subsetting-a-language-is-a-red-herring/
draft: false
comments: 0
source: https://news.ycombinator.com/item?id=2254298
---

*Originally posted as a [comment on Hacker News](https://news.ycombinator.com/item?id=2254298) on [Switching to Plan J](http://alarmingdevelopment.org/?p=562), a post about moving from Scala back to Java. Another commenter suggested that a team can simply use Scala as a "better Java" and stay away from its advanced features. Earlier in the thread, the discussion had turned to a language's "complexity budget": languages have only so much room for concepts before their interactions become unpredictable and too much to keep in mind at once.*

I think the "subsetting the language" approach is a red herring. Yes, you can decide you'll only use features X, Y, and Z. Many people do that in similarly complex languages like C++.

But the programmers will, one way or the other, get exposed to the features you considered esoteric, be it through libraries, or sample code, or whatever. And then they have a piece of code in the language they use for daily work that they don't understand and can't debug, and they're alienated by strange compiler errors - not good.

It's IMHO also quite hard to come up with the subset you like. I mean, programmers like to have endless discussions about completely irrelevant topics, like brace placement; wait and see the discussions about actual language features to (not) use! Most features are in themselves completely reasonable, so it's hard to make a cut here.

I also think the "mediocre programmer" argument is a red herring. Not that there aren't mediocre programmers who will have trouble understanding certain language features at all - there certainly are.

But I'd wager that even for very good programmers, having many complex language features (that interact!) in a code base will be problematic. Of course you can understand what's going on with some effort on your side, but the problem is the effort. Programming languages are IMHO a bit like user interfaces in this regard: "don't make me think". Having code in a code base that's complex and/or hard to understand is a really, really bad thing. People will shy away from reading and modifying it, and over time it'll grow into an unmaintained monstrosity.

Again, this is about the complexity budget. Original Java code was dead easy to understand; now, with generics, it's a bit harder (but overall I think generics are less bad than you hear all the time). That was, and still is, one of the really killer Java features. Not only for mediocre programmers, but for general readability, and thus usability of the language.
