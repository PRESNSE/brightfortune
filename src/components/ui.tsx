import Link from 'next/link';
import type { ReactNode } from 'react';
import { assets } from '@/lib/assets';
import type { AssetId } from '@/lib/types';

export const Arrow = () => (
  <svg className="arrow" aria-hidden="true" width="20" height="14" viewBox="0 0 20 14" fill="none"><path d="M0 7h18M12 1l6 6-6 6" stroke="currentColor" strokeWidth="1.8" /></svg>
);

/** Splits trailing sentence punctuation so it can be orange and aria-hidden. */
export function splitPunct(text: string): [string, string] {
  const m = /^(.*?)([.?!])$/.exec(text.trim());
  return m ? [m[1], m[2]] : [text, ''];
}
export function Punct({ text }: { text: string }) {
  const [body, p] = splitPunct(text);
  return (<>{body}{p && <span className="dot" aria-hidden="true">{p}</span>}</>);
}
type Tag = 'h1' | 'h2' | 'h3';
export function Title({ as: Tag = 'h2', text, className, id }: { as?: Tag; text: string; className?: string; id?: string }) {
  const [body, p] = splitPunct(text);
  return (
    <Tag className={className} id={id}>
      {body}{p && <><span className="dot" aria-hidden="true">{p}</span></>}
    </Tag>
  );
}

export function Photo({ id, sizes, priority, decorative, className, alt }: { id: AssetId; sizes: string; priority?: boolean; decorative?: boolean; className?: string; alt?: string }) {
  const a = assets[id];
  return (
    <img
      className={className}
      src={a.card}
      srcSet={`${a.mobile} 480w, ${a.card} 800w, ${a.hero} 1600w`}
      sizes={sizes}
      width={1600}
      height={1067}
      alt={decorative ? '' : alt ?? a.alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      {...(priority ? { fetchPriority: 'high' as const } : {})}
      style={{ objectPosition: a.focalPoint.replace(/^(\S+)\s+(\S+)$/, '$1 $2') }}
    />
  );
}

export function Pill({ href, children, className = '', arrow = true }: { href: string; children: ReactNode; className?: string; arrow?: boolean }) {
  return (<Link href={href} className={`pill ${className}`.trim()}><span>{children}</span>{arrow && <Arrow />}</Link>);
}

export function Crumbs({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="crumbs" aria-label="Breadcrumb">
      <ol>
        {items.map((it, i) => (
          <li key={it.label}>{it.href && i < items.length - 1 ? <Link href={it.href}>{it.label}</Link> : <span aria-current="page">{it.label}</span>}</li>
        ))}
      </ol>
    </nav>
  );
}

export function SectionIntro({ id, heading, paragraphs, tone = '' }: { id?: string; heading: string; paragraphs?: string[]; tone?: string }) {
  return (
    <section id={id} className={`pad ${tone}`}>
      <div className="container">
        <div className="sec-head" style={{ marginBottom: 0 }}>
          <Title text={heading} />
          {paragraphs?.map((p) => <p key={p}>{p}</p>)}
        </div>
      </div>
    </section>
  );
}

export function Split({ id, heading, paragraphs, asset, side = 'left', variant = 'full', cta, tone = '', textFirstOnMobile = false, mediaAlt, extra }: {
  id?: string; heading: string; paragraphs: string[]; asset: AssetId; side?: 'left' | 'right'; variant?: 'full' | 'capsule';
  cta?: { label: string; href: string }; tone?: string; textFirstOnMobile?: boolean; mediaAlt?: string; extra?: ReactNode;
}) {
  const media = variant === 'capsule'
    ? <div className="media"><div className="cap"><Photo id={asset} sizes="(max-width:899px) 280px, 360px" alt={mediaAlt} /></div></div>
    : <div className="media"><Photo id={asset} sizes="(max-width:899px) 100vw, 50vw" alt={mediaAlt} /></div>;
  return (
    <section id={id} className={`split ${variant} ${side === 'right' ? 'right' : ''} ${textFirstOnMobile ? 'text-first' : ''} ${tone}`}>
      {media}
      <div className="text"><div className="in">
        <Title text={heading} />
        <div style={{ marginTop: 24 }}>{paragraphs.map((p) => <p key={p}>{p}</p>)}</div>
        {extra}
        {cta && <Pill href={cta.href}>{cta.label}</Pill>}
      </div></div>
    </section>
  );
}

export function Faq({ id, items, heading = 'Frequently asked questions.' }: { id?: string; items: { question: string; answer: string }[]; heading?: string }) {
  return (
    <section id={id} className="pad">
      <div className="container">
        <div className="sec-head"><Title text={heading} /></div>
        <div className="faq">
          {items.map((f) => (
            <details key={f.question}>
              <summary>{f.question}</summary>
              <div className="ans"><p>{f.answer}</p></div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ProcessSteps({ id, heading, steps, tone = '' }: { id?: string; heading: string; steps: { title: string; body: string }[]; tone?: string }) {
  return (
    <section id={id} className={`pad ${tone}`}>
      <div className="container">
        <div className="sec-head"><Title text={heading} /></div>
        <ol className="steps">{steps.map((s) => (<li key={s.title}><h3>{s.title}</h3><p>{s.body}</p></li>))}</ol>
      </div>
    </section>
  );
}

export function ConsiderationGrid({ id, heading, items, tone = '' }: { id?: string; heading: string; items: { title: string; body: string }[]; tone?: string }) {
  return (
    <section id={id} className={`pad ${tone}`}>
      <div className="container">
        <div className="sec-head"><Title text={heading} /></div>
        <ul className="tiles">{items.map((i) => (<li className="tile" key={i.title}><h3>{i.title}</h3><p>{i.body}</p></li>))}</ul>
      </div>
    </section>
  );
}

export function ClaimsPromo({ id, promo }: { id?: string; promo: { heading: string; body: string; label: string; href: string } }) {
  return (
    <section id={id} className="pad pale">
      <div className="container promo">
        <div><Title text={promo.heading} /><p style={{ marginTop: 16 }}>{promo.body}</p></div>
        <Pill href={`${promo.href}`}>{promo.label}</Pill>
      </div>
    </section>
  );
}

export function ContactCTA({ id, heading, body, label, topic, tone = 'navy' }: { id?: string; heading: string; body: string; label: string; topic: string; tone?: string }) {
  return (
    <section id={id} className={`cta ${tone}`}>
      <div className="container cta-in">
        <div><Title text={heading} /><p>{body}</p></div>
        <Pill href={`/contact?topic=${topic}`} className="solid">{label}</Pill>
      </div>
    </section>
  );
}
