---
title: "XML Size Statistics"
date: 2004-11-27T18:41:48+00:00
updated: 2004-12-02T16:50:19+00:00
url: /blog/2004/11/27/xml-size-statistics/
draft: false
comments: 1
---

When storing XML in a database the single nodes are put into containers and stored on pages. Because it's generally easier to have fixed-size containers (representing objects) it's quite nice to do this with a default size and overflow containers.

But what default size should be used for what kind of nodes? We have to get some statistics on that point, but I get the impression that usually most text nodes are really small, e.g. not more than about 100-200 characters. Other nodes like elements are not that important as their name is usually only stored exactly once.

It seems as if the best solution was an incremental growth for the containers. Usually text nodes will be rather small (&lt;50 chars) but if they are bigger than that the will probably be bigger than 100 chars or even 200 chars too. Most textnodes will be something below 10 chars though, at least for data oriented XML as opposed to document oriented XML (think of formatting XML with breaks and tabs between the elements). So the first text node container should be like 20 chars, the next size maybe 100 and thereafter really big ones. But these are only guesses - I need statistics on that.
