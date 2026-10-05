---
title: "C++ builds the easy way with scons"
date: 2004-12-06T19:50:49+00:00
updated: 2004-12-06T19:50:52+00:00
url: /blog/2004/12/06/c-builds-the-easy-way-with-scons/
draft: false
comments: 0
---

One of the minor but still annyoing pitfalls of development with C++ are Makefiles. The syntax is rather cryptic, if dependencies are getting bigger large Makefiles have to be maintained and more complex tasks require really dirty hacks.

There are a lot of make replacements out there. Today I took a look at <a href="http://www.scons.org">SCons</a> which looks really nice. It's written in Python and does not invent a new syntax but rather uses Python as the language to write build files in. Build files are declarative using calls to functions SCons provides to tell the system which targets have to be built. After executing the build script the targets are made using a set of implicit rules.

The major pros of SCons are the smart helper functions. You don't have to define dependencies between source files - SCons takes care of that by scanning the files itself (supporting quite a nice set of languages already). Implicit rules are available for compiling executables, libraries (shared and static) and some other files. The developers claim it should be easily extendible (maybe I'll try with antlr when I get some spare time). SCons doesn't just look at file modification times but uses md5 hashes by default, which avoides the whole mess applications create when touching files accidently. Also SCons keeps track of the state of intermediate files - a change in a source file that doesn't lead to a change in the object file won't lead to re-linking libraries or executables. Because SCons does not recurse into nested directories (it rather "includes" sub-build files) it should also be quite good with multiple build jobs and/or distributed compiling - recursive makefiles are a major obstacle for this as the make execution only sees a few source files at a time.

The biggest pro is probably also a con - using Python as the Makefile language. This enables users to easily manage complex build problems using a real programming language. On the other hand it enables people to create really cryptic build files as the syntax does not have any concept of order, grouping etc. It should be possible to overcome this by employing templates, coding standards etc. but it adds another thing to control and manage.

Another con is that a POSIX compliant make should be available nearly anywhere while SCons would be another dependency. However if you distribute binary packages anyway this shouldn't be that important.

The pros seem to overweigh the cons, at least for me. I think I'll use it in future smaller C/C++ projects, if it's evil despite the good impression I'll find out all too soon I guess ...
