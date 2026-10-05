---
title: "Databases and Caching"
date: 2008-11-11T18:24:17+00:00
updated: 2008-11-11T18:26:47+00:00
url: /blog/2008/11/11/databases-and-caching/
draft: false
comments: 1
---

Dare Obasanjo <a href="http://www.25hoursaday.com/weblog/2008/11/09/InMemoryCachingWhyWeCantJustTrustTheDatabaseToGetItRight.aspx">compares database caching with how compilers manage the various CPU caches (e.g., L1, L2)</a>. Surprisingly he comes to the conclusion that you need to implement your own caching scheme through memcached and friends because in the database situation the amount of data is so large:

<blockquote>
The biggest problem is hardware limitations. A database server will typically have twenty to fifty times more hard drive storage capacity than it has memory. Optimistically this means a database server can cache about 5% to 10% of its entire data in memory before having to go to disk.

[...]

So the problem isn't a lack of transparent caching functionality in relational databases today. The problem is the significant differences in the storage and I/O capacity of memory versus disk in situations where a large percentage of the data set needs to be retrieved regularly.</blockquote>

I wonder how this is different from the sizes of L2 cache compared to main memory?

It's even worse: on a regular PC you might have 4MB L2 cache, but 4 GB of main memory. That's about 0.1 % compared to main memory - so databases actually have a relatively luxurious position, compared only by relative data size.

<h3>Application knowledge</h3>

Quite the contrary, I believe the problem is not in the data sizes, but in the optimization hints available to databases (and potentially the smartness of the database caching methods). With a good compiler, in particular a JIT, you can easily judge what data will be used in the near future in the code execution, and through data flow analysis and fancy register allocation tricks a compiler has a pretty complete knowledge of what the code tries to do, so it can optimize cache usage (and a whole lot of other things) very efficiently.

Compared to this, databases have little knowledge of the data access patterns of the application. They can only rebuild this knowledge from observations on the queries hitting them, but they don't seem to be very successful there judging from the frequency you hear people talking about memcached. I'm not sure why that is exactly, maybe because it's always more difficult to implement optimizations based on observations of dynamic data than on static knowledge?

One possible problem is probably that the database doesn't necessarily know - and in many situations probably cannot even guess - which data structures are commonly displayed together for a certain webpage, so caches can be invalidated together, or directly stored together.

It might be an interesting thought experiment to think what would be possible if the database was integrated with the application logic in a way that would make the application knowledge available to the database. This could probably lead to interesting changes regarding invalidation and cache organization. I know there were (and probably still are) some things going into this direction in the Smalltalk environment, but I have no idea if they really take advantage of the application knowledge. Probably not, as most Smalltalk is highly dynamic and I don't think they've put the emphasis into declarative programming that would be needed for this.

<h3>Cache Granularity</h3>

Also interesting might be the fact that the granularity of objects in a relational database is quite different from the application perspective. Relational databases store entities in rows in tables, but (web-)applications have a hugely different data model. A single application entity, e.g., a user, will span over several tables. But the pages the database uses as the unit of caching usually only contain data from one table. If you have 16k of cache, that might be enough memory for several hot data entities, but because the database caches tables, not application entities, much of those 16k will be filled with rarely used rows, e.g., 4k from the users table, 4k from the mood messages table, 4k from the friends table, and so on. Application developers fight this (and the processing cost of joins operations) with denormalization, which is basically a hack to reduce the number of tables an entity spans.

This all boils down to the fact that relational databases were designed for mass-data processing, like in financial institutions, where large calculations over huge tables of uniform data with little nested structures are the common operation.

I think this is one of the area where non-relational databases, like XML databases, are going to have a bright future. The data model, and thus the unit of caching, is much closer to what today's content-centric application's data actually looks like. It's not only much easier to program without that impedance mismatch, it can also have significant performance advantages over RDBMSes.
