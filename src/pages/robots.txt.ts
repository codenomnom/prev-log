import type { APIRoute } from 'astro';
import { SiteBase } from '../consts';

const getRobotsTxt = (sitemapURL: URL) => `
User-agent: *
Allow: /

Sitemap: ${sitemapURL.href}
`;

export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL(SiteBase + '/sitemap-index.xml', site);
  return new Response(getRobotsTxt(sitemapURL));
};
