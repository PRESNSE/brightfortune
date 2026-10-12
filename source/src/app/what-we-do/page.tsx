import { ClaimsPromo, ContactCTA, Split } from '@/components/ui';
import { ServiceGrid, ImageHero } from '@/components/sections';
import { LdJson } from '@/components/LdJson';
import { site } from '@/lib/content';
import { routeMetadata } from '@/lib/seo';

export const metadata = routeMetadata('/what-we-do');

export default function Hub() {
  const h = site.hub;
  return (
    <>
      <LdJson path="/what-we-do" crumbs={[{ label: 'Home', path: '/' }, { label: 'What we do', path: '/what-we-do' }]} />
      <ImageHero id="W01" crumbs={[{ label: 'Home', href: '/' }, { label: 'What we do' }]} title={h.hero.title} intro={h.hero.intro} asset="architecture" />
      <Split id="W02" heading={h.intro.heading} paragraphs={h.intro.paragraphs} asset="workplace" side="left" />
      <ServiceGrid id="W03" heading="Our areas of work." />
      <Split id="W04" heading={h.connected.heading} paragraphs={h.connected.paragraphs} asset="harbour" side="right" />
      <ClaimsPromo id="W05" promo={site.shared.claimsPromo} />
      <ContactCTA id="W06" {...site.shared.cta} topic="other" />
    </>
  );
}
