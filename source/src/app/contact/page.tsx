import Link from 'next/link';
import { ContactForm } from '@/components/ContactForm';
import { TextHero } from '@/components/sections';
import { Photo, Split, Title } from '@/components/ui';
import { LdJson } from '@/components/LdJson';
import { site } from '@/lib/content';
import { getFormMode, getRelease, launchConfig } from '@/lib/release';
import { normaliseTopic } from '@/lib/selectors';
import { routeMetadata } from '@/lib/seo';

export const metadata = routeMetadata('/contact');
export const dynamic = 'force-dynamic';

function ContactDetails() {
  const cfg = launchConfig();
  if (!cfg.contactApproved) return <p className="note previewnote">Contact details will be confirmed before launch.</p>;
  return (
    <dl className="contactbox">
      {cfg.contact.phone && (<><dt>Telephone</dt><dd><a href={`tel:${cfg.contact.phone.replace(/[^+\d]/g, '')}`}>{cfg.contact.phone}</a></dd></>)}
      {cfg.contact.email && (<><dt>Email</dt><dd><a href={`mailto:${cfg.contact.email}`}>{cfg.contact.email}</a></dd></>)}
      {cfg.contact.address && (<><dt>Address</dt><dd>{cfg.contact.address}</dd></>)}
      {cfg.contact.hours && (<><dt>Hours</dt><dd>{cfg.contact.hours}</dd></>)}
    </dl>
  );
}

export default async function Contact({ searchParams }: { searchParams: Promise<{ topic?: string | string[] }> }) {
  const sp = await searchParams;
  const raw = Array.isArray(sp.topic) ? sp.topic[0] : sp.topic;
  const topic = normaliseTopic(raw);
  const mode = getFormMode();
  const c = site.contact;
  const claims = topic === 'claims';
  return (
    <>
      <LdJson path="/contact" crumbs={[{ label: 'Home', path: '/' }, { label: 'Contact', path: '/contact' }]} />
      <TextHero id="CT01" crumbs={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} title={c.hero.title} intro={c.hero.intro} />
      <section id="CT02" className="pad" style={{ paddingTop: 64 }}>
        <div className="container cgrid">
          <div>
            {claims && (
              <div className="status" style={{ marginTop: 0, marginBottom: 24 }}>
                <p><strong>Is this urgent?</strong> Follow the emergency and notification instructions in your policy first. This form is an initial enquiry route and is not an emergency service. See <Link href="/claims">our claims page</Link>.</p>
              </div>
            )}
            {mode === 'contact-only' ? (
              <div className="form"><Title text="Speak with us directly." /><p className="muted" style={{ marginTop: 16 }}>Please use the contact details alongside to reach Bright Fortune.</p></div>
            ) : (
              <ContactForm key={topic} mode={mode} initialTopic={topic} copy={{ heading: c.formHeading, privacyNotice: c.privacyNotice, sensitiveDataNote: c.sensitiveDataNote, acknowledgement: c.acknowledgement, success: c.success, preview: c.preview, failure: c.failure, timeout: c.timeout }} />
            )}
          </div>
          <aside className="aside" aria-label="Contact details">
            <div className="ph"><Photo id="workplace" sizes="(max-width:1099px) 100vw, 30vw" decorative /></div>
          </aside>
        </div>
      </section>
      <Split id="CT03" heading={c.officeHeading} paragraphs={[c.officeBody]} asset="harbour" side="left" tone="loc" extra={<ContactDetails />} />
    </>
  );
}
