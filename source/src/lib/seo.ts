import type { Metadata } from 'next';
import { getRelease } from './release';
import { getRoute, site } from './content';

export function canonical(origin: string, p: string): string {
  const base = new URL(origin);
  if (base.protocol !== 'https:') throw new Error('Public origin must use HTTPS');
  const clean = p.split(/[?#]/)[0].replace(/\/+$/, '') || '/';
  if (!clean.startsWith('/') || clean.startsWith('//')) throw new Error('Local absolute route required');
  return new URL(clean, base.origin).href;
}
export const jsonLd = (value: unknown) => JSON.stringify(value).replace(/</g, '\\u003c');

/** Metadata for a registry route. Titles come from routes.json verbatim (no suffix template). */
export function routeMetadata(routePath: string, overrides?: { title?: string; description?: string }): Metadata {
  const route = getRoute(routePath);
  const { publicReady, origin } = getRelease();
  const title = overrides?.title ?? route.title;
  const description = overrides?.description ?? route.description;
  const url = origin ? canonical(origin, route.path) : undefined;
  const image = '/images/og-default.png';
  return {
    title: { absolute: title },
    description,
    robots: { index: publicReady && route.indexAfterApproval, follow: publicReady },
    ...(url ? { alternates: { canonical: url } } : {}),
    openGraph: { title, description, siteName: site.company.shortName, locale: 'en_HK', type: route.template === 'article' ? 'article' : 'website', ...(url ? { url } : {}), ...(origin ? { images: [{ url: image, width: 1200, height: 630, alt: 'Bright Fortune' }] } : {}) },
    twitter: { card: 'summary_large_image', title, description, ...(origin ? { images: [image] } : {}) },
  };
}
