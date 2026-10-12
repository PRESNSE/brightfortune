import { ImageHero } from '@/components/sections';
import { ContactCTA, Split, Title } from '@/components/ui';
import { Photo } from '@/components/ui';
import { LdJson } from '@/components/LdJson';
import { site } from '@/lib/content';
import { routeMetadata } from '@/lib/seo';

export const metadata = routeMetadata('/who-we-are');

export default function About() {
  const a = site.about;
  const crumbs = [{ label: 'Home', href: '/' }, { label: 'Who we are' }];
  return (
    <>
      <LdJson path="/who-we-are" crumbs={[{ label: 'Home', path: '/' }, { label: 'Who we are', path: '/who-we-are' }]} />
      <ImageHero id="A01" crumbs={crumbs} title={a.hero.title} intro={a.hero.intro} asset="conversation" />
      <Split id="A02" heading={a.story.heading} paragraphs={a.story.paragraphs} asset="workplace" side="left" />
      <section id="A03" className="pad">
        <div className="container">
          <div className="sec-head"><Title text="A path of continuous experience." /></div>
          <ol className="timeline" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {a.timeline.map((t) => (<li className="tl" key={t.label}><span className="y">{t.label}</span><h3>{t.title}</h3><p>{t.body}</p></li>))}
          </ol>
        </div>
      </section>
      <section id="A04" className="values white">
        <div className="media"><Photo id="architecture" sizes="(max-width:899px) 100vw, 42vw" /></div>
        <div>
          <div className="container" style={{ padding: 0 }}>
            <ol>
              {a.values.map((v) => (<li key={v.title}><h3>{v.title}</h3><p>{v.body}</p></li>))}
            </ol>
          </div>
        </div>
      </section>
      <section id="A05" className="pad">
        <div className="container founder">
          <span className="label">Founder</span>
          <Title text={a.founder.name} />
          <p className="role">{a.founder.role}</p>
          <p className="muted">{a.founder.bio}</p>
        </div>
      </section>
      <ContactCTA id="A06" heading={a.closing.heading} body={a.closing.body} label="Speak with us" topic="other" />
    </>
  );
}
