---
title: "XQuery Pretty Printer"
date: 2008-04-08T13:14:58+00:00
updated: 2008-04-08T13:14:58+00:00
url: /blog/2008/04/08/xquery-pretty-printer/
draft: false
comments: 0
---

As readers of this blog might know, I've spent quite some time implementing and optimizing XQuery engines in the last three years.

Something that has always bugged me were my attempts at XQuery parsers. XQuery is a keyword free language that has a truly complex lexical structure, so writing a parser is much more complicated for XQuery than one for, say, Java.

A nice example is this valid (!) query from <a href="http://www.w3.org/TR/xquery-xpath-parsing/">Building a Tokenizer for XQuery</a>:
> ```
> declare namespace namespace = "http://example.com";
> declare union <union>for gibberish {
>    for $for in for return <for>***div div</for>
> }</union>,
> if(if) then then else else- +-++-**-* instance
> of element(*)* * * **---++div- div -div
> ```

The * and + signs change meaning in different contexts, and so do the keywords like 'if' themselves. Within XML literals, the lexical structure changes completely. Function calls, type checks and the like are hard to disambiguate. And whitespace is sometimes significant, sometimes not. Quite a mess.

I wrote the first XQuery parser in my Bachelor's project in fall 2004/ spring 2005. As it was my first parser, and XQuery isn't really easy, and it was in C++, it ended up being quite a mess. The lexer was stateful, using a stack to switch contexts. These contexts would however not be controlled by the lexer, but from the parser. As the parser was implemented with ANTLR (2.7), syntactic predicates, lookahead etc. would bring the lexer out of context. The whole thing was pretty slow and generally fragile.

The next one was an existing parser at X-Hive which I extended and maintained. In this case, state was managed by the handwritten lexer, and parsing was again done using ANTLR. This one was really fast and worked pretty well, but maintaining the handwritten lexer with it's 20+ different states, the stack etc. was quite annoying. Adding support for XQuery Update to it was painful. I think code like a lexer should always be written in a domain specific language, otherwise you keep writing lots and lots of repeating Java code that essentially means nothing. 

So in a case of extreme procrastination, I started to write another XQuery parser, using ANTLR 3. ANTLR 3 brings a new analysis algorithm, called LL(*). That allows to make parsing decisions with arbitrary lookahead, depending on what context is needed. This is ideal for a language, where 'if' vs 'if (' makes a huge difference.

I again chose to manage state from the parser. But due to the LL(*) parsing this time I only needed two different lexical contexts: XML literals and plain XQuery. This simplified the whole thing a lot - I more or less wrote the parser in 3 or 4 days.

I'm pretty pleased with the end result. It's fast enough (about 0.2 ms for simple queries, might test some more soon) and it parses all the ~20000 test cases from the XQTS suite successfully (except for 37 false positives where my parser allows constructs like 'foo(: comment :): bar' as QNames, but that will be a simple fix).

Currently the parser is little more than a language acceptor. But I've always wanted to have a decent XQuery formatter/pretty printer. So I managed to get it to produce parse trees (like ASTs, but with a node for every rule), and use those for query formatting.

I basically construct the parse tree, use it as the input for an XSLT transformation that inserts &lt;indent/> tags and &lt;br/>s for line handling and puts some HTML spans with classes around the keywords. The result is piped through a SAX filter that converts the indentation tags into real indentation.

You can find the result here:
<a href="http://java.martin-probst.com/xqpretty/format.html">XQuery Pretty Printer / Formatter</a>.

Any bug reports or suggestions are very welcome. I will probably make the parser open source, once it's finished (it still has an issue with the full character range in QNames). I'll also probably make the formatter a web service accessible using plain HTTP, so I can use it to format my blog posts. 

Enjoy!
