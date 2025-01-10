---
title: 'Cached GET Response'
date: '2024-01-16'
tags: ['cache']
image:
  src: '../../assets/starlog-placeholder-1.jpg'
  alt: 'The full Astro logo.'
---

![Cache: https://unsplash.com/photos/brown-cardboard-boxes-on-white-metal-rack-BNBA1h-NgdY](./images/chuttersnap-BNBA1h-NgdY-unsplash.jpg)

I've been using Next mostly on the front-end side until now, and I wasn't prepared for this 🤯 It wasn't long until I realized my `GET` endpoints were always returning the same data for some reason. And it turns out it's [documented](https://nextjs.org/docs/14/app/building-your-application/routing/route-handlers#caching) that `Route Handlers are cached by default when using the GET method with the Response object`. There are some [weird hacks](https://nextjs.org/docs/14/app/building-your-application/routing/route-handlers#opting-out-of-caching) like using `cookies` and `headers`, but that's just too much.

*note*: this has [changed](https://nextjs.org/blog/next-15#caching-semantics) since then
