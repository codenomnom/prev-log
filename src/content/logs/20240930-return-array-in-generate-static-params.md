---
title: 'Return an Array in generateStaticParams'
date: '2024-09-30'
tags: ['catch-all-segments']
image:
  src: '../../assets/starlog-placeholder-2.jpg'
  alt: 'The full Astro logo.'
---

When you're using the [Catch-all Segments](https://nextjs.org/docs/pages/building-your-application/routing/dynamic-routes#catch-all-segments) feature, you [must return an array of params](https://github.com/vercel/next.js/discussions/48878) in `generateStaticParams`, even though it should always contain a single entry.

And it kinda makes sense if you really think about it:

| Route    | Example | URL params |
| -------- | ------- | ---------- |
| `pages/shop/[...slug].js` | `/shop/a` | `{ slug: ['a'] }` |
| `pages/shop/[...slug].js` | `/shop/a/b/c` | `{ slug: ['a', 'b', 'c'] }` |

---

In this case, `slug` is an array, as it might contain multiple URL segments. But when using `generateStaticParams`, you are basically generating params for every **single** page.

And yet, instead of `items.map((item) => ({ slug: item.slug }))` you'd go for `items.map((item) => ({ slug: [item.slug] }))`, so it goes with the catch-all paradigm of "might be more than one". Another case where things mix up too much. I guess better documentation might help.