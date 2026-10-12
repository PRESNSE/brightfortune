import { site } from '@/lib/content';
import { Photo, Pill, Title } from './ui';

/** The two-column title / copy composition measured on the reference homepage. */
export function EditorialIntro({ id, heading, paragraphs, cta }: {
  id?: string; heading: string; paragraphs: string[]; cta?: { label: string; href: string };
}) {
  return <section id={id} className="editorial-intro container">
    <div><Title text={heading} />{cta && <Pill href={cta.href}>{cta.label}</Pill>}</div>
    <div className="editorial-copy">{paragraphs.map(p => <p key={p}>{p}</p>)}</div>
  </section>;
}

export function HomeLocation() {
  const location = site.home.location;
  return <section id="H05" className="home-location">
    <EditorialIntro heading={location.heading} paragraphs={location.paragraphs} cta={location.cta} />
    <div className="location-map container">
      <div className="map-canvas">
        <img src="/images/world-map.svg" width="1200" height="540" alt="" loading="lazy" />
        <details className="map-location" open>
          <summary className="map-pin"><span className="pin-dot" aria-hidden="true" /><span>Hong Kong</span></summary>
          <div className="map-card">
            <h3>Hong Kong</h3>
            <p>{site.home.location.cardBody}</p>
            <Pill href="/contact">Speak with us</Pill>
          </div>
        </details>
      </div>
    </div>
  </section>;
}

export function BrandFeature() {
  const feature = site.home.feature;
  return <section id="H07b" className="brand-feature container" aria-labelledby="feature-title">
    <Title id="feature-title" text={feature.heading} />
    <p>{feature.body}</p>
    <div className="brand-feature-media"><Photo id="collaboration" sizes="100vw" decorative /></div>
  </section>;
}

export function Commitments() {
  const band = site.home.commitments;
  const icons = [
    <path key="listen" d="M18 40V24a14 14 0 0 1 28 0v16M18 27h-5v16h9V27Zm28 0h5v16h-9V27ZM46 43v7H34" />,
    <path key="detail" d="M16 10h24l10 10v34H16ZM40 10v12h10M24 31h18M24 39h18M24 47h10" />,
    <path key="connected" d="m24 24 16 16M40 24 24 40M24 18a6 6 0 1 1-12 0 6 6 0 0 1 12 0ZM52 18a6 6 0 1 1-12 0 6 6 0 0 1 12 0ZM24 46a6 6 0 1 1-12 0 6 6 0 0 1 12 0ZM52 46a6 6 0 1 1-12 0 6 6 0 0 1 12 0Z" />,
    <path key="support" d="M12 36h11l7 7h11a5 5 0 0 1 0 10H23L12 46M29 25l7 7 15-17M12 33v23H6V33Z" />,
  ];
  return <section id="H09b" className="commitments container">
    <Title text={band.heading} />
    <p className="commitments-intro">{band.body}</p>
    <ul className="commitment-grid">{band.items.map((item, i) => <li key={item.title}>
      <svg viewBox="0 0 64 64" width="64" height="64" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">{icons[i]}</svg>
      <h3>{item.title}</h3><p>{item.body}</p>
    </li>)}</ul>
  </section>;
}

