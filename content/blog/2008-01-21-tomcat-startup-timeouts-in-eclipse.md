---
title: "Tomcat startup timeouts in Eclipse"
date: 2008-01-21T18:44:15+00:00
updated: 2011-10-05T20:39:21.203000+00:00
url: /blog/2008/01/21/tomcat-startup-timeouts-in-eclipse/
draft: false
comments: 1
---

Today starting Tomcat from Eclipse using WTP suddenly stopped working for me. Tomcat would start up all fine and nice, but then after some time Eclipse would complain that Tomcat didn't come up properly and kill it again. The strange thing: everything was actually working, and I could access the webapp with a browser.

After some intense digging I found out that Eclipse tries to connect to Tomcat via HTTP to find out if it works. I then found out using netstat -Af inet that Eclipse was indeed connecting to localhost:8080, and Tomcat was accepting the connection, but then apparently nothing happened. Eclipse kept spamming Tomcat with new connections, and after some time it hit the timeout:

```
Active Internet connections
Socket   Proto Recv-Q Send-Q  Local Address      Foreign Address    (state)
       0 tcp4       0      0  127.0.0.1.8080     127.0.0.1.50349    ESTABLISHED
       0 tcp4       0      0  127.0.0.1.50349    127.0.0.1.8080     ESTABLISHED
       0 tcp4       0      0  127.0.0.1.8080     127.0.0.1.50348    ESTABLISHED
       0 tcp4       0      0  127.0.0.1.50348    127.0.0.1.8080     ESTABLISHED
       0 tcp4       0      0  127.0.0.1.8080     127.0.0.1.50347    ESTABLISHED
       0 tcp4       0      0  127.0.0.1.50347    127.0.0.1.8080     ESTABLISHED
       0 tcp4       0      0  127.0.0.1.8080     127.0.0.1.50346    ESTABLISHED
       0 tcp4       0      0  127.0.0.1.50346    127.0.0.1.8080     ESTABLISHED
       0 tcp4       0      0  127.0.0.1.8080     127.0.0.1.50345    ESTABLISHED
       0 tcp4       0      0  127.0.0.1.50345    127.0.0.1.8080     ESTABLISHED
       0 tcp4       0      0  127.0.0.1.8080     127.0.0.1.50344    ESTABLISHED
       0 tcp4       0      0  127.0.0.1.50344    127.0.0.1.8080     ESTABLISHED
       0 tcp4       0      0  127.0.0.1.8080     127.0.0.1.50343    ESTABLISHED
       0 tcp4       0      0  127.0.0.1.50343    127.0.0.1.8080     ESTABLISHED
       ... and so on ...
```

No idea why this was exactly happening, but I fixed it by deleting all server related configuration from my workspace. That is, delete all Tomcat related configuration, exit Eclipse, and then within your workspace:

```
rm -r .metadata/.plugins/*server*
```

Of course this is just cargo cult programming, but it fixed my problem.
