---
title: 'Get the current URL server side'
date: '2024-03-20'
tags: ['current-url']
image:
  src: './images/adam-sherez-PtgLGdMzi-Y-unsplash.jpg'
  alt: 'Tools'
---

![Tools: https://unsplash.com/photos/selective-focus-photo-of-black-and-brown-ball-peen-hammers-PtgLGdMzi-Y](./images/adam-sherez-PtgLGdMzi-Y-unsplash.jpg)

It caught me completely off guard! One would think the server *should* easily know what's the current URL it's serving, right? So you could do some stuff based on it.

Next doesn't agree. Most of the system does not know about the request context at all.

The solution? Bring up the heavy tools - [intercept and add custom header](https://github.com/vercel/next.js/issues/46618#issuecomment-1450416633)!

```ts
// middleware.ts
export function middleware(request: NextRequest) {
  return NextResponse.next({
     request: {
        // New request headers
        'x-pathname': request.nextUrl.pathname,
     },
  });
}

// app/some/where/page.tsx
import { headers } from 'next/headers';
export default async function Page() {
  const pathname = headers.get('x-pathname');
}
```

**Unfortunately** this comes at a huge price - every time you use `headers`, it breaks caching, because it's a [dynamic function](https://nextjs.org/docs/13/app/building-your-application/caching#dynamic-functions)! As of now, I haven't seen an easy way around it.


Honestly, this one made me a bit sad. It's okay for my use case, but it's just awful...
