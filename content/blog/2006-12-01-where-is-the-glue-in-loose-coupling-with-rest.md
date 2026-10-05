---
title: "Where is the glue in loose coupling with REST?"
date: 2006-12-01T09:19:34+00:00
updated: 2006-12-01T09:19:34+00:00
url: /blog/2006/12/01/where-is-the-glue-in-loose-coupling-with-rest/
draft: false
comments: 1
---

Just a thought: all the REST people argue that this particular architecture made it possible to scale systems to the size of the web. This is - according to them - possible in particular because REST services as they are on the web provide a uniform interface to all consumers, which leads to loose coupling etc.

Now, the thing with loose coupling is that you need something to plug the loosely coupled things together, and probably provide some glue between them. Strongly typed systems like SOAP ensure compatibility between components by requiring consumers to explicitly adhere to certain types. This is sometimes painful, but it somehow makes sure the client nows what he's doing.

The web, as it is today, does not have this problem at all. Not because the architecture was any better, but because the things that glue interfaces together are magical systems capable of adjusting to unbelievable complexity, dynamic learning of interfaces and complex reasoning over input types. Yeah, humans.

Has someone thought about this? What's the RESTafarian answer?
