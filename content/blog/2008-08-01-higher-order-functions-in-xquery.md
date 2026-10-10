---
title: "Higher order functions in XQuery"
date: 2008-08-01T07:39:34+00:00
updated: 2008-08-01T07:40:47+00:00
url: /blog/2008/08/01/higher-order-functions-in-xquery/
draft: false
comments: 0
---

The requirements for XQuery 1.1 contain a <a href="http://www.w3.org/TR/xquery-11-requirements/#higher-order-functions">MAY item called "higher order functions"</a>. I'm really fond of the idea of higher order functions in XQuery, and as there are currently no use cases for that, I'll contribute some in here:

<h2>Simple predicates</h2>

A simple use case is to pass a predicate to another function, as shown below:

```
(:: Selectively only copy those elements for which $pred returns true
    TODO works recursively, but copys all attributes regardless of $pred
  :)
declare function local:selective-copy($nodes as element()*, $pred as function($node as element()) -> xs:boolean)
{
	for $n in $nodes
	return
	  (: call $pred :)
	  if ($pred($n)) then element { node-name($n) } { $n/@*, local:selective-copy($n/*, $pred) }
	  else ()
};

declare function local:mypred($node as element()) as xs:boolean
{
  let $name = node-name($node)
  return namespace-uri-from-QName($name) = ('http://www.example.com/example', 'http://www.foo.com/bar')
};

let $xml :=
  <user xmlns="http://www.example.com/example">
    <name><first>Fritz</first> <last>Müller</last></name>
    <password xmlns="http://www.example.com/secure">vj/b5ZaUYQ6kU</password>
    <preferences> ... </preferences>
  </user>
(: user the curry operator & to get a function "handle" :)
let $predicate := &local:mypred
return local:selective-copy($xml, $predicate)
```

<h2>Currying</h2>

The next use case would be the natural extension - real currying of functions. local:selective-copy is as above, but we'll generalize our predicate a bit:

```
(: this function compares the namespace of a given node against a set of legal namespaces :)
declare function local:namespace-matches($namespaces as xs:anyURI*, $node as element()) as xs:boolean
{
  let $name = node-name($node)
  return namespace-uri-from-QName($name) = $namespaces
};

let $xml :=
  <user xmlns="http://www.example.com/example">
    <name><first>Fritz</first> <last>Müller</last></name>
    <password xmlns="http://www.example.com/secure">vj/b5ZaUYQ6kU</password>
    <preferences> ... </preferences>
  </user>
(: user the curry operator & to get a function "handle"
   we pass in a namespace to check against, and get an unary function in return :)
let $predicate := &local:mypred("http://www.example.com/example")
return local:selective-copy($xml, $predicate)
```

<h2>The &amp; operator</h2>

The &amp; operator ("curry operator") returns a handle to the function given by name, possibly setting values for parameters by specifying them in parentheses. This provides the reification for functions, i.e., the way from a function to a value. 

Currying is only allowed from left to right, i.e., one cannot curry the second argument, but leave the first argument to a function unbound. I don't think this is a large restriction, and it makes the syntax much easier.

<h2>Calling function handles</h2>

The $someval(...) syntax allows straight forward calling of a function handle, so it is somewhat of the inverse of the &amp; operator.

<h2>Types for higher order functions</h2>

I think the static typing feature of XQuery never really gained much traction. However it would of course be possible to introduce a new type, called "function()", and specify parameters and return values as shown above. I think it should be possible to type-check that, but I'm not an expert.

<h2>Implementation</h2>

I didn't implement this yet (I currently don't have access to an XQuery implementation), but it should not clash with any existing syntax, so from a grammar point of view it should be ok. It does require some changes to the runtime system, but that shouldn't be too difficult, IMHO.

The nice thing about higher order functions is that they can allow some method of dynamic dispatch. That is, they allow to write programs that decide at runtime which code is going to be executed, in an elegant way.

This is of course not complete. It doesn't support a terse syntax for lambdas, which would also be nice (not having to declare all those pesky one-line functions). XQuery should also have something like a "fn:resolve-function($name, $argc)" that provides dynamic access to the curry operator by specifying the QName and argument count of the function.

I think the example shows that this little extension can get you a lot of nice functionality and a lot less typing. Please leave a comment with your opinion!
