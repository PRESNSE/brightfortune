import type { MetadataRoute } from 'next';
import { routes } from '@/lib/content';
import { getRelease } from '@/lib/release';
import { canonical } from '@/lib/seo';

// Preview: empty urlset. Public: only approved, indexable routes. No lastmod (no recorded revision dates).
export default function sitemap(): MetadataRoute.Sitemap {
  const { publicReady, origin } = getRelease();
  if (!publicReady || !origin) return [];
  return routes.filter((r) => r.indexAfterApproval).map((r) => ({ url: canonical(origin, r.path) }));
}
