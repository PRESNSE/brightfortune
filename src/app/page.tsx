import { GuideCards, DiscoverGrid, FactTiles, HomeHero, NumberedSolutions } from '@/components/sections';
import { Marquee } from '@/components/Marquee';
import { SectionIntro, Split } from '@/components/ui';
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
      <Split id="H02" variant="capsule" heading={h.intro.heading} paragraphs={h.intro.paragraphs} asset="workplace" side="left" />
      {facts.length > 0 && <FactTiles facts={facts} />}
      <Split id="H04" heading={h.statement.heading} paragraphs={h.statement.paragraphs} asset="architecture" side="right" />
      <Split id="H05" heading={h.location.heading} paragraphs={h.location.paragraphs} asset="harbour" side="left" cta={h.location.cta} tone="loc" />
      <SectionIntro id="H06" heading={h.solutionsIntro.heading} paragraphs={h.solutionsIntro.paragraphs} />
      <NumberedSolutions cards={h.numberedCards} />
      <Marquee items={h.marquee} />
      <DiscoverGrid items={h.discover} />
      <GuideCards id="H10" heading="Guides to start with." items={guides} cols="three" />
    </>
  );
}
