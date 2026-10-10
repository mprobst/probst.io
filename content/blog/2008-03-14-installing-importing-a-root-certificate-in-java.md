---
title: "Installing/importing a root certificate in Java"
date: 2008-03-14T13:30:30+00:00
updated: 2008-03-14T13:30:30+00:00
url: /blog/2008/03/14/installing-importing-a-root-certificate-in-java/
draft: false
comments: 0
---

I just completed the nice exercise of installing a root certificate into a Java installation on a Debian server. Somebody I need to communicate with uses a certificate signed by a root CA (<a href="http://a-cert.at">a-cert.at</a>) that is apparently not included in the JVM 1.5.0_14 that ships with my Debian.

The <a href="http://java.sun.com/j2ee/1.4/docs/tutorial/doc/Security6.html">only documentation I could find</a> after lots of Googling is extremely verbose and obfuscated, so here comes the short hand version.

Basically you download their certificate, in this case <a href="http://www.a-cert.at/static/a-cert-globaltrust.crt">here</a>. Then you convert the certificate into the PEM format (whatever that is...), and install it into the system wide cacerts keystore. You'll be asked for the password to that store, it is <b>changeit</b> (and please don't change it!).

Oh and of course in between you perform extensive measures to make sure the certificate is valid, such as, well, ... you can compare the fingerprint to the one on the webpage where you downloaded it, tremendously secure ;-)

```
# convert:
openssl x509 -in a-cert-globaltrust.crt -out a-cert-globaltrust.pem -outform PEM
# install, type "changeit" for the password
keytool -import -file a-cert-globaltrust.pem -keystore /etc/java-1.5.0-sun/security/cacerts
```

You might also want to install it for openssl clients, as documented <a href="http://improbable.org/chris/index.php?ID=118">here</a>.
