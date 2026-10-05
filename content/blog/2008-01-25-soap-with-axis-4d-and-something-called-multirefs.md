---
title: "SOAP with Axis, 4D and something called multiRefs"
date: 2008-01-25T10:47:59+00:00
updated: 2008-01-25T10:51:02+00:00
url: /blog/2008/01/25/soap-with-axis-4d-and-something-called-multirefs/
draft: false
comments: 1
---

SOAP really totally sucks. I just wasted several hours trying to access a certain Webservice using Axis. The server is apparently implemented using 4D.

It turns out that by default Axis (at least 1.x) uses a feature called "sendMultiRefs". This turns regular, unsuspecting messages into this:
<pre class="prettyprint">
&lt;?xml version=&quot;1.0&quot; encoding=&quot;UTF-8&quot;?&gt;
&lt;soapenv:Envelope xmlns:soapenv=&quot;http://schemas.xmlsoap.org/soap/envelope/&quot;
    xmlns:xsd=&quot;http://www.w3.org/2001/XMLSchema&quot;
    xmlns:xsi=&quot;http://www.w3.org/2001/XMLSchema-instance&quot;&gt;
  &lt;soapenv:Body&gt;
    &lt;ns1:SomeAction xmlns:ns1=&quot;some-namespace&quot; 
        soapenv:encodingStyle=&quot;http://schemas.xmlsoap.org/soap/encoding/&quot;&gt;
      &lt;SID xsi:type=&quot;xsd:string&quot;&gt;some param1&lt;/SID&gt;
      &lt;startID href=&quot;#id0&quot;/&gt;
    &lt;/ns1:SomeAction&gt;
    &lt;multiRef xmlns:soapenc=&quot;http://schemas.xmlsoap.org/soap/encoding/&quot; 
      id=&quot;id0&quot; soapenc:root=&quot;0&quot; soapenv:encodingStyle=&quot;http://schemas.xmlsoap.org/soap/encoding/&quot; 
      xsi:type=&quot;xsd:int&quot;&gt;some param2&lt;/multiRef&gt;
  &lt;/soapenv:Body&gt;
&lt;/soapenv:Envelope&gt;
</pre>

The fun thing is that this happens somewhere really deep down in the Axis code - if you debug the Axis message send, all you see of the SOAP message is a regular message (without that multiRef abomination), even when you get down really close to the HTTP socket send. I found this in the end using Wireshark/Ethereal to inspect the actual packages.

Now what happens is that 4D silently drops/ignores the second parameter and apparently sets the value of that input parameter to 0. It doesn't give any error whatsoever, thanks. Additionally, due to the close coupling to the programming language, the implementation cannot make out if the parameter is not present or set to zero, because it comes out as an int value.

There are a lot of questions here. Why does Axis use a bizarre encoding scheme, <a href="http://almaer.com/blog/sendmultirefs-with-axis-11-for-net-interop">that is known to cause problems with a variety of platforms</a>, where it's totally superfluous? It even makes the messages larger. 

And why is this multiRef thing there, anyways? The only thing I can find about it on <a href="http://www.google.com/search?q=multiRef%20site:w3.org">www.w3.org</a> is a mention that it's included in SOAP 1.2, but not in SOAP 1.1. I can't find any mention of it in the spec itself, though. It only appears to be useful for serializing Object graphs that are self-referencing.

Why a messaging protocol needs something like that, which is totally linked to the complex semantics different meanings of identity in different programming languages etc., is beyond me. And actually most people don't seem to implement it anyways...

It's quite frustrating to use all this complex, bizarre stuff when all you'd really need is a webservice that takes 1 parameter and returns some XML-encoded list, i.e. http://foo/bar?startID=x.
