---
title: "SSD is the new disk, disk is the new tape"
date: 2008-11-21T09:34:51+00:00
updated: 2008-11-21T09:34:51+00:00
url: /blog/2008/11/21/ssd-is-the-new-disk-disk-is-the-new-tape/
draft: false
comments: 0
---

Tim Bray has some <a href="http://www.tbray.org/ongoing/When/200x/2008/11/20/2008-Disk-Performance">very interesting performance numbers for storage systems</a>.

There is this saying that memory is the new disk, disk is the new tape. I think we have to insert something there - SSD is the new disk, disk is the new tape, and memory is somewhere between the CPU cache and the SSD.

The problem is then, how to benefit from these enhancements. If you have <em>ye olde database system</em>, you could simply put all of the data on SSD. This will be fast, but quite a bit of a waste. DBMSes currently manage the cache hierarchy on their own, having a memory cache for the really hot data, a disk storage for the not-so-hot, and tapes for backups.

It would be really nice if the DBMS was aware of the wildly different seek times of SSDs and disks, and if it thus could manage this aspect of the storage hierarchy, too. Ideally, it would lazily remember which data was accessed recently, and move the old stuff to disk. For example, in everyones favorite running performance example - called "Twitter" - presumably next to no one cares about tweets that are older than a month or so, so you could move them to <strike>tape</strike> disk.

This is <a href="http://www.martin-probst.com/blog/2008/11/11/databases-and-caching">again</a> a good example of a change in requirements for databases which as it is now requires developers to implement the smarts themselves. Let's hope databases will learn this...
