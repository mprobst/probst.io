---
title: "Wide Finder in Scala"
date: 2007-09-24T22:42:43+00:00
updated: 2007-09-25T22:11:20+00:00
url: /blog/2007/09/24/wide-finder-in-scala/
draft: false
comments: 4
---

<a href="http://www.tbray.org/ongoing/When/200x/2007/09/20/Wide-Finder">Tim Bray</a>:

<blockquote>In my Finding Things chapter of Beautiful Code, the first complete program is a little Ruby script that reads the ongoing Apache logfile and figures out which articles have been fetched the most. It's a classic example of the culture, born in Awk, perfected in Perl, of getting useful work done by combining regular expressions and hash tables. I want to figure out how to write an equivalent program that runs fast on modern CPUs with low clock rates but many cores; this is the Wide Finder project.</blockquote>

So while it's probably most sensible to do this with some map/reduce library, I tried implementing it using Scala actors. I'm not a Scala programmer, and have no clue about the Actors library, so this code is probably totally wrong, inefficient etc. But at least I can learn something this way :-)

First the original Ruby script:
<pre class="prettyprint">counts = {}
counts.default = 0

ARGF.each_line do |line|
  if line =~ %r{GET /ongoing/When/\\d\\d\\dx/(\\d\\d\\d\\d/\\d\\d/\\d\\d/[^ .]+) }
    counts[$1] += 1
  end
end

keys_by_count = counts.keys.sort { |a, b| counts[b] <=> counts[a] }
keys_by_count[0 .. 9].each do |key|
  puts "#{counts[key]}: #{key}"
end
</pre>

Converted to Scala, that gives for the serial case:
<pre class="prettyprint">object SerialAnalyzer extends Application {
  val pattern = Pattern.compile("GET /root/(\\\\d\\\\d\\\\d\\\\d/\\\\d\\\\d/\\\\d\\\\d/[^ .]+)")
  val reader = new BufferedReader(new FileReader("/Users/martin/tmp/log"))

  val counts = new HashMap[String, Int]
  var line = reader.readLine
  while (line != null) { 
    val matcher = LogMatcher.pattern.matcher(line)
    if (matcher.find()) {
      val uri = matcher.group(1)
      val count = counts.getOrElse(uri, 0) 
      counts(uri) = count + 1
    }
    line = reader.readLine
  }
}
</pre>

This takes about 1.5 seconds to go through 250 M of log files on a dual core MacBook Pro 2GHz.

<pre class="prettyprint">object Analyzer {
  def main(args: Array[String]): Unit = {
    val numAnalyzers = if (args.length > 0) Integer.parseInt(args(0)) else 4
    val logreader = new LogReader(numAnalyzers)
    logreader.start
  }
}

class LogReader(numAnalyzers: int) extends Actor {
  val reader = new BufferedReader(new FileReader("/Users/martin/tmp/log"))
  def hundredLines = (for (val i <- 0 to 10000) yield reader.readLine).toList
  
  val analyzers = (for (val i <- 1 to numAnalyzers) yield new LogMatcher).toList
  analyzers.foreach(_.start)
  
  def act = {
    while (reader.ready) analyzers.foreach(_ ! hundredLines)
    analyzers.foreach(_ ! Stop)
    for (analyzer <- analyzers) {
      receive {
        case result: HashMap[String, Int] => print("Done.\\n")
      }
    }
    val resultMap = new HashMap[String,Int]
    for (map <- analyzers.map(_.counts); (uri, count) <- map) {
      resultMap(uri) = resultMap.getOrElse(uri, 0) + count
    }
    for (entry <- resultMap) print(entry._1 + ": " + entry._2 + "\\n")
  }
}

object LogMatcher {
  val pattern = Pattern.compile("GET /root/(\\\\d\\\\d\\\\d\\\\d/\\\\d\\\\d/\\\\d\\\\d/[^ .]+)")
}
class LogMatcher extends Actor {
  val counts = new HashMap[String, Int]
  
  def act = {
    loop {
      react {
        case lines: List[String] =>
          for (line <- lines if line != null) { 
            val matcher = LogMatcher.pattern.matcher(line)
            if (matcher.find()) {
              val uri = matcher.group(1)
              val count = counts.getOrElse(uri, 0) 
              counts(uri) = count + 1
            }
          }
        case Stop => 
          sender ! counts
          exit()
      }
    }
  }
}
</pre>

The code does work, but sadly the Actors version is not faster than the single threaded version on my dual core MacBook Pro. No idea why... also the program exhibits some sort of a memory leak - it seems to keep the whole file in memory, thus giving OutOfMemoryErrors if you don't run it with a Java heap big enough for the whole log file. Again, no idea why, I don't seem to keep any nasty pointers to anyone.

So what does this give? Ruby is an elegant language with a nice collections API. Scala is much nicer than Java, but still quite talkative. And I obviously didn't really get something about the Scala actors...

PS: The Ruby version takes about 20 seconds to go through 270 MB of logs. The serial, no concurrency Scala version takes 18.5 seconds. Simply reading the data line-by-line using Scala takes over 12 seconds.
