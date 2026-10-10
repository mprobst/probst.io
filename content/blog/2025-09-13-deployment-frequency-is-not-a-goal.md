---
title: "Deployment frequency is not a goal"
date: 2025-09-13T10:11:41+00:00
updated: 2025-09-13T10:11:41+00:00
url: /blog/2025/09/13/deployment-frequency-is-not-a-goal/
draft: false
comments: 0
---

Developer productivity efforts like to measure software delivery with the [DORA metrics](https://dora.dev/guides/dora-metrics/), among them deployment frequency and lead time for changes. These metrics are real and useful, but what's annoying is the common use of deployment frequency as a goal metric.

Deployment frequency has a hard cut-off, beyond which more frequent deployments aren't useful, or are even harmful. Monthly releases are a problem. Weekly - or even daily - deployments are fine, as long as they are automated or low toil. Releasing every push is harmful.

It's just not beneficial to anyone to deploy every five minutes. It doesn't meaningfully accelerate delivery (no customer ever wanted that button all of five minutes earlier!). And it's really harmful for production stability, as it becomes increasingly difficult to attribute breakages to particular releases.

I'd argue similarly for lead time to production. For a significant product, you want a careful and measured rollout across dev, QA, and then individual canary stages and production clusters. You cannot do meaningful canarying in five minutes, so a shorter lead time to production will be strictly worse (assuming you don't waste time on manual QA).
