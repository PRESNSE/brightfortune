import Link from 'next/link';
import { GuideCards, TextHero } from '@/components/sections';
import { Arrow, Photo, Title } from '@/components/ui';
import { LdJson } from '@/components/LdJson';
import { articles, categoryLabels, readingMinutes, site, toCard } from '@/lib/content';
import { routeMetadata } from '@/lib/seo';

export const metadata = routeMetadata('/insights');

export default function Insights() {
  const i = site.insights;
  const featured = articles.find((a) => a.id === i.featuredId) ?? articles[0];
  const rest = articles.filter((a) => a.id !== featured.id).slice(0, 4).map(toCard);
  return (
    <>
      <LdJson path="/insights" crumbs={[{ label: 'Home', path: '/' }, { label: 'Insights', path: '/insights' }]} />
      <TextHero id="I01" crumbs={[{ label: 'Home', href: '/' }, { label: 'Insights' }]} title={i.title} intro={i.intro} />
      <section id="I02" className="pad" style={{ paddingBottom: 0 }}>
        <div className="container">
          <Link href={`/insights/${featured.slug}`} className="feat">
            <div className="ph"><Photo id={featured.assetId} sizes="(max-width:899px) 100vw, 50vw" decorative /></div>
            <div className="b">
              <span className="label" style={{ margin: 0 }}>Featured · {categoryLabels[featured.category]} · {readingMinutes(featured)} min read</span>
              <h2>{featured.title}</h2>
              <p>{featured.excerpt}</p>
              <span className="linkarrow">Read the guide <Arrow /></span>
            </div>
          </Link>
        </div>
      </section>
      <GuideCards id="I03" heading="More to explore." items={rest} cols="two" />
    </>
  );
}
