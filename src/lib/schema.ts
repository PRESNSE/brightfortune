import { canonical } from './seo';
import { getRelease, launchConfig } from './release';
import { site } from './content';

type Crumb = { label: string; path: string };

/** Returns JSON-LD graph objects, or [] unless the full public release gate has passed. */
export function buildSchema(opts: { path: string; crumbs?: Crumb[]; service?: { name: string; summary: string }; article?: { title: string; description: string; image: string } }): object[] {
  const { publicReady, origin } = getRelease();
  if (!publicReady || !origin) return [];
  const cfg = launchConfig();
  const org = {
    '@context': 'https://schema.org', '@type': 'InsuranceAgency', '@id': `${origin}/#organization`,
    name: site.company.name, alternateName: site.company.shortName, url: `${origin}/`, areaServed: 'Hong Kong',
    foundingDate: String(site.company.founded),
    ...(cfg.brand.officialLogoProvided || cfg.brand.draftWordmarkApprovedForLaunch ? { logo: `${origin}${cfg.brand.wordmark}` } : {}),
    ...(cfg.contact.phone ? { telephone: cfg.contact.phone } : {}),
    ...(cfg.contact.email ? { email: cfg.contact.email } : {}),
  };
  const out: object[] = [];
  if (opts.path === '/') {
    out.push(org, { '@context': 'https://schema.org', '@type': 'WebSite', '@id': `${origin}/#website`, url: `${origin}/`, name: site.company.shortName, inLanguage: 'en-HK', publisher: { '@id': `${origin}/#organization` } });
  }
  if (opts.crumbs?.length) {
    out.push({
      '@context': 'https://schema.org', '@type': 'BreadcrumbList',
      itemListElement: opts.crumbs.map((c, i) => ({ '@type': 'ListItem', position: i + 1, name: c.label, item: canonical(origin, c.path) })),
    });
  }
  const url = canonical(origin, opts.path);
  if (opts.service) out.push({ '@context': 'https://schema.org', '@type': 'Service', '@id': `${url}#service`, name: opts.service.name, serviceType: opts.service.name, description: opts.service.summary, url, areaServed: 'Hong Kong', provider: { '@id': `${origin}/#organization` } });
  if (opts.article) out.push({ '@context': 'https://schema.org', '@type': 'Article', headline: opts.article.title, description: opts.article.description, mainEntityOfPage: url, image: `${origin}${opts.article.image}`, publisher: { '@id': `${origin}/#organization` } });
  return out;
}
