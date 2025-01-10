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

This one made me a bit sad honestly, as it shouldn't be **that** hard.
