---
title: "Evolution & Spam filtering"
date: 2005-06-29T10:50:37+00:00
updated: 2005-06-29T10:50:37+00:00
url: /blog/2005/06/29/evolution-spam-filtering/
draft: false
comments: 0
---

After quite a long and annoying hunt I think I have found out why Evoltion refuses to filter spam for me. Evolution uses SpamAssassin as it's backend and SpamAssassin has a certain feature called bayes_auto_learn.

It basically means that everything that gets classified as definetly spam (>15) or definetly not spam (<=0.1) is also automatically sent to train the bayesian filter.

I really wonder of what use this is. The bayesian filter will learn the same rules that are already implemented in SpamAssassin by that, if I'm not mistaken. 

Apart from that, for me this was a nice bug. When you mark a message as spam in Evolution, it's supposed to train the filter. But the spam I'm getting (advertisement on stock options and such) always gets rated as 0.1 by SpamAssassin and is then automatically trained as not spam. Evolution would have to call sa-learn with the --forget option to force training the message as spam as SpamAssassin tries to avoid training messages multiple times.

So basically the spam filtering worked, but all the spam I got was automatically trained to be ham, no matter what I did with clicking etc. I whish spam filtering in Evolution was as easy and helpful as in Thunderbird...
