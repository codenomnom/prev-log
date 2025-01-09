---
title: 'Revalidation Encoding'
date: '2024-09-23'
tags: ['revalidate-encoding']
image:
  src: '../../assets/starlog-placeholder-1.jpg'
  alt: 'The full Astro logo.'
---

![Nebulous 2.0 Release](./images/bart-encode.jpg)

I'm using a website where the urls include non-latin characters. So I've been trying to revalidate certain pages or even tags, in order to use Incremental Static Regeneration (ISR). Turns out those must be encoded before revalidating.

It sounds a bit logical for the paths, but why the tags, as those are completely internal?!
