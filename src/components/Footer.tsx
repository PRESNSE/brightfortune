import Link from 'next/link';
import { site } from '@/lib/content';
import { getRelease, launchConfig } from '@/lib/release';
import { Pill, Title } from './ui';
import { Wordmark } from './Wordmark';

export function Footer() {
  const cfg = launchConfig();
  const { publicReady } = getRelease();
  const f = site.shared.footer;
  return (
    <footer id="footer-root" className="footer dark">
      <div className="footer-contact-band">
        <div className="container f-cta">
          <div><Title text={f.heading} /><p>{f.body}</p></div>
          <div className="f-actions"><Pill href="/contact" className="solid-light">Let’s talk</Pill><Pill href="/what-we-do">Explore our services</Pill></div>
        </div>
      </div>
      <div className="container footer-main">
        <div className="f-cols">
          <div className="f-identity">
            <Link href="/" className="wordmark" aria-label="Bright Fortune — home"><Wordmark /></Link>
            <span className="f-location-label">Our location</span>
            <Link className="f-location" href="/contact">Hong Kong <span aria-hidden="true">↗</span></Link>
          </div>
          <nav className="f-menu" aria-label="Footer company navigation">
            <Link href="/who-we-are">Who we are</Link><Link href="/what-we-do">What we do</Link>
            <Link href="/insights">Insights</Link><Link href="/resources">Resources</Link>
            <Link href="/claims">Claims</Link><Link href="/contact">Contact</Link>
          </nav>
          <nav className="f-legal" aria-label="Legal navigation">{f.legalLinks.map(l => <Link key={l.href} href={l.href}>{l.label}</Link>)}</nav>
        </div>
        <div className="f-address">
          <p>{site.company.name}</p>
          {cfg.contactApproved ? <p>
            {cfg.contact.address}<br />
            {cfg.contact.phone && <a href={`tel:${cfg.contact.phone.replace(/[^+\d]/g, '')}`}>{cfg.contact.phone}</a>}
          </p> : <p>Hong Kong. Contact details will be confirmed before launch.</p>}
        </div>
        <div className="f-bot">
          <span>© {new Date().getFullYear()} {site.company.name}</span>
          {cfg.regulatoryApproved && cfg.regulatoryStatement && <p className="f-note">{cfg.regulatoryStatement}</p>}
          {!publicReady && <p className="f-note">Draft preview for stakeholder review. Content, contact details and regulatory statements are pending company approval.</p>}
        </div>
      </div>
    </footer>
  );
}
