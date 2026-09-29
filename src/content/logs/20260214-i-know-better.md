---
title: "Next does tons of magic, but you cannot control it. It controls you."
date: '2026-02-14'
tags: ['locked-in']
description: 'Next internals are not for you, you just play along'
image:
  src: './images/declan-sun-dM7s4hGF-ls-unsplash.jpg'
  alt: 'Versioning, patching, release notes.. a walk in the park'
---

![Declan Sun: https://unsplash.com/photos/antique-wooden-doors-with-ornate-metal-handles-dM7s4hGF-ls](./images/declan-sun-dM7s4hGF-ls-unsplash.jpg)

The more I use it, the more I feel like I need to constantly fight Next.js - there's tons of magic, but you cannot control it. It controls you.

This one will be long and it will sound like a rant. And it might actually be.

**The Context**: Static pages with _user session_ indicator (logged in or not). Cookies to keep track of user state. Login/logout - update indicator. As simple as that. No rocket science.

**The Problem**: Next's Client Router caches **too aggressively** and **you have no control!**

**The Frustration**: What really bothers me is... **why**? Why there are _half-baked tools_ which have tremendous power you have no control over? Why there's always a weird workaround that I need to search for? Why would you _drive_ people your way without listening to feedback? Why are _we_ accepting this at all? It.s a heartfelt, sad and exhausted... why?

<!-- cutoff -->

---

#### The Setup

I believe most people are using Next.js for this particular reason - we have bunch of "marketing" pages, which are completely static and almost never change. Then we have a dynamic section (let's call it the admin panel) where users must be authenticated to access.

The framework provides us with the best of both worlds - static, pre-rendered pages, and dynamic ones, where we easily connect to API routes and stuff. We can even dynamically invalidate static pages if we want to. The entire concept is amazing! But the implementation...

We are loading user's session using [React Query](https://tanstack.com/query/latest) whenever React kicks in. Then propagate it using a simple `Context`. We removed "warming-up" the context with LocalStorage, as it just adds another layer of crap on top. We want a simple "Welcome, Peter" or "Login" - that's all!

#### Issue #1: Prefetching

I wanted our pages fast. Since most of them have presentational purposes only, I leaned on prefetching.

Then I hit the first wall - as probably all projects nowadays, ours too is using UI components library. But prefetching works only on the native [Link](https://nextjs.org/docs/app/api-reference/components/link) component. I had a few options for global usage:

1. Use that native [Link](https://nextjs.org/docs/app/api-reference/components/link) component instead of the library's one, but style it the same way
2. Create a custom wrapper that has internal [manual prefetching](https://nextjs.org/docs/app/guides/prefetching#manual-prefetch) logic using `router.prefetch(url)`
3. Ditch prefetching

I didn't want custom handlers all over the place, so I want for #1. Just a few styles! 🎉

#### Issue #2: Cached redirects

Remember the "login" link if you're not authenticated? Since admin panel is dynamic, it automatically checks for a session and if not present - redirects you to `/login?back=/admin/profile`. This way we rarely have a "login" links, we often have "Admin Panel" (or something internal) links, which handle redirection.

But Next.js knows best. It prefetches those links and **caches the redirect**! So even if you _are_ logged in, it says "_well I know the answer to this request - let's send you to login_".

I know I can [turn it off](https://nextjs.org/docs/app/guides/prefetching) for _this particular_ page. But adding `prefetch={false}` just brings another level of mental load to bear. Which link _can_ be prefetched and which _cannot_? And if I was happy with the first tradeoff, I was like... Okay, **but why**? Why would Next cache a `307 Temporary Redirect` response?

There isn't much I can do, if I want to keep my login page statically rendered. `<LinkNoPrefetch />` it is...

#### Issue #3: Logout

I'll skip the LocalStorage issues for now - I'll add them as a bonus issue later on 😅 At this point we kept the user state in a simple cookie.

The user wants to logout. We have a Next.js endpoint, which has some business logic besides deleting that cookie. So the logout link is a simple `href="/api/logout"` thing, which then _redirects you_ to the home page.

Dead simple, right? Next has another optimization trick for you!

You click on the logout (which by the way **is not prefetched**, haha), and Client Router says "_well, buddy, my pleasure handling that for you_!" So it loads the endpoint, it actually deletes the cookie (which is great), sees the redirect and... does a client side redirect. Which, you know, **keeps the entire state tree** untouched as my pages are static.

How do I tell Next that this is something major I actually need it to act properly? Some property on the link, or... No, no, nope. No.

- You use [router.refresh](https://nextjs.org/docs/app/api-reference/functions/use-router#userouter) - "_Refresh the current route. Making a new request to the server, re-fetching data requests, and **re-rendering Server Components**. The client will merge the updated React Server Component payload **without losing unaffected client-side React** (e.g. **useState**) or browser state (e.g. scroll position)._" So no ❌
- You create a global `onNavigationStart` alternative using the `router` to listen for `pathname` updates. Sadly - you **do not** receive one, weirdly enough. ❌
- You add manual `onNavigation` (or simply `onClick`), where you await your http call and then do a hard refresh 🤦‍♂️
- You create a _server action_, which you call through a simple **form wrapper** (so it gets automatically POSTed) - yes, a form! 🤦‍♂️
- You use native anchor tag so it does a hard reload for you 🤦‍♂️

Basically you either create HoC to take care of this, or you use the native anchor tags. But the _burden remains_ - you always need to think of which component to use in which case.

---

#### The Frustration

The idea of using a _server action_ got me wild. I dug that and it sees its working. Meaning Next.js **has a way of knowing** weather it needs to _invalidate_ its front end cache. It seems to send special headers and the Client Router says _well, dang, I better not use the cache this time_.

**But there's no way forcing this yourself!**

What if there was `disableClientRouting={false}` on _that particular link_?! Or maybe `skipCache={true}`? How hard would it be to have an if-else somewhere inside? Obviously there is a way of handling it, but they simply don't care allowing you to use it.

It's better to push you towards server actions for something _extremely_ basic, just because...


#### The future

Things are getting harder with each release. There are more features, more goodies, more extras and they always, always come with more trouble. More mental burden to handle, more if-elses, more "_be careful with this_" comments all over the code.

Developers are dreaming of a balance between features and ease of use. The majority of people don't like Assembly, not because it's meaningless, but because it's hard.

We must admit the world isn't full of amazingly skillful, brilliant developers, all working for seven figures. The majority of us want a tools they can understand, to do the tasks at hand.

And Next is driving this rollercoaster full speed into the unknown. And I'm tired of it...

`use sanity`
