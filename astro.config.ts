// @ts-check
import { defineConfig } from 'astro/config';
import rehypeExternalLinks from 'rehype-external-links';
import { SiteBase } from './src/consts';

// https://astro.build/config
export default defineConfig({
  site: 'https://codenomnom.github.io',
  base: SiteBase,
  markdown: {
    rehypePlugins: [[rehypeExternalLinks, { target: '_blank' }]],
  },
});
