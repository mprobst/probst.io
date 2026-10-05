---
title: "Embedding XSLT transformations in JARs, or how I learned to (not) love the resolver"
date: 2007-01-20T12:26:28+00:00
updated: 2007-01-21T18:52:05+00:00
url: /blog/2007/01/20/embedding-xslt-transformations-in-jars-or-how-i-learned-to-not-love-the-resolver/
draft: false
comments: 2
---

<h3>Procrastination</h3>

Once again I'm trying to switch our X-Hive build to <a href="http://maven.apache.org">Maven (2)</a>. I've tried that about two years ago, but at that time Maven 2 was not quite ready, and Maven 1 was already deprecated. This is a clear act of procrastination, I should be preparing for my tests. I think I could seriously increase my productivity if I always had some tests to procrastinate around...

<h3>XSLT-based Mojo</h3>

Anyways, I needed to write a small build plugin as in X-Hive some sources are generated from XML specifications using XSLT. Java build plugins are called Mojos in Maven. I wanted to create one single jar containing both the Mojo itself and all required resources, namely the XSLT file and the DTD files that are used by both the XSLT document and the XML files that are transformed. Please don't ask me who came up with using DTDs in an XSLT file. I thought I'd simply set up a resolver, but the whole process was surprisingly painful.

In Java you create a <a href="http://java.sun.com/j2se/1.5.0/docs/api/javax/xml/transform/Transformer.html">Transformer</a> using a <a href="http://java.sun.com/j2se/1.5.0/docs/api/javax/xml/transform/TransformerFactory.html">TransformerFactory</a>. Both have a setURIResolver() method that takes a URIResolver.

<h3>Resolvers</h3>

But the surprise is that you need a URIResolver to resolve XSLT <code>document()</code> calls, but an EntityResolver to resolve DTD load operations. No idea why they separated that (even if someone wanted to redirect XSLT document calls but not regular document loads, they could simply have extended the existing API...).

The tricky part is getting the Transformer to actually use your EntityResolver - it doesn't provide any API for that. You need to create an XML reader, set the entity resolver on it, and use that to create a SAXSource with the input source you created using your resolver. The reader is then used by the XSLT transformer to load the XSLT document. Still there? 

<h3>Creating the Transformer</h3>

I ended up with this code:

<pre class="prettyprint">
    /* create the transformer */
    TransformerFactory factory = TransformerFactory.newInstance();
    final Resolver resolver = new Resolver();
    factory.setURIResolver(resolver);
    Transformer transf;
    try {
      XMLReader reader = XMLReaderFactory.createXMLReader();
      reader.setEntityResolver(resolver);
      InputSource is = resolver.resolveEntity("", "mystyle.xsl");
      SAXSource source = new SAXSource(reader, is);
      transf = factory.newTransformer(source);
    } catch (... lots of possible exceptions ...) { ... }
</pre>

Resolver simply loads Resources from the current ClassLoader using <code>ClassLoader.getResource(filename).openStream()</code> (beware of null returns). When creating an InputSource you'll have to set system ID and public ID to something meaningful on them or you'll get <code> MalformedURIExceptions</code> from the XML parser.

<h3>The actual transformation</h3>

The actual transformation is quite similar, however in this case we do not resolve the input source with our resolver, as it's a real file lying around on the disk, not in our jar. We still have to provide the resolver though because of the DTD files in the jar.

<pre class="prettyprint">
      try {
        XMLReader reader = XMLReaderFactory.createXMLReader();
        reader.setEntityResolver(resolver);
        InputSource is = new InputSource();
        is.setSystemId(inputfile);
        SAXSource source = new SAXSource(reader, is);
        StreamResult target = new StreamResult(targetfile);
        transf.transform(source, target);
      } catch (...) { ... }
</pre>

Let's remember: all we wanted to say is: 
<blockquote>Dear Java, here is an XSLT file. Now process this file. Now process that file. And let me do the resource loading.</blockquote>
I could also express that in one not all too ugly sentence. In Java, you need about 80 lines of code, including error handling, not including comments, and not including the actual resolver implementation. Add to that the code I wrote to "get all files below path X with an extension of Y" (= 40 LOC, and why the hell does Java's File do <code>new File(parent, childname)</code> instead of <code>parent.getChild(name)</code>?) and you end up with 220 lines of code. Actual domain code, e.g. what I really wanted to do, is about 100 lines of code, and those could be expressed with radically less code. With a proper API  and a proper programming language this ought to be less than 20 lines.

<h3>Mojo API</h3>

Mavens Mojo (= "Maven Plain Old Java Object") API is quite nice. The actual code needed to interact with Maven is not much - some annotations on member variables, the execute method, that's basically it. They read in javadoc @tags and generate a Mojo description from that, and then use reflection at run-time to execute the task. Again a nice use of reflection for declarative programming.

Update: Oleg Tkachenko <a href="http://www.tkachenko.com/blog/archives/000653.html">shows a .NET version of this</a>. Looks significantly easier, though I'm not sure it does the same thing (entities+XSLT doc() calls).
