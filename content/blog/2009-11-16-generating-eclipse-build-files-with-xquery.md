---
title: "Generating Eclipse build files with XQuery"
date: 2009-11-16T20:27:38+00:00
updated: 2009-11-16T20:27:38+00:00
url: /blog/2009/11/16/generating-eclipse-build-files-with-xquery/
draft: false
comments: 0
---

A friend of mine had a problem today. He was trying to make a huge Ant-based project usable from within Eclipse. The build file would manage dependencies through XML property files within about 30 subdirectories, each declaring which sub-projects need to be compiled before itself.

Writing all those .project and .classpath files is a very tedious task, and clicking them together in Eclipse is even more tedious. XQuery to the rescue!

I simply imported all the property files into xDB and ran this query:

<pre class="prettyprint">
import module namespace fw = &#x27;java:java.io.FileWriter&#x27;;
import module namespace xn = &#x27;java:com.xhive.dom.interfaces.XhiveNodeIf&#x27;;

for $project in /project
let $name := substring-before( substring-after(document-uri($project/root()), &#x27;/build/&#x27;), &#x27;/&#x27;)
where $name != &#x27;swami&#x27;
return
(:let $name := if ($name = &#x27;daogen&#x27;) then &#x27;DaoGenerator&#x27; else $name:)
let $dep-internal := tokenize($project/property[@name=&#x27;${module.name}.depend.internal&#x27;]/@value, &#x27;,&#x27;)
let $dep-common := tokenize($project/property[@name=&#x27;${module.name}.depend.internal&#x27;]/@value, &#x27;,&#x27;)[not(ends-with(., &#x27;.jar&#x27;))]
let $deps := (&#x27;libs&#x27;, distinct-values(($dep-internal, $dep-common)))
let $fw := fw:new(concat(&#x27;/Users/martin/tmp/build/&#x27;, $name, &#x27;/.classpath&#x27;))
let $pw := fw:new(concat(&#x27;/Users/martin/tmp/build/&#x27;, $name, &#x27;/.project&#x27;))
let $classpath :=
&lt;classpath&gt;
{ comment { $name } }
	&lt;classpathentry kind=&quot;src&quot; path=&quot;src&quot;/&gt;
	&lt;classpathentry kind=&quot;con&quot; path=&quot;org.eclipse.jdt.launching.JRE_CONTAINER&quot;/&gt;
{ for $dep in $deps return 
	&lt;classpathentry combineaccessrules=&quot;false&quot; kind=&quot;src&quot; path=&quot;/SW {$dep}&quot;/&gt;
}
	&lt;classpathentry kind=&quot;output&quot; path=&quot;bin&quot;/&gt;
&lt;/classpath&gt;
let $project := 
&lt;projectDescription&gt;
	&lt;name&gt;SW {$name}&lt;/name&gt;
	&lt;comment&gt;&lt;/comment&gt;
	&lt;projects&gt;
	&lt;/projects&gt;
	&lt;buildSpec&gt;
		&lt;buildCommand&gt;
			&lt;name&gt;org.eclipse.jdt.core.javabuilder&lt;/name&gt;
			&lt;arguments&gt;
			&lt;/arguments&gt;
		&lt;/buildCommand&gt;
	&lt;/buildSpec&gt;
	&lt;natures&gt;
		&lt;nature&gt;org.eclipse.jdt.core.javanature&lt;/nature&gt;
	&lt;/natures&gt;
&lt;/projectDescription&gt;

return (
  fw:write($fw, xn:to-xml($classpath)), 
  fw:write($pw, xn:to-xml($project)),
  fw:close($fw),
  fw:close($pw)
)
</pre>

What does this do? It iterates through all project descriptions, takes the project name from the document URI, takes out the dependency information (those are the tokenize calls), and create a .project and .classpath XML snippet for each sub-project.

xDB does not include functions to write to the file system out of the box. We could create our own custom extension functions in Java and put them on the classpath, but there is a much easier way through the Java Module Import functionality.

We simply import <code>java.io.FileWriter</code>, create a FileWriter through the fw:new(...) calls for the right file location, serialize the XML snippets using xn:to-xml(...), and then make sure to close the file writers.

We still needed to do some fixups in Eclipse (mainly adding .jar files to the build path and fixing some wrong circular dependencies), but this certainly saved us hours. The world is a much nicer place when you have effective XML tools at your hands :-)
