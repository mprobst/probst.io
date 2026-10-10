---
title: "Software techniques are tradeoffs, not beliefs"
date: 2018-07-01T21:45:55+00:00
updated: 2018-07-01T21:45:55+00:00
url: /blog/2018/07/01/software-techniques-are-tradeoffs-not-beliefs/
draft: false
comments: 0
source: https://news.ycombinator.com/item?id=17437802
---

*Originally posted as a [comment on Hacker News](https://news.ycombinator.com/item?id=17437802) in a discussion of [Lost in Math](http://www.math.columbia.edu/~woit/wordpress/?p=10314). Another commenter argued that software development isn't really engineering: we can measure little about it, and debates about "clean" or "beautiful" code come down to subjective positions, fanatically defended by "true believers".*

True believers are a problem indeed - people who seem to think software development is about applying firmly held beliefs out of context can really screw things up royally.

That being said, by now software engineering has a large set of techniques with reasonably well-understood properties, and we can absolutely reason through whether a technique is useful to solve a particular problem.

For example, polymorphism is a useful technique to invert the locality of implementation details, making it easier to extend software in a distributed way. Its advantage is its drawback: it makes control flow harder to follow, and generally makes the software more difficult to understand, precisely due to the distributed extensibility.

Similarly, mocking is a technique to reduce testing "surface" by removing dependencies on specific components from a test. It's a great tool to make tests easier to write, improve test performance, and avoid ambient test dependencies and associated complexity. On the other hand, it reduces test depth by ignoring potentially important interactions, and often leads to overly brittle, hard-to-maintain tests that add little value in actually testing the software.

It's easy to go on. None of these techniques are silver bullets or axioms to be followed religiously; they are specific solutions to specific problems. They aren't necessarily measurable in an analog fashion, such as the load-bearing capability of a steel beam; they are often more binary (quite fitting, given the domain). But you can judge whether they are useful to solve a specific problem.

That is, I don't follow the "it's all just opinion" kind of software engineering defeatism. Yes, there's a ton of extremely questionable evangelism, often spread with huge pomp and circumstance by people with limited insight. But that's really just that: limited insight.
