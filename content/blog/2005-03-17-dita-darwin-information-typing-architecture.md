---
title: "DITA - Darwin Information Typing Architecture"
date: 2005-03-17T16:25:23+00:00
updated: 2005-03-17T16:25:57+00:00
url: /blog/2005/03/17/dita-darwin-information-typing-architecture/
draft: false
comments: 2
---

I just stumbled across <a href="http://www-106.ibm.com/developerworks/xml/library/x-dita1/">DITA, the Darwin Information Typing Architecture</a>. It's an XML application for software documentation. While I just gave it a very quick read (I'm mainly blogging this so I don't forget to check on that later) it seems to differ from DocBook in two points:
<ul>
<li>Smaller and software-centered. The number of elements seems to be smaller compared to DocBook</li>
<li>Designed for extension/restriction by users</li>
</ul>

The second point sounds interesting. DITA mainly consists of a central XML DTD which describes a "topic". Every information collected in the system has to be hierarchically below a topic. And while DITA provides a basic topic-DTD it's intended to be extended or restricted by it's users. E.g. the user would create a new DTD which only contains a subset of the DITA syntax to ensure that information using this topic DTD only contains specific elements. She could also write a new DTD which brings more elements to describe information specific to her application domain.

Now I just wonder why they use DTDs?
