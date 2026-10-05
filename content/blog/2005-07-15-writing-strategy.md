---
title: "Writing strategy"
date: 2005-07-15T22:41:26+00:00
updated: 2005-07-15T22:44:39+00:00
url: /blog/2005/07/15/writing-strategy/
draft: false
comments: 1
---

Bennaco tells us <a href="http://www.bennaco.com/ruin.htm">How to Ruin a Writing Project in 10 Easy Steps</a>. After that, he writes how to really do it, step 1:

<blockquote>1. Decide that you're not going to really "do it".

Which is to say, decide that you are not going to approach the whole big, terrifying, thing in one go. Instead, you're going to do some noodling around, some very small, easy, graspable, low-intensity, and non-threatening things, one at a time, until the project gets done. </blockquote>

While he is talking about how to write as in literature, I feel this does apply a lot to programming, too. If your starting to write a big piece of complex software, do not try to approach the whole big thing at once. Just start writing all the little parts that glue together to the whole.

Start off by dissecting the problem into smaller building blocks. This is the most important step and requires quite some time. Dissect the blocks more until you can describe what each block really does in two sentences, without "and then something magic happens". Really figure out how the single parts work together, otherwise you'll be screwed afterwards. Discuss every detail with you team members, if any, to really make sure it works this way.

Then start to write all the smaller parts. Don't start with your "public static void main(String[] args)", but rather with the smaller helper routines, the data model your working on, conversion etc. If you have a proper development environment, you can test those parts using you favorite Unit Testing framework. The important thing is not to implement something that does the full job partially, but rather do a small part completely. Otherwise you will end up with a codebase that is completly cluttered by adding feature after feature without a bigger plan. That results in rewrites over rewrites and lots of bugs, not to forget the maintenance nightmare.

If you just continue to do so, at some point you will start using these components and glueing them together, more or less automatically. At this point, everything you should be finished with all the low level stuff and just put together the system in a bigger sense.

Finally putting the blocks together and seeing how it takes off can be quite rewarding. On the <a href="http://bpt.hpi.uni-potsdam.de/twiki/bin/view/Public/NaXDB">XMLDB project</a> I did at the end of my bachelor studies, the senior developers supervising us recommended to just get something working as fast as possible. We did not go that way but rather took 2 months of planning out of 7. Then we started writing components, testing and slowly putting them together. The system didn't run a single query until after 4 1/2 months. But at that point, most of the hard work was done and we managed to deliver a working XQuery and XUpdate implementation including a persistent storage backend on time. And that with seven students, of whom one was busy writing a GUI for the server and one was doing documentation, infrastructure and other related work.

I just cited Bennaco's first point, but the rest is quite similar to what I wrote. Lots of refinements of an abstract plan until it's really trivial to write the single steps and glueing them together.
