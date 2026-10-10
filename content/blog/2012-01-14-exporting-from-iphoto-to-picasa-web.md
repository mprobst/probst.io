---
title: "Exporting from iPhoto to Picasa Web"
date: 2012-01-14T11:16:41.905000+00:00
updated: 2012-01-15T01:39:24.120000+00:00
url: /blog/2012/01/14/exporting-from-iphoto-to-picasa-web/
draft: false
comments: 1
---

I have a significant collection of photos on my home machine, all stored in iPhoto. I back them up to an external hard drive, using time machine, and copy them to a second machine using rsync every now and then. However all of that is within my apartment. That's not only somewhat dangerous (think fire, burglary, ... - at least if you're paranoid enough), it also means I cannot access the photos from anywhere.

So my current weekend project is to upload them to Picasa Web. I actually like iPhoto, and I don't really want to switch to Picasa to manage my photos, so I have to get the pictures out of iPhoto into Picasa Web.

Google has two tools for that, a standalone uploader, and an export plugin for iPhoto (that curiously lives in a completely different place of the UI than iPhoto's other export plugins ...). Both are available in a single download <a href="http://picasa.google.com/mac_tools.html">here</a>. Neither of them does what I want though - the standalone uploader doesn't understand iPhoto or its albums at all, and the iPhoto plugin is a manual process. You select individual albums and upload them. That's probably useful if you want to export a single album, but not for a complete export. I need a background task that automatically does the uploading, preferably a restartable one.

Background process, automated? Command line to the rescue! :-)

It turns out there's a very straightforward iPhoto export tool that also supports incremental exports, <a href="https://github.com/BMorearty/exportiphoto">exportiphoto on Github</a>. Downloading that and running <code>exportiphoto -d "$HOME/Pictures/iPhoto Library" $HOME/tmp/iphotoexport</code> worked like a charm (-d to suppress dates prepended to the event name). Some ~5 of my pictures were referenced in the album metadata but inexplicably missing on the hard disk, I simply deleted them.

This leaves you with a directory structure of "$event/$picture" in tmp/iphotoexport for each of your events (unrelated: why is this not a built-in feature of iPhoto?). Now for the uploading part - uploading to Picasa is surprisingly easy using the <a href="http://code.google.com/p/googlecl/">Google command line</a>. It requires the <a href="http://code.google.com/apis/gdata/docs/client-libraries.html">Google client libraries</a>, but both are available in Python's easy_install repository, so simply running <code>sudo easy_install googlecl</code> gives you all you need. Creating an album from a set of pictures is as simple as <code>google picasa create "My Album" my_album/* --date=2012-01-03</code>. We can get the date for the album from the minimum last modified time of all exported files in the album using some ruby trickery, the dates of the pictures themselves are taken from the photo metadata. The command line uses OAuth 2 to log you in, which is a bit spooky - it pops up a browser in which you give the permissions, and then proceeds on the command line. Nice to see OAuth working so well, I really have to find some time and understand that.

So TL;DR:

```
curl https://raw.github.com/BMorearty/exportiphoto/master/exportiphoto.py > exportiphoto.py
sudo easy_install googlecl

python exportiphoto.py "Pictures/iPhoto Library" "tmp/iphotoexport"
cd tmp/iphotoexport

for album in *; do
  echo Uploading $album...
  min_last_modified=`ruby -e 'require "time"; puts Dir[ARGV[0] + "/*"].map { |x| File.mtime(x) }.min.strftime("%F")' "$album"`
  google picasa create "$album" $album/* --date=$min_last_modified
done
```

As for the incremental, resumable part, I still have no idea. I'll poke around with the Google command line and see if I can get last modified timestamps or something similar out of it.
