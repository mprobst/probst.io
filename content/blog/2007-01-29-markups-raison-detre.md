---
title: "Markups raison d'être"
date: 2007-01-29T09:30:57+00:00
updated: 2007-11-22T11:49:35+00:00
url: /blog/2007/01/29/markups-raison-detre/
draft: false
comments: 0
---

<p>David Megginson posted a <a href='http://www.megginson.com/blogs/quoderat/2007/01/28/thinking-about-structure/'>follow up</a> on his <a href='http://www.megginson.com/blogs/quoderat/2007/01/03/all-markup-ends-up-looking-like-xml/'>earlier take on JSON</a>, which contains an excellent example/explanation on the advantages of markup compared to hard wired data structures.</p>
<p>He starts of with a simple names example and ends up with the following JSON structure, in a futile attempt to design the be-all-end-all of names data structures:</p>

```
>    {"type": "name", "gender": "male", "prefix": "Don",
>      "given-name": "Alonso", "surname": "Quixote",
>      "surname-after-given-names": true, "postfix": "de la Mancha"}
```

<p>Where the minimal needed markup would still be:</p>

```
>    <name gender="male">Don Alonso <surname>Quixote</surname> de la Mancha</name>
```

<p>Granted: the JSON code contains a lot more semantic information about it&apos;s content, and that&apos;s why it&apos;s so much more complicated. But that is exactly the point: with XML (or markup in general) you can leave your data structures underspecified like Don Quixote&apos;s name, still have meaningful semantic annotations in parts of them, and then later go on and add other information to the data. Properly written clients (i.e. that don&apos;t depend on the exact number of XML elements below name) will continue to work without noticing.</p>
<p>Data structures such as the JSON code above require you to actually specify all this stuff upfront, and adding to them later will break any existing clients.</p>
<p>Great post, go read it.</p>
<p>PS: <a href='http://seanmcgrath.blogspot.com/2007_01_28_seanmcgrath_archive.html#1414920626243183583%231414920626243183583'>Sean McGrath elaborates.</a></p>
