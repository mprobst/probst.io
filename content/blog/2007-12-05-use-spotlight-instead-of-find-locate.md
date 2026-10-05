---
title: "Use Spotlight instead of find/locate"
date: 2007-12-05T10:16:36+00:00
updated: 2007-12-05T10:21:47+00:00
url: /blog/2007/12/05/use-spotlight-instead-of-find-locate/
draft: false
comments: 0
---

Might be really obvious, but you can use the command line Spotlight tool instead of find, locate, and grep -R. The cool thing is that it combines the speed of locate with the up-to-dateness of grep and find. It's not a complete replacement, but useful anyways.

You can limit mdfind to a certain directory with the -onlyin switch, e.g. <code>mdfind -onlyin foo</code> subsitutes <code>grep '...' -R foo</code>. It doesn't have full regular expressions (as far as I know), but I don't need those most of the time anyways.

Finding something by filename as in find is a bit ugly, you have to use some Spotlight specific attribute, e.g. <code>mdfind 'kMDItemDisplayName="comment*"'</code> will look for files starting with 'comment'. Beware that this will also look through the Apple translated names, e.g. <code>mdfind 'kMDItemDisplayName="Öffent*"'</code> will find /Users/martin/Public, at least on a German mac. Looking for the correct key, <code>kMDItemFSName</code>, works, but is apparently not answered from a cache - it's faster than a global find, but still quite slow on my system.

<code>mdimport -X</code> gives a list of known attributes that can be used in searches. With some bash scripting one could probably get quite close to locate or grep's comment line interface.
