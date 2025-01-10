---
title: 'Middleware not working because of instrumentation'
date: '2024-08-16'
tags: ['middleware']
image:
  src: './images/tahamie-farooqui-WFo6cCRHLx8-unsplash.jpg'
  alt: 'Instrumentation'
---

![Instrumentation: https://unsplash.com/photos/a-close-up-of-a-metal-object-on-a-table-WFo6cCRHLx8](./images/tahamie-farooqui-WFo6cCRHLx8-unsplash.jpg)

This one was completely my fault, but it was deeply burried. [Middleware](https://nextjs.org/docs/13/app/building-your-application/routing/middleware) was not working. Regardless of what I put inside the file, nothing happens. And I needed it because I needed the server to know what's the [current URL on the server side](logs/20240320-current-url-server-side) (which I couldn't implement back then) 😂

There were no errors at all! It just wasn't working.

I started carefully reading all the logs, and I saw a **warning** saying that it cannot acccess some browser related APIs. After a lot of tinkering and deleting anything that is browser related (so I can catch the issue), I ended up deleting [chalk](https://www.npmjs.com/package/chalk). Which is coloring the output of a log.

And since we were using it in many places, the logger util ended up in the [instrumentation](https://nextjs.org/docs/13/app/building-your-application/optimizing/instrumentation) file, so that I can pretty-print what branch we're running on during startup.

And because of that error, which was *silently* devoured from Next's internals, middleware couldn't boot properly.

p.s.
I ended up using [picocolors](https://www.npmjs.com/package/picocolors).
