---
title: "XQuery Pretty Printer, ctd."
date: 2008-04-18T09:53:30+00:00
updated: 2008-04-18T09:55:10+00:00
url: /blog/2008/04/18/xquery-pretty-printer-ctd/
draft: false
comments: 0
---

I've continued to tweak the <a href="http://java.martin-probst.com/xqpretty/format.html">XQuery pretty printer</a> a bit.

It now properly breaks long lines into overflows that are lined up with the preceding open parenthesis (for now, suggestions for additional "tab markers" are welcome). Overly long lines that cannot be broken properly lead to a simple double-indent, as before.

I've also decided to brutally ignore any leading and trailing whitespace ("boundary space") in direct element constructors (XML literals), and simply format the contents. While this is against the standard, or at least should only be done if the query doesn't explicitly declare boundary-space preserve, I think it's beneficial in most cases. Also, I don't really have an idea on how to nicely format XML literals when whitespace is significant. The result probably always looks somewhat ugly and doesn't fit with the indented rest of the query.

Next step would be the formatting of comments and <a href="http://xqdoc.org/">xqDoc tags</a>, but I think that will have to wait some time. I'd need to implement another sub-lexer for that, as the comments currently simply come as one large string into the formatter. Not that much effort, but I think I should concentrate on my Master's thesis a bit.

By the way, it's possible to simply link to a formatted query by copying the URL, <a href="http://java.martin-probst.com/xqpretty/format.html?q=declare+function+foo%28%24a+as+element%28%29%2C+%24a+as+element%28%29%2C+%24a+as+element%28%29%2C+%24a+as+element%28%29%2C+%24a+as+element%28%29%2C+%24asdjaslkdjasldkjaslkdjaslkdjaslkdalk%29%0D%0A%7B%0D%0A++1%0D%0A%7D%3B%0D%0A%28%3A+no+comment+%3A%29%0D%0A%27Hello+world%27">like this</a>. The Formatter Servlet has no side effects, so it uses a stateless GET request.
