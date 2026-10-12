import { GuideCards, DiscoverGrid, FactTiles, HomeHero, NumberedSolutions } from '@/components/sections';
import { Marquee } from '@/components/Marquee';
import { Split } from '@/components/ui';
import { BrandFeature, Commitments, EditorialIntro, HomeLocation } from '@/components/HomeEditorial';
import { LdJson } from '@/components/LdJson';
import { articles, site, toCard } from '@/lib/content';
import { getRelease, isApproved } from '@/lib/release';
import { routeMetadata } from '@/lib/seo';

export const metadata = routeMetadata('/');

export default function Home() {
  const h = site.home;
  const { publicReady } = getRelease();
  // In public mode, unapproved facts are omitted (never silently presented as approved).
  const facts = h.facts.filter((f) => !publicReady || isApproved(f.approvalKey));
  const guides = h.resourceIds.map((id) => articles.find((a) => a.id === id)).filter((a) => !!a).map((a) => toCard(a!));
  return (
    <>
      <LdJson path="/" />
      <HomeHero hero={h.hero} />
      <Split id="H02" variant="capsule" heading={h.intro.heading} paragraphs={h.intro.paragraphs} asset="conversation" side="left" />
      {facts.length > 0 && <FactTiles facts={facts} />}
      <Split id="H04" heading={h.statement.heading} paragraphs={h.statement.paragraphs} asset="collaboration" side="right" />
      <HomeLocation />
      <EditorialIntro id="H06" heading={h.solutionsIntro.heading} paragraphs={h.solutionsIntro.paragraphs} cta={{ label: 'What we do', href: '/what-we-do' }} />
      <NumberedSolutions cards={h.numberedCards} />
      <BrandFeature />
      <Marquee items={h.marquee} />
      <DiscoverGrid items={h.discover} />
      <Commitments />
      <GuideCards id="H10" heading="Insights & resources." intro="A clearer view of the questions that matter." items={guides} cols="three" />
    </>
  );
}
