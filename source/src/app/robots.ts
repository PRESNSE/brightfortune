import type { MetadataRoute } from 'next';
import { getRelease } from '@/lib/release';
import { canonical } from '@/lib/seo';

// Crawling stays allowed so crawlers can see noindex on preview pages; robots.txt is not used to hide a draft.
export default function robots(): MetadataRoute.Robots {
  const { publicReady, origin } = getRelease();
  return { rules: [{ userAgent: '*', allow: '/', disallow: ['/api/'] }], ...(publicReady && origin ? { sitemap: canonical(origin, '/sitemap.xml') } : {}) };
}
