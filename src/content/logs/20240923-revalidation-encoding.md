---
title: 'Revalidation Encoding'
date: '2024-09-23'
tags: ['revalidate-encoding']
image:
  src: './images/bart-encode.jpg'
  alt: 'The full Astro logo.'
---

![Bard Encoder](./images/bart-encode.jpg)

I'm developing a website where the URLs include non-latin characters. And I need to revalidate certain pages (or even tags), in order to use the Incremental Static Regeneration ([ISR](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration)) feature. Turns out those must be encoded before revalidating, or it throws tremendously ambiguous error.

It sounds a bit logical for the paths, but why the tags, as those are completely internal?!
