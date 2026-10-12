import { ResourceFilter } from '@/components/ResourceFilter';
import { TextHero } from '@/components/sections';
import { LdJson } from '@/components/LdJson';
import { articles, categoryLabels, site, toCard } from '@/lib/content';
import { routeMetadata } from '@/lib/seo';

export const metadata = routeMetadata('/resources');
export const dynamic = 'force-dynamic';

export default async function Resources({ searchParams }: { searchParams: Promise<{ category?: string | string[] }> }) {
  const sp = await searchParams;
  const raw = Array.isArray(sp.category) ? sp.category[0] : sp.category;
  const present = [...new Set(articles.map((a) => a.category))];
  const categories = Object.entries(categoryLabels).filter(([id]) => present.includes(id)).map(([id, label]) => ({ id, label }));
  const r = site.resources;
  return (
    <>
      <LdJson path="/resources" crumbs={[{ label: 'Home', path: '/' }, { label: 'Resources', path: '/resources' }]} />
      <TextHero id="R01" crumbs={[{ label: 'Home', href: '/' }, { label: 'Resources' }]} title={r.title} intro={r.intro} />
      <section id="R02" className="pad" style={{ paddingTop: 56 }}>
        <div className="container"><ResourceFilter categories={categories} items={articles.map(toCard)} initial={raw ?? 'all'} /></div>
      </section>
    </>
  );
}
