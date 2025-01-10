---
title: 'Return an Array in generateStaticParams'
date: '2024-09-30'
tags: ['catch-all-segments']
image:
  src: './images/yoko-correia-nishimiya-34_cEpcBjpE-unsplash.jpg'
  alt: 'Collection'
---

![Collection: https://unsplash.com/photos/selective-focus-photo-of-black-and-brown-ball-peen-hammers-PtgLGdMzi-Y](./images/yoko-correia-nishimiya-34_cEpcBjpE-unsplash.jpg)

When you're using the [Catch-all Segments](https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes#catch-all-segments) feature, you [must return an array of params](https://github.com/vercel/next.js/discussions/48878) in `generateStaticParams`, even though it should always contain a single entry.

And it kinda makes sense if you really think about it:

**Route**: `pages/shop/[...slug].js`

**URL**: `/shop/a`\
**Params**: `{ slug: ['a'] }`

**URL**: `/shop/a/b/c`\
**Params**: `{ slug: ['a', 'b', 'c'] }`

---

In this case, `slug` is an array, as it might contain multiple URL segments. But when using `generateStaticParams`, you are basically generating params for every **single** page.

And yet, instead of `items.map((item) => ({ slug: item.slug }))` you'd go for `items.map((item) => ({ slug: [item.slug] }))`, so it goes with the catch-all paradigm of "might be more than one". Another case where things mix up too much. I guess better documentation might help.
