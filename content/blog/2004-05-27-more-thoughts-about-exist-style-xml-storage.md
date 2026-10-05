---
title: "More thoughts about eXist style XML storage"
date: 2004-05-27T16:34:33+00:00
updated: 2004-12-03T17:21:37+00:00
url: /blog/2004/05/27/more-thoughts-about-exist-style-xml-storage/
draft: false
comments: 0
---

I've come to think a little bit more about the way eXist stores XML. Actually it's more what I imagine it's supposed to be because this is only based on what Lars Trieloff told me about the phantom nodes they use in XML trees - I am too lazy to really look up how they do it.

If you insert phantom nodes and number your XML nodes as mentioned before, one can store a whole XML tree without any pointers within the nodes. You just have to take care of a table indexed with the numbers containing references to the objects. This table could also contain fields for locks and maybe even Access Control Lists.

This is generally a Great Thing (tm) as it leads to nodes with a fixed size which would make storage a lot easier and faster. I'm not yet really sure if it's a good idea because you need to take care of the attributes of elements and the text within textnode. This could be done by storing only references to them within the nodes itself but that would mean another dereferenciation when doing comparisons within XPath/XQuery queries.

Regarding the table of nodes, there are two styles to keep it. The first one can be considered somewhat of a "dense" index. This would mean one entry for one node, even if it's a phantom node. The access to this table would be very fast - O(1). The drawback is a potentially massive overhead if your XML tree is very unbalanced. Imagine a tree that is generally very thin but has one node with several hundred children. The array would get extremely big because of all the phantom nodes.

The other style would be a sparse index. The list would only contain references for non phantom nodes even though they would be counted for the index. This index would be slower as it cannot be accessed directly via the index. If it is implemented as an ordered tree structure accesses would be sth like O(log n) - in which case the storage tradeoff for a pointered node tree might be less bad. Keep in mind that frequently traversed nodes would be in main memory all the time anyways so disk IO accesses should be seldom. Tree management shouldn't be a big issue as the complete index has to be rebuilt if something gets changed anyways.

The dense index would be great but the space tradeoff might be heavy. The dense index might be a bad idea - every access to a node would be O(log n) which is a lot compared to simple pointer dereferencing in a DOM tree. Sounds like this should be user configurable as only the user can know how unbalanced his trees might get.
