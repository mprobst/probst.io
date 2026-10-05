---
title: "Java Unit Test Coverage"
date: 2005-09-04T11:16:57+00:00
updated: 2005-09-04T11:17:11+00:00
url: /blog/2005/09/04/java-unit-test-coverage/
draft: false
comments: 1
---

I've spent one and a half day last week setting up a Java Unit Test code coverage system. This was somewhat surprising to me, I don't think something like that should take that long. The major problem was the state of the available tools. I wanted to find if there exist any usable open source tools first, so I avoided Clover, JCover & Co. Instead I tried:

* jcoverage GPL - <a href="http://www.jcoverage.com/">http://www.jcoverage.com/</a> <br />
  Doesn't work with Java 1.5, not updated for ages.
* Quilt - <a href="http://quilt.apache.org">http://quilt.apache.org</a> <br />
  Doesn't work, not quite sure why. Not updated for ages.
* ucovered - <a href="http://jxcl.sourceforge.net/">http://jxcl.sourceforge.net/</a> <br />
  Doesn't work, Javadoc even states the error in question, but seems to be abandoned, too.
* cobertura - <a href="http://cobertura.sourceforge.net/">http://cobertura.sourceforge.net/</a> <br />
  Does work (hurray!) and seems to be in active development. Creates really nice coverage reports, but has quite some overhead problems. Even with some tricks the overhead seemed to be something like factor 4 to factor 5, and that just doesn't work if you have a testsuite of >10,000 tests that does already take several hours
* EMMA - <a href="http://emma.sourceforge.net/">http://emma.sourceforge.net/</a> <br />
  This is what we are running now. EMMA doesn't test real line coverage, but rather code block coverage. A code block is some java code that is not broken up by flow logic but rather a simple sequence of statements. I'm not sure if it's because of that, but EMMA is a lot faster than cobertura. Drawback is that the results are not displayed as nice.

So now we have something that is somewhat working. Somewhat because I ran into (presumably) a bug of ant (1.6.3) where custom junit task result formatters don't get their extension passed along if the &lt;junit/> task is set to forkmode='once'. This currently makes it impossible to view the results of the unit tests if they are run with code coverage enabled, and by that makes it quite difficult to hunt down errors. I still have to check if that bug is fixed in a later version of ANT.

The forkmode='once' also lead to quite a number of errors on our side, as our test machinery relies on static class fields in several places, and those might be set to something wrong after a test. That's probably an error on our side, but annoying nonetheless. The forkmode='once' is necessary though, as anything else slows down the testing horribly.

In the aftermath coverage testing is quite nice, and the results are not as horrible as I expected. In most packages we have a coverage of over 90%. Most of the untested code is in generated classes. I presume most of it is untestable and not used at all. Code coverage in terms of lines or blocks is of course a very bad criterium for test completeness, path coverage wouldn't be that much better too, but it can at least give you good pointers to areas that are under- or untested. Another step to better software development ;-)

PS: Also a plus for EMMA is that it's self contained, only two jars, as opposed to other projects which require 6-8 libraries to be on your classpath. This is generally just a little more work to do when setting up, but wait until tool A requires a different version of a library than tool B. DLL hell for java, but that's another story ...
