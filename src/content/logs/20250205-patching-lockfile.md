---
title: 'Patching lockfile'
date: '2025-02-05'
tags: ['patching-lockfile']
description: 'Found lockfile missing swc dependencies, patching...'
image:
  src: './images/diana-polekhina-rKJoUsqmSs4-unsplash.jpg'
  alt: 'Missing SWC dependencies, patching...'
---

![Missing SWC dependencies, patching...: https://unsplash.com/photos/person-holding-band-aid-on-left-hand-rKJoUsqmSs4](./images/diana-polekhina-rKJoUsqmSs4-unsplash.jpg)

At some point builds started to fail, and I'm waking up to this:

```bash
Found lockfile missing swc dependencies, patching...

error This project's package.json defines "packageManager": "yarn@npm@10.8.1".
However the current global version of Yarn is 1.22.22.
```

Plus a bunch of errors following this one (which was on line 480), regarding yarn, build steps, etc. This particular project has `"packageManager": "npm@10.8.1"` inside its lockfile, so I was thinking about some versioning problem, or dependency requirement... There's nothing `yarn` related in our project, and I was lost!

---

So it took me a while to carefully read this one: `yarn@npm@10.8.1`. For some reason, Next, trying to patch my lockfile, ended up adding `yarn@` in front of my `npm@10.8.1` line. Which makes it think it needs yarn, version `npm@10.8.1`, which obviously is not a good yarn version...

There's a list of possible fixes about it: https://nextjs.org/docs/messages/failed-loading-swc
