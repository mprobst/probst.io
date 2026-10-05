---
title: "GNOME Online Desktop"
date: 2008-10-09T06:41:04+00:00
updated: 2008-10-09T06:41:04+00:00
url: /blog/2008/10/09/gnome-online-desktop/
draft: false
comments: 0
---

<a href="http://live.gnome.org/OnlineDesktop">GNOME Online Desktop</a>, via <a href="http://twitter.com/tec/statuses/952061690">Silvan</a>, with screenshots and a tour available at <a href="http://www.redhatmagazine.com/2007/11/13/tour-of-gnome-online-desktop/">RedHat Magazine</a>.

This basically looks like a nice idea, going forward to really integrate desktop functionality with web based apps. However it feels somewhat backwards, with the desktop developers implementing lots of connectors to various web applications. Shouldn't it be the other way around?

What I'd envision is a desktop that tightly integrates with the web browser and provides a set of hooks for web applications to integrate with, something like a one-click installation of a small plugin that augments the desktop with functionality related to the web app.

This could be small JavaScript pieces or maybe even only XML configuration that tell the desktop where to search for documents/calendar events/IM conversations/..., how to integrate with IM, pull notifications and so on. That would make the system much more open - any website developer could nicely integrate his application, without relying on the GNOME developers to add his webapp to the desktop. Of course there are security issues with that, but they should be fixable.

I generally think there is much value in extended JavaScript access to the desktop. It is certainly dangerous and needs to be <i>done right &#8482;</i>, but the possibilities are really cool - like access to calendars and address books. Mac OS nicely shows how this can work - they provide basic, central services like the address book and the calendar, and allow other applications to re-use the functionality, which is of huge value to users. This would also make it viable to write real applications for mobile devices (iPhone, Android) just through web pages and JavaScript. Users would need to be asked for permissions, just like they do it with HTML5's openDatabase offline storage, and a good user interface for that is crucial.

My guess is that even if the desktop fails to deliver such integration, the web applications will, sooner or later. Google already has all the right APIs in place, it's just lacking a proper model to share some information with some applications without exposing your whole online life to some foreign app (giving away your GMail username/password is not an option). So the question isn't whether this tight integration over services is happening, but rather whether the desktop will be part of it.
