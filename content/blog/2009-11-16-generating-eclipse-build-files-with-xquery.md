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

```
import module namespace fw = 'java:java.io.FileWriter';
import module namespace xn = 'java:com.xhive.dom.interfaces.XhiveNodeIf';

for $project in /project
let $name := substring-before( substring-after(document-uri($project/root()), '/build/'), '/')
where $name != 'swami'
return
(:let $name := if ($name = 'daogen') then 'DaoGenerator' else $name:)
let $dep-internal := tokenize($project/property[@name='${module.name}.depend.internal']/@value, ',')
let $dep-common := tokenize($project/property[@name='${module.name}.depend.internal']/@value, ',')[not(ends-with(., '.jar'))]
let $deps := ('libs', distinct-values(($dep-internal, $dep-common)))
let $fw := fw:new(concat('/Users/martin/tmp/build/', $name, '/.classpath'))
let $pw := fw:new(concat('/Users/martin/tmp/build/', $name, '/.project'))
let $classpath :=
<classpath>
{ comment { $name } }
	<classpathentry kind="src" path="src"/>
	<classpathentry kind="con" path="org.eclipse.jdt.launching.JRE_CONTAINER"/>
{ for $dep in $deps return
	<classpathentry combineaccessrules="false" kind="src" path="/SW {$dep}"/>
}
	<classpathentry kind="output" path="bin"/>
</classpath>
let $project :=
<projectDescription>
	<name>SW {$name}</name>
	<comment></comment>
	<projects>
	</projects>
	<buildSpec>
		<buildCommand>
			<name>org.eclipse.jdt.core.javabuilder</name>
			<arguments>
			</arguments>
		</buildCommand>
	</buildSpec>
	<natures>
		<nature>org.eclipse.jdt.core.javanature</nature>
	</natures>
</projectDescription>

return (
  fw:write($fw, xn:to-xml($classpath)),
  fw:write($pw, xn:to-xml($project)),
  fw:close($fw),
  fw:close($pw)
)
```

What does this do? It iterates through all project descriptions, takes the project name from the document URI, takes out the dependency information (those are the tokenize calls), and create a .project and .classpath XML snippet for each sub-project.

xDB does not include functions to write to the file system out of the box. We could create our own custom extension functions in Java and put them on the classpath, but there is a much easier way through the Java Module Import functionality.

We simply import <code>java.io.FileWriter</code>, create a FileWriter through the fw:new(...) calls for the right file location, serialize the XML snippets using xn:to-xml(...), and then make sure to close the file writers.

We still needed to do some fixups in Eclipse (mainly adding .jar files to the build path and fixing some wrong circular dependencies), but this certainly saved us hours. The world is a much nicer place when you have effective XML tools at your hands :-)
