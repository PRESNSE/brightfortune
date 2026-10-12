import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Markdown } from '@/components/Markdown';
import { TextHero } from '@/components/sections';
import { LdJson } from '@/components/LdJson';
import { getLegalBody, routes } from '@/lib/content';
import { launchConfig } from '@/lib/release';
import { routeMetadata } from '@/lib/seo';

const legal = routes.filter((r) => r.template === 'legal');
export const dynamicParams = false;
export const generateStaticParams = () => legal.map((r) => ({ legal: r.path.slice(1) }));
export async function generateMetadata({ params }: { params: Promise<{ legal: string }> }): Promise<Metadata> {
  const { legal: id } = await params;
  const m = routeMetadata(`/${id}`);
  // Legal utility pages: noindex,follow regardless of release state.
  return legal.some((r) => r.contentId === id) ? { ...m, robots: { index: false, follow: true } } : {};
}

export default async function Legal({ params }: { params: Promise<{ legal: string }> }) {
  const { legal: id } = await params;
  const route = legal.find((r) => r.contentId === id);
  if (!route) notFound();
  const { body, headings } = getLegalBody(id);
  const title = route.title.split('|')[0].trim();
  return (
    <>
      <LdJson path={route.path} crumbs={[{ label: 'Home', path: '/' }, { label: title, path: route.path }]} />
      <TextHero id="L01" compact crumbs={[{ label: 'Home', href: '/' }, { label: title }]} title={title} badge={launchConfig().legalApproved ? undefined : 'Draft for review'} />
      <section id="L02" className="pad" style={{ paddingTop: 56 }}>
        <div className="container"><div className="prose"><Markdown body={body} headings={headings} /></div></div>
      </section>
    </>
  );
}
