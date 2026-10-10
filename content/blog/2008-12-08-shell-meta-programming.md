---
title: "Shell meta programming"
date: 2008-12-08T11:08:31+00:00
updated: 2008-12-08T11:13:04+00:00
url: /blog/2008/12/08/shell-meta-programming/
draft: false
comments: 2
---

I'm currently reworking X-Hive/DBs command line startup scripts for various utilities, and I'm facing an interesting challenge with shell programming.

The issue is that I want to have a ".xhiverc" file that contains various settings in a Java property file style. Normally, I would simply read those settings from within Java, and everything would be nice and fine. But this file is supposed to contain, amongst others, the memory settings for the virtual machine - and once the JVM is running, it's of course too late to read those.

So I need to somehow read the file from the shell. That should be easy, right? ". ~/.xhiverc" and everything is fine - or maybe not. What if the user wants to override those settings from the environment? E.g., we have XHIVE_MAX_MEMORY defined in the .xhiverc, but the user has exported XHIVE_MAX_MEMORY="2G". This is where the meta programming comes in: we have operate on variables of which we don't know the name statically.

Current solution: iterate through all legal variable names, save their state in ${VARNAME}_BACKUP, source the .xhiverc, and then re-set them to the previous value if they were non-empty. As the scripts need to be POSIX compliant (i.e., no bashisms), we don't have ${!VARNAME}, so this already involves some interesting eval scripts (`eval export ${var}_BACKUP=\"\$${var}\"` - the backslashes are not a Wordpressian/PHP escaping problem).

Now the next interesting thing: how to test if a variable is set? Testing if it's empty is [ -n "${VARNAME}" ], but what if someone wants to override a default setting to be undefined? If you know the name, it's "${XHIVE_MAX_MEMORY+x}" = "x". If you don't, it's again some horrible eval combination - maybe I'm missing it, but there doesn't seem to be a standard "defined" command/test.

I have the feeling I'm doing something wrong - this should be easier (tm). Maybe I should just forget about the whole thing, and have a XHIVE_DEFAULT_MAX_MEMORY and a second XHIVE_MAX_MEMORY, same for the other variables...

What surprised me along this, this of course also has to work in Windows batch. And everyone knows that Windows batch is probably one of the most horrible programming environments ever "invented". But this particular problem is actually not too difficult. Once someone on StackOverflow.com enlightened me over the <a href="http://stackoverflow.com/questions/232747/read-environment-variables-from-file-in-windows-batch-cmdexe">byzantine details of the Windows batch FOR loop</a>, it's a relatively simple loop containing an IF DEFINED %%i:

```
  FOR /F "eol=# tokens=1,2* delims==" %%i in ('type "!XHIVERC!') do (
    REM only set variables if not already defined as environment variables (they take precedence)
    IF NOT DEFINED %%i (
      SET %%i=%%~j
    )
  )
```
