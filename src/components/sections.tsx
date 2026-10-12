import Link from 'next/link';
import { serviceHref } from '@/lib/selectors';
import { services } from '@/lib/content';
import type { AssetId, Service } from '@/lib/types';
import type { CardData } from '@/lib/labels';
import { GuideCard } from './GuideCard';
import { Arrow, Crumbs, Photo, Pill, Punct, Title } from './ui';

export function HomeHero({ hero }: { hero: { titleParts: string[]; intro: string; cta: { label: string; href: string } } }) {
  const [a, b] = hero.titleParts;
  return (
    <section id="H01" className="hero dark" aria-labelledby="home-title">
      <div className="hero-media" aria-hidden="true">
        <Photo id="harbour" sizes="34vw" priority decorative />
        <Photo id="architecture" sizes="34vw" priority decorative />
        <Photo id="workplace" sizes="34vw" priority decorative />
      </div>
      <div className="hero-inner">
        <h1 id="home-title"><span>{a}</span>{' '}<span className="rule" aria-hidden="true" />{' '}<span><Punct text={b} /></span></h1>
        <p className="sub">{hero.intro}</p>
        <Pill href={hero.cta.href}>{hero.cta.label}</Pill>
      </div>
    </section>
  );
}

export function FactTiles({ facts }: { facts: { value: string; label: string }[] }) {
  return (
    <section id="H03" aria-label="Key facts">
      <ul className="facts" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
        {facts.map((f, i) => (
          <li key={f.label} className={`fact f${i + 1}`}><span className="v">{f.value}</span><span className="l">{f.label}</span></li>
        ))}
      </ul>
    </section>
  );
}

export function NumberedSolutions({ cards }: { cards: { title: string; body: string; href: string; secondaryHref?: string; assetId: string }[] }) {
  return (
    <section id="H07" className="pad" style={{ paddingTop: 0 }}>
      <div className="container">
        <ol className="numbered" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {cards.map((c, i) => (
            <li className="ncard" key={c.title}>
              <span className="num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <div className="ph"><Photo id={c.assetId as AssetId} sizes="(max-width:899px) 100vw, 33vw" decorative /></div>
              <h3><Link href={c.href} className="stretch">{c.title}</Link></h3>
              <p>{c.body}</p>
              {c.secondaryHref && <Link className="second" href={c.secondaryHref}>Medical &amp; dental insurance</Link>}
              <span className="go linkarrow" aria-hidden="true">Explore <Arrow /></span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function DiscoverGrid({ items }: { items: { title: string; body: string; href: string }[] }) {
  return (
    <section id="H09" className="pad">
      <div className="container grid2">
        {items.map((d) => (
          <Link key={d.title} href={d.href} className="disc"><h3>{d.title}</h3><p>{d.body}</p><span className="arrow" aria-hidden="true">→</span></Link>
        ))}
      </div>
    </section>
  );
}

export function GuideCards({ id, heading, items, cols = 'three', tone = '', intro }: { id?: string; heading?: string; items: CardData[]; cols?: 'three' | 'two' | 'feature'; tone?: string; intro?: string }) {
  return (
    <section id={id} className={`pad ${tone}`}>
      <div className="container">
        {heading && <div className="sec-head"><Title text={heading} />{intro && <p>{intro}</p>}</div>}
        <div className={`gcards ${cols}`}>{items.map((a) => <GuideCard key={a.id} a={a} />)}</div>
      </div>
    </section>
  );
}

export function ServiceCard({ s }: { s: Service }) {
  return (
    <Link href={serviceHref(s.slug)} className="scard">
      <div className="ph"><Photo id={s.assetId} sizes="(max-width:767px) 100vw, (max-width:1199px) 50vw, 33vw" decorative /></div>
      <div className="b"><h3>{s.title}</h3><p>{s.summary}</p><span className="more linkarrow">Explore {s.title.toLowerCase()} <Arrow /></span></div>
    </Link>
  );
}
export function ServiceGrid({ id, heading }: { id?: string; heading?: string }) {
  return (
    <section id={id} className="pad">
      <div className="container">
        {heading && <div className="sec-head"><Title text={heading} /></div>}
        <div className="sgrid">{services.map((s) => <ServiceCard key={s.slug} s={s} />)}</div>
      </div>
    </section>
  );
}

export function ServiceHero({ id, crumbs, title, intro, asset, cta, alt }: {
  id?: string; crumbs: { label: string; href?: string }[]; title: string; intro: string; asset: AssetId; cta: { label: string; href: string }; alt?: string;
}) {
  return (
    <section id={id} className="shero">
      <div className="container shero-grid">
        <div>
          <Crumbs items={crumbs} />
          <Title as="h1" text={title} />
          <p className="lede">{intro}</p>
          <Pill href={cta.href} className="solid">{cta.label}</Pill>
        </div>
        <div className="ph"><Photo id={asset} sizes="(max-width:899px) 100vw, 55vw" priority alt={alt} decorative={!alt} /></div>
      </div>
    </section>
  );
}

export function TextHero({ id, crumbs, title, intro, compact, badge }: { id?: string; crumbs?: { label: string; href?: string }[]; title: string; intro?: string; compact?: boolean; badge?: string }) {
  return (
    <section id={id} className={`thero ${compact ? 'compact' : ''}`}>
      <div className="container">
        {crumbs && <Crumbs items={crumbs} />}
        <div style={{ marginTop: crumbs ? 8 : 0 }}>
          {badge && <span className="badge">{badge}</span>}
        </div>
        <Title as="h1" text={title} />
        {intro && <p className="lede">{intro}</p>}
      </div>
    </section>
  );
}

export function ImageHero({ id, crumbs, title, intro, asset }: { id?: string; crumbs: { label: string; href?: string }[]; title: string; intro: string; asset: AssetId }) {
  return (
    <section id={id} className="ihero dark">
      <Photo id={asset} sizes="100vw" priority decorative />
      <div className="container">
        <Crumbs items={crumbs} />
        <Title as="h1" text={title} />
        <p className="lede">{intro}</p>
      </div>
    </section>
  );
}
