---
title: "Tail Recursion in XQuery"
date: 2006-02-07T12:58:37+00:00
updated: 2006-02-08T08:51:50+00:00
url: /blog/2006/02/07/tail-recursion-in-xquery/
draft: false
comments: 5
---

Today I finished a feature for the <a href="http://www.x-hive.com/products/db/">X-Hive/DB</a> XQuery processor that has been sitting on my wishlist for quite a while: Tail Recursion. The problem is that in functional languages (like XQuery) you often write recursive functions to achieve some goal. While this is very elegant, it has the problem that you can run out of stack space quite fast if you process deeply nested structures or long lists. Tail Recursion can solve this in certain cases by evaluating the function in an iterative way. E.g.

```
declare function local:sum($start as xs:integer) as xs:integer
{
  if ($start eq 0) then 0
  else $start + local:sum($start - 1)
};
```

If you rewrite this function to this:

```
declare function local:sum($start as xs:integer, $acc as xs:integer) as xs:integer
{
  if ($start eq 0) then $acc
  else local:sum($start - 1, $start + $acc)
};
```

the interpreter can evaluate each tail call after the method body has been evaluated, because the values returned by the call are not used in the calculation of the body, but rather returned directly. To enable this, the path to the tail call within the function must only contain if/else or sequence (",") operators, as opposed to the "+" operator above.

To enable this in X-Hive, we had to turn of lazy evaluation of the function call parameters for tail calls (otherwise you'd run out of heap space), which should not be a problem, and we had to accept a minor non conformance. The problem is that you can't really check function return values as mandated by the standard if your function doesn't really return the whole evaluated sequence. The end result of the whole function call is still checked, but subresults of the single tail calls aren't. We consider this to be ok, as it doesn't create false results for correct queries and the examples of offending queries are pretty contrived. I would be very suprised to encounter something like this in the wild:

```
declare function local:foo($x) as xs:integer
{
  if ($x eq 0) then ()
  else (1, local:foo(0))
};
```

Calling this function with any value for $x will return a single "1", which matches the declared return value, but the result returned by the intermediate local:foo(0) call does not - it's the empty sequence which doesn't match the declared "exactly one xs:integer". While we're aware that this is interpreting the <a href="http://www.w3.org/TR/xquery/#id-errors-and-opt">Rules for optimization and error cases</a> in a very liberal way, we feel that it's worth it, as tail recursion allows a wide range of problems to be solved within XQuery that would be impossible otherwise.
