import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Markdown } from '@/components/Markdown';
import { Crumbs, Photo, Pill, Punct, Title } from '@/components/ui';
import { GuideCards } from '@/components/sections';
import { LdJson } from '@/components/LdJson';
import { articles, categoryLabels, getArticle, getArticleBody, getRoute, readingMinutes, services, site, toCard } from '@/lib/content';
import { relatedArticles, topicFromHref } from '@/lib/selectors';
import { routeMetadata } from '@/lib/seo';

export const dynamicParams = false;
export const generateStaticParams = () => articles.map((a) => ({ slug: a.slug }));
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  return getArticle(slug) ? routeMetadata(`/insights/${slug}`) : {};
}

export default async function Guide({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const a = getArticle(slug);
  if (!a) notFound();
  const route = getRoute(`/insights/${slug}`);
  const { body, headings } = getArticleBody(a);
  const service = services.find((s) => a.relatedServiceHref.endsWith(s.slug));
  const more = relatedArticles(articles, a).map(toCard);
  return (
    <>
      <LdJson path={route.path} crumbs={[{ label: 'Home', path: '/' }, { label: 'Insights', path: '/insights' }, { label: a.title, path: route.path }]} article={{ title: a.title, description: route.description, image: `/images/${a.assetId}-1600.webp` }} />
      <section id="D01" className="ahero">
        <div className="container">
          <Crumbs items={[{ label: 'Home', href: '/' }, { label: 'Insights', href: '/insights' }, { label: a.title }]} />
          <span className="label" style={{ marginTop: 24 }}>{categoryLabels[a.category]}</span>
          <h1>{a.title}</h1>
          <p className="lede">{a.summary}</p>
          <p className="meta">{readingMinutes(a)} min read · Introductory guide</p>
        </div>
      </section>
      <div className="afig"><div className="ph"><Photo id={a.assetId} sizes="(max-width:1320px) 100vw, 1192px" priority /></div></div>
      <div className="abody">
        <aside className="toc" id="D02" aria-label="On this page">
          {headings.length > 0 && (<>
            <h2>On this page</h2>
            <ol>{headings.map((h) => (<li key={h.id} className={h.level === 3 ? 'l3' : ''}><a href={`#${h.id}`}>{h.text}</a></li>))}</ol>
            <details><summary>On this page</summary><ol style={{ paddingBottom: 12 }}>{headings.map((h) => (<li key={h.id} className={h.level === 3 ? 'l3' : ''}><a href={`#${h.id}`}>{h.text}</a></li>))}</ol></details>
          </>)}
        </aside>
        <article id="D03" className="prose">
          <Markdown body={body} headings={headings} />
          <p className="notice">{site.shared.guideNotice}</p>
        </article>
      </div>
      {service && (
        <section id="D04" className="slink navy dark">
          <div className="container slink-in">
            <div><span className="label">Related service</span><Title text={`Discuss ${service.title.toLowerCase()}.`} /></div>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              <Pill href={a.relatedServiceHref} className="solid">Explore {service.title}</Pill>
              <Pill href={`/contact?topic=${topicFromHref(a.relatedServiceHref)}`}>{service.ctaLabel}</Pill>
            </div>
          </div>
        </section>
      )}
      <GuideCards id="D05" heading="Keep reading." items={more} cols="two" />
    </>
  );
}
