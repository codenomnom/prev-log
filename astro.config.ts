// @ts-check
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';
import rehypeExternalLinks from 'rehype-external-links';
import { SiteBase } from './src/consts';

// https://astro.build/config
export default defineConfig({
  site: 'https://prev-log.com',
  base: SiteBase,

  prefetch: {
    defaultStrategy: 'viewport',
  },

  markdown: {
    rehypePlugins: [[rehypeExternalLinks, { target: '_blank' }]],
  },

  integrations: [sitemap()],
});
