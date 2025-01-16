---
title: 'revalidate prop literal'
date: '2024-02-08'
tags: ['static-prop']
image:
  src: './images/dave-webb-eWGE33JU5Ko-unsplash.jpg'
  alt: 'Fancy, but carved in stone'
---

![Fancy, but carved in stone: https://unsplash.com/photos/brown-brick-concrete-wall-eWGE33JU5Ko](./images/dave-webb-eWGE33JU5Ko-unsplash.jpg)

You want to configure a single page of yours to use time-based [Incremental Static Regeneration](https://nextjs.org/docs/app/building-your-application/data-fetching/incremental-static-regeneration#time-based-revalidation)? Sure thing, just define how often you'd like your new page to be regenerated:

```ts
export const revalidate = 3600 // invalidate every hour
```

You want it every day, but you dislike how `86400` would look like as value? Three days (`259200`)? `604800` doesn't ring a bell? Okay, how about this:

```ts
export const revalidate = 60 * 60 * 24 * 7; // a week in seconds
```

Well, well, come on, don't be greedy! That _is_ too much! From the Route Segment Config's doc about the [revalidate](https://nextjs.org/docs/app/api-reference/file-conventions/route-segment-config#revalidate) prop:

> The revalidate value needs to be statically analyzable. For example `revalidate = 600` is valid, but `revalidate = 60 * 10` is not.

---

At this point I literally started wondering who's developing this framework and what their problem is! It took me a good few hours to get to the docs.

And it sounds like someone is scraping the code **as text** and then figuring out what he value is. I get it - there are multiple environments this can run in, and sometimes compiling the code would require more time and resources. But that's withing the `App Router`! How hard would it be to have `page.config.ts` along your `page.ts` file?! Why on earth would someone do such a thing?

Some pieces of this software are incredible and powerful. Others feel wrong on so many levels it's amazingly hard to describe. And it's just sad.
