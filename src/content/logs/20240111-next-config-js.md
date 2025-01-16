---
title: 'next.config is JS only'
date: '2024-01-11'
tags: ['config-js']
image:
  src: './images/annie-spratt-goholCAVTRs-unsplash.jpg'
  alt: 'Old school'
---

![Old school: https://unsplash.com/photos/brown-rotary-dial-telephone-in-gray-painted-room-goholCAVTRs](./images/annie-spratt-goholCAVTRs-unsplash.jpg)

Since the initialization, I've been using TypeScript for the entire project. And yet, as it turns out, the very basic `next.config` file can only be in JavaScript.

So what, you'll ask? Well I wanted to have some navigation items that are using rewrites, which are part of the config file. So I don't want to have duplication of code, especially when dealing with links. But mixing TS and JS _is_ still a pain in the ***.

Why would someone support TS all over the place, and not in its main config file? Surely it needs transpilation, but how hard could that be?
