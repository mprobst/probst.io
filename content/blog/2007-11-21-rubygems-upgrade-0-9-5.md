---
title: "RubyGems upgrade 0.9.5"
date: 2007-11-21T19:56:24+00:00
updated: 2007-11-21T19:56:24+00:00
url: /blog/2007/11/21/rubygems-upgrade-0-9-5/
draft: false
comments: 0
---

<a href='http://blog.segment7.net/articles/2007/11/19/rubygems-0-9-5'>RubyGems is available in version 0.9.5</a>. And installing it with <code>gem update --system</code> broke about everything on my system :-(

Gems couldn't find any already installed gem anymore. The fix was easy, though a bit time consuming: re-install all gems you have.

<pre class='prettyprint'>
$ export installed_gems="`ls /Library/Ruby/Gems/gems/ | sed s/-[^-]*$//g | sort -u`"
$ gem install $installed_gems
</pre>

(with /Library/Ruby/Gems/gems/ being the path to your gems)
