---
title: 'RadixUI & shadcn/ui not working'
date: '2024-10-24'
tags: ['react19-rc']
description: 'Next dependency on React RC breaks the internet'
image:
  src: './images/tyler-milligan-dSIcpkddKrM-unsplash.jpg'
  alt: 'Dependency'
---

On 21st of October, [Next.js 15](https://nextjs.org/blog/next-15) was officially released, yay! 🎉

![Dependency: https://unsplash.com/photos/shallow-focus-photography-of-rock-formation-dSIcpkddKrM](./images/tyler-milligan-dSIcpkddKrM-unsplash.jpg)

Among the release notes there's this [note](https://nextjs.org/blog/next-15#react-19):

> In version 15, the App Router uses **React 19 RC**

Depending on a release candidate? 🤔 How bad can it be?

> Although React 19 is still in the RC phase, our extensive testing across real-world applications and our close work with the React team have given us confidence in its stability.

And that's probably true. What wasn't accounted for are the numerous dependencies on `react: ^18.x` all over the internet. Including [radix-ui/icons](https://github.com/radix-ui/icons/pull/184), which makes [shadcn/ui](https://github.com/shadcn-ui/ui/issues/5555) unable to install properly. And sadly, we were using those 😔

It took a good full week to fix the issue. But more libraries were affected: [NextUI](https://github.com/nextui-org/nextui/issues/3979), [zustand](https://github.com/pmndrs/zustand/discussions/2843), [heroicons](https://github.com/tailwindlabs/heroicons/issues/1240), [Material UI](https://github.com/mui/material-ui/issues/44203) and I'm guessing many more.

All of that isn't directly Vercel's fault. But it kind of is, isn't it?
