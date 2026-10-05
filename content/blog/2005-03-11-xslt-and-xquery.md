---
title: "XSLT and XQuery application domains"
date: 2005-03-11T16:15:34+00:00
updated: 2005-03-11T16:43:21+00:00
url: /blog/2005/03/11/xslt-and-xquery/
draft: false
comments: 0
---

Once again someone published an <a href="http://www.xml.com/pub/a/2005/03/09/xquery-v-xslt.html">article comparing XQuery and XSLT</a>. As others have mentioned (<a href="http://www.xsltblog.com/archives/2005/03/dear_j_david_ei.html">here</a> or <a href="http://weblogs.goshaky.com/weblogs/page/lars/20050310#xquery_is_xml_query_language">here</a>), this article isn't really that helpful. In fact, it's actually misleading in several places. The author compares XSL 1.0 with XQuery 1.0 where XSL 2.0 would really be the one to pick. Also the author describes how to extend XSL or XQuery processors giving code samples which are tailored for two specific implementations. I'm not really sure how that is supposed to be helpful as the mechanism for extension is bound to be vendor specific and can be very different from implementation to implementation.

My main criticism of the article is that it once again mixes up application domains of the two languages. You cannot do a direct comparison of XQuery and XSL, they have been created for two very different purposes. The only thing similar is that they both work on XML. Think about it, the W3C wouldn't invent two languages for exactly the same purpose, would it?

XSL is the eXtensible Stylesheet Language. An XSLT is a Stylesheet Transformation, e.g. it's supposed to take an input document and apply some kind of a style to it by converting it's contents to something different. 

XQuery is the XML Query Language. It's supposed to be used for querying XML data sources. This means: take several input sources, fetch information from them (e.g. by matching certain criteria against the sources), and return that data. The XML element constructors allowed in that language are not thought to be used to re-style document contents, but rather to give the user a means to structurize his returned content. Do not use XQuery to re-style documents, you will probably end up with lengthy, complicated queries requiring "manual recursion" (as opposed to XSLT's automatic recursion with "apply-templates"), endless typeswitchs and an ugly mix between presentational and application logic. Look at the <a href="http://www.w3.org/TR/xquery-use-cases/">XQuery use cases</a>. None of the queries tries to convert documents.

A typical application might use XQuery to fetch XML from an XML database or other sources (like the filesystem or web sources - whatever). The XML would just be taken from it's source, maybe structured by some tags and then passed on to a presentational part of the application where it might be styled using XSLT.

The XSLT standard arguably expects a document (and usually exactly one document) to be fully available in memory (it doesn't really require that, but all scripts and implementations I've seen actually work like that). XQuery doesn't need that, it has been designed with large data stores in mind from which you might only want to extract minimal parts. XQuery has been designed to be able to query large data stores as opposed to XSLT which has been designed to format/re-style XML documents of a size that actually fits into main memory.

In a <a href="http://www.corba.ch/e/3tier.html">3-tier model</a> (introduced by SAP back in the 80's?) you would typically find XQuery statements in the data-server-tier (as stored queries) or in the application-server-tier. XSLT scripts would be found either in the application-server-tier or, since most browsers support XSLT nowadays, in the client-tier.

MarkLogic's use of XQuery as a CGI language is quite an interesting example of using XQuery in the application-tier though in the <a href="http://weblog.infoworld.com/udell/2005/02/15.html">screencast presentation</a> we can once again see people trying to transform XML documents to XHTML using XQuery. A better example might have been aggregating information from the book database (e.g. all authors and how many books they've written) and transforming that information into something displayable by the client using XSLT. Apart from that it's quite nice btw.
