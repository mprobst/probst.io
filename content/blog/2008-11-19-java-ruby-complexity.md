---
title: "Java & Ruby complexity"
date: 2008-11-19T07:33:52+00:00
updated: 2008-11-19T07:33:52+00:00
url: /blog/2008/11/19/java-ruby-complexity/
draft: false
comments: 0
---

<a href="http://pmuellr.blogspot.com/2008/11/brainwashed.html">Patrick Mueller writes</a>:

<blockquote>
Same sort of nutso thinking with Java. A potentially decent systems-level programming language, it could have been a successor to C and C++ had things worked out a bit differently. But as an application programming language? Sure, some people can do it. But there's a level of complexity there, over and above application programming languages we've used in the past - COBOL and BASIC, for instance - that really renders it unsuitable for a large potential segment of the programmer market.

[...]

We're seeing an upswing in alternative languages where Java used to be king: Ruby, Python, Groovy, etc
</blockquote>

I really don't agree with the notion of complexity in Java. Complexity as a term is IMHO highly unprecise, so maybe we're just thinking differently about it here.

Much of the stuff people people don't like about Java is actually it's verboseness (compared to e.g. Ruby), but that's nearly the opposite of complexity. The inventors of Java explicitly left a lot of features out - like closures - because they feared they would create a too complex programming language.

Ruby & Co have all these features, plus a lot of nice meta programming, and a somewhat weird module/inclusion/inheritance system. I personally think that Ruby is much more complex than Java in the long term. The interesting question is whether people will be happy with the added complexity in the long term.

I see this as a trade off in programming languages: language features like cool meta programming, closures, or a really worked out type system (a la OCaml & Haskell) can remove a lot of accidental complexity: with them. you're able to write programs much more succinct, or have proofs of global properties of you're program that weren't possible before.

On the other hand, language features can create a lot of complexity, if not done really well. I'm reading the Scala mailing list, and I remember discussions of the sort "is this code legal Scala? and if it is, what does it mean?" (usually from a type system point of view), and if I remember correctly the language designers weren't quite sure about it either. This is exactly what you don't want in a language: unclarity or ambiguity of expressions, unexpected "side effects" of expressions.

Quite a lot of Ruby/Rails code one happens to see is clever in very interesting ways. But I really see that cleverness as a problem: who will understand the tricks that made the code a bit shorter in five years? Probably someone, but it might take him a long time to do so. Already now it's sometimes quite difficult to find documentation on a particular library method/class in Ruby, as the documentation system is apparently not up to handle the language's module inclusion features.

At what point do all these clever tricks sum up to something that is no longer understandable? Are we really sure that the modularization works out good enough that we don't have to be afraid of all ending up as a large meta-closure-soup? ;-)

Don't get me wrong: I like dynamic languages for a lot of features. I'm just weary of some of the effects. Pushing accidental complexity out of the application and into the programming language (now as feature complexity) should normally be a good thing: it sounds reasonable that this should reduce overall complexity, and give programmers a broader understanding of what's happening. We need a good modularity system and proper abstractions to have a real positive effect from this - and I'm not sure I see this in e.g. Ruby.
