import Link from 'next/link';
import { articles, services, site } from '@/lib/content';
import { getRelease, launchConfig } from '@/lib/release';
import { Pill, Title } from './ui';
import { Wordmark } from './Wordmark';

export function Footer() {
  const cfg = launchConfig();
  const { publicReady } = getRelease();
  const contactOk = cfg.contactApproved;
  const f = site.shared.footer;
  return (
    <footer id="footer-root" className="footer dark">
      <div className="container">
        <div className="f-cta">
          <div><Title text={f.heading} /><p>{f.body}</p></div>
          <Pill href="/contact" className="solid">Speak with us</Pill>
        </div>
        <div className="f-cols">
          <div>
            <div className="wordmark"><Wordmark /></div>
            <p>{site.company.name}</p>
            {contactOk ? (
              <p style={{ marginTop: 12 }}>
                {cfg.contact.phone && <><a href={`tel:${cfg.contact.phone.replace(/[^+\d]/g, '')}`}>{cfg.contact.phone}</a><br /></>}
                {cfg.contact.address}
              </p>
            ) : (
              <p style={{ marginTop: 12 }}>Hong Kong. Contact details will be confirmed before launch.</p>
            )}
          </div>
          <div>
            <h3>What we do</h3>
            <ul>{services.map((s) => (<li key={s.slug}><Link href={`/what-we-do/${s.slug}`}>{s.title}</Link></li>))}</ul>
          </div>
          <div>
            <h3>Company</h3>
            <ul>
              <li><Link href="/who-we-are">Who we are</Link></li>
              <li><Link href="/what-we-do">All services</Link></li>
              <li><Link href="/claims">Claims</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h3>Insights &amp; Resources</h3>
            <ul>
              <li><Link href="/insights">Insights</Link></li>
              <li><Link href="/resources">All resources</Link></li>
              {articles.slice(0, 3).map((a) => (<li key={a.id}><Link href={`/insights/${a.slug}`}>{a.title}</Link></li>))}
            </ul>
          </div>
        </div>
        <div className="f-bot">
          <span>© {new Date().getFullYear()} {site.company.name}</span>
          <ul>{f.legalLinks.map((l) => (<li key={l.href}><Link href={l.href}>{l.label}</Link></li>))}</ul>
          {cfg.regulatoryApproved && cfg.regulatoryStatement && <p className="f-note">{cfg.regulatoryStatement}</p>}
          {!publicReady && <p className="f-note">Draft preview for stakeholder review. Content, contact details and regulatory statements are pending company approval.</p>}
        </div>
      </div>
    </footer>
  );
}
