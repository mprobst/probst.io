---
title: "Go on App Engine and GoSublime (golang, code completion)"
date: 2014-05-26T19:54:46.090525+00:00
updated: 2014-06-17T18:45:17.592646+00:00
url: /blog/2014/05/26/go-on-app-engine-and-gosublime/
draft: false
comments: 0
---

I'm re-writing this blog using Go on App Engine, just for the fun. It took me quite a while to wrap my head around the available tool options, and get them set up correctly.

It turns out [Sublime Text](https://www.sublimetext.com) (my favorite text editor as of late) has a really nice plugin called [GoSublime](https://github.com/DisposaBoy/GoSublime) that provides various Go tools, including auto-completion through [go code](https://github.com/nsf/gocode).

Sadly it also turns out that GoSublime is a bit fickle to get to work with [App Engine's Go libraries](https://developers.google.com/appengine/docs/go/), possibly because of a [bug](https://github.com/DisposaBoy/GoSublime/issues/535). I think at this time, it's not possible to have multiple Go workspaces with GoSublime that use different `GOROOT` paths (e.g. plain go + App Engine go).

But at least it's possible to get consistent code completion and other GoSublime features working, with these global configuration settings in `Preferences > Package Settings > GoSublime > Settings - User`:

```js
{
  "installsuffix": "appengine",
  "env": {
    // Your GOPATH for App Engine projects, e.g.
    "GOPATH": "/Users/martin/goae",
    // Your GOROOT, e.g.
    "GOROOT": "/usr/local/Cellar/go-app-engine-64/1.9.5/share/go-app-engine-64/goroot"
  },
  // ... any other settings you have ...
}
```

The source code running this puny blog is available at http://github.com/mprobst/blog by the way. It has zero features and is the first thing I ever wrote in Go, so probably not a good idea to take as an example for much.
