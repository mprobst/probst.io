---
title: "More XML sizes"
date: 2004-11-29T08:14:56+00:00
updated: 2004-11-29T08:14:56+00:00
url: /blog/2004/11/29/more-xml-sizes/
draft: false
comments: 0
---

Yes Lars, you don't really have to have size statistics if you've got growing containers. But what should the growth rate be? How big should the smallest container be?

I can imagine that most XML text nodes will be below 20 characters/bytes (only whitespace separating other tags), but what will be the next size step? Some size statistics about real wild life documents would be nive to have. This will also vary a lot across different document types and uses of XML. A smart XML DBMS would try to adjust its storage settings to the document in question.
