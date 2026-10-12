import { ContactCTA, Faq, ProcessSteps, Title } from '@/components/ui';
import { GuideCards, ServiceHero } from '@/components/sections';
import { LdJson } from '@/components/LdJson';
import { articles, site, toCard } from '@/lib/content';
import { routeMetadata } from '@/lib/seo';

export const metadata = routeMetadata('/claims');

export default function Claims() {
  const c = site.claims;
  const guide = articles.find((a) => a.id === 'preparing-for-a-claim');
  return (
    <>
      <LdJson path="/claims" crumbs={[{ label: 'Home', path: '/' }, { label: 'Claims', path: '/claims' }]} />
      <ServiceHero id="CL01" crumbs={[{ label: 'Home', href: '/' }, { label: 'Claims' }]} title={c.hero.title} intro={c.hero.intro} asset="workplace" cta={{ label: 'Contact us about a claim', href: '/contact?topic=claims' }} />
      <section id="CL02" className="pad">
        <div className="container twocol"><Title text={c.intro.heading} /><div className="body">{c.intro.paragraphs.map((p) => <p key={p}>{p}</p>)}</div></div>
      </section>
      <ProcessSteps id="CL03" heading="Four steps to keep in view." steps={c.steps} tone="white" />
      <section id="CL04" className="pad pale">
        <div className="container">
          <div className="sec-head"><Title text="Helpful to have to hand." /><p>You do not need everything before you ask for help. These items make the first conversation easier.</p></div>
          <ul className="check">{c.prepare.map((p) => <li key={p}>{p}</li>)}</ul>
        </div>
      </section>
      <Faq id="CL05" items={c.faqs} />
      {guide && <GuideCards id="CL06" heading="A closer look." items={[toCard(guide)]} cols="feature" />}
      <ContactCTA id="CL07" {...site.shared.cta} heading="Tell us what has happened." body="Share a brief account of the event and the policy details you have. We will help identify the next steps." label="Contact us about a claim" topic="claims" />
    </>
  );
}
