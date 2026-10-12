import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ClaimsPromo, ConsiderationGrid, ContactCTA, Faq, ProcessSteps, Title } from '@/components/ui';
import { GuideCards, ServiceCard, ServiceHero } from '@/components/sections';
import { LdJson } from '@/components/LdJson';
import { articles, getRoute, getService, services, site, toCard } from '@/lib/content';
import { relatedServices } from '@/lib/selectors';
import { routeMetadata } from '@/lib/seo';

export const dynamicParams = false;
export const generateStaticParams = () => services.map((s) => ({ slug: s.slug }));
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (!getService(slug)) return {};
  return routeMetadata(`/what-we-do/${slug}`);
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = getService(slug);
  if (!s) notFound();
  const route = getRoute(`/what-we-do/${slug}`);
  const related = relatedServices(services, s);
  const guides = s.resourceIds.map((id) => articles.find((a) => a.id === id)).filter((a) => !!a).map((a) => toCard(a!));
  const sh = site.shared;
  return (
    <>
      <LdJson path={route.path} crumbs={[{ label: 'Home', path: '/' }, { label: 'What we do', path: '/what-we-do' }, { label: s.title, path: route.path }]} service={{ name: s.title, summary: s.summary }} />
      <ServiceHero id="S01" crumbs={[{ label: 'Home', href: '/' }, { label: 'What we do', href: '/what-we-do' }, { label: s.title }]} title={s.title} intro={s.summary} asset={s.assetId} cta={{ label: s.ctaLabel, href: `/contact?topic=${s.slug}` }} />
      <section id="S02" className="pad">
        <div className="container twocol">
          <Title text={s.introHeading} />
          <div className="body">{s.introBody.map((p) => <p key={p}>{p}</p>)}<p className="note">{s.availabilityNote}</p></div>
        </div>
      </section>
      <section id="S03" className="pad white">
        <div className="container">
          <div className="sec-head"><Title text="Who this is for." /></div>
          <ul className="cols3" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {s.audience.map((a, i) => (<li key={a}><span className="n" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span><h3 style={{ fontSize: 24 }}>{a}</h3></li>))}
          </ul>
        </div>
      </section>
      <ConsiderationGrid id="S04" heading={s.coverageHeading} items={s.coverages} />
      <section id="S05" className="pad navy dark">
        <div className="container why">
          <Title text={sh.whyHeading} />
          <ul>{sh.whyPoints.map((p) => <li key={p}>{p}</li>)}</ul>
        </div>
      </section>
      <ConsiderationGrid id="S06" heading={s.considerationsHeading} items={s.considerations} tone="white" />
      <ProcessSteps id="S07" heading={sh.processHeading} steps={sh.process} />
      <Faq id="S08" items={s.faqs} />
      {related.length > 0 && (
        <section id="S09" className="pad pale">
          <div className="container">
            <div className="sec-head"><Title text="Related areas of work." /></div>
            <div className="grid2">{related.map((r) => <ServiceCard key={r.slug} s={r} />)}</div>
          </div>
        </section>
      )}
      <ClaimsPromo id="S10" promo={sh.claimsPromo} />
      {guides.length > 0 && <GuideCards id="S11" heading="Guides to read next." items={guides} cols="two" />}
      <ContactCTA id="S12" {...sh.cta} label={s.ctaLabel} topic={s.slug} />
    </>
  );
}
