import Link from 'next/link';
import { services } from '@/lib/content';
import { contactHref } from '@/lib/selectors';
import { Nav } from './Nav';
import { Wordmark } from './Wordmark';

export function Header() {
  return (
    <header className="site-header">
      <div className="header-row">
        <Link href="/" className="wordmark" aria-label="Bright Fortune — home"><Wordmark /></Link>
        <Nav services={services.map((s) => ({ slug: s.slug, title: s.title, summary: s.summary }))} contactHref={contactHref('other')} />
      </div>
      <noscript><style>{`.menu-btn{display:none}.mobile-panel{display:block;position:static;padding-block:0}.site-header{position:static;height:auto}.header-row{flex-wrap:wrap;padding-block:12px}.m-toggle{pointer-events:none}.m-toggle svg{display:none}.m-sub[hidden]{display:block}.m-link,.m-toggle{min-height:44px;font-size:18px}.mobile-panel>ul{display:flex;flex-wrap:wrap;gap:0 20px}.mobile-panel>ul>li{border:0}.m-sub{display:none!important}`}</style></noscript>
    </header>
  );
}
