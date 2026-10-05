---
title: "Shell script to restore .svn directories in Mac OS X Bundles"
date: 2008-02-11T10:00:00+00:00
updated: 2013-12-14T16:15:59.157032+00:00
url: /blog/2008/02/11/shell-script-to-restore-svn-directories-in-mac-os-x-bundles/
draft: false
comments: 1
---

Checking in Mac OS X bundles, such as the files created by Pages.app or Keynote, into Subversion breaks, as Pages removes the metadata directories ('.svn') Subversion uses to keep track of file status.

Pretty annoying, and it doesn't seem to get fixed very soon. Following various links I found a <a href="http://sadilek.blogspot.com/2007/07/restore-svn-in-keynotepages-documents.html">script by  Daniel Sadilek</a> that recovers the missing .svn directories. While the script from the blog article itself doesn't work with directories that contain whitespace, the one posted in the comments by "Percy" does.

Basically you edit your checked-in bundle using Pages/Keynote/..., then run '<code>svnrecover &lt;bundlepath></code>', and afterwards you can check your stuff in.

I modified it a bit to better handle folder switches by using pushd/popd, so I'm reproducing it here:

<pre class="prettyprint">
#!/bin/bash
IFS="
"

# must be dir!
if [ ! -d "$1" ]; then
  echo "Path is not a directory."
  echo "Usage: $0 [bundle directory]"
  exit 1
fi

# get info
dir=`dirname "$1"`
base=`basename "$1"`

# go to dir
pushd "$dir">/dev/null

# prefix
prefix="tmp"
prefixi=1

# does it exist?
while [ -x "$prefix.$base" ]; do
  prefix="tmp$prefixi"
  prefixi=$(( prefixi + 1 ))
done

# move to temp
echo "* moving to temp location..."
mv "$base" "$prefix.$base"

# update
echo "* svn update..."
svn update -q "$base"

# check to make sure it's a dir!
if [ ! -d "$base" ]; then
  echo "Updated path is not a folder! Restoring original!"
  mv "$prefix.$base" "$base"
  exit 2
fi

# go to dir
echo -n "* moving .svn directories"
pushd "$base" >/dev/null

# find .svn dirs
for foo in `find . -type d -name .svn`; do
  if [ -d ../"$prefix.$base"/"`dirname "$foo"`" ]; then
    # only move it if the folder exists in the modified version
    mv "$foo" ../"$prefix.$base"/"`dirname "$foo"`"
    echo -n "."
  fi
done

popd >/dev/null
echo

# replace
echo "* replacing..."
rm -Rf "$base"
mv "$prefix.$base" "$base"
popd >/dev/null
echo "* done."
</pre>
