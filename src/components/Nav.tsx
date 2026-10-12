'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';

interface NavService { slug: string; title: string; summary: string }
interface Props { services: NavService[]; contactHref: string }
type Panel = 'services' | 'resources' | null;

const Chevron = () => (<svg width="14" height="9" viewBox="0 0 14 9" fill="none" aria-hidden="true"><path d="M1 1.5l6 6 6-6" stroke="currentColor" strokeWidth="1.8" /></svg>);

export function Nav({ services, contactHref }: Props) {
  const pathname = usePathname();
  const [panel, setPanel] = useState<Panel>(null);
  const [mobile, setMobile] = useState(false);
  const [sub, setSub] = useState<Panel>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const menuBtn = useRef<HTMLButtonElement>(null);
  const mobileRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);

  const closeAll = useCallback(() => { setPanel(null); setMobile(false); setSub(null); }, []);

  // Close on route change.
  useEffect(() => { closeAll(); }, [pathname, closeAll]);

  // Desktop disclosure: outside click + Escape (returns focus to trigger).
  useEffect(() => {
    if (!panel) return;
    const onDown = (e: MouseEvent) => { if (navRef.current && !navRef.current.contains(e.target as Node)) setPanel(null); };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { const p = panel; setPanel(null); triggerRefs.current[p]?.focus(); } };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey); };
  }, [panel]);

  // Mobile menu: scroll lock, inert background, focus trap, Escape, resize cleanup.
  useEffect(() => {
    const targets = ['main', 'footer-root'].map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const setInert = (on: boolean) => targets.forEach((el) => (on ? el.setAttribute('inert', '') : el.removeAttribute('inert')));
    if (!mobile) { document.documentElement.style.overflow = ''; setInert(false); return; }
    document.documentElement.style.overflow = 'hidden';
    setInert(true);
    const focusables = () => Array.from(mobileRef.current?.querySelectorAll<HTMLElement>('a[href],button:not([disabled])') ?? []);
    focusables()[0]?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') { setMobile(false); menuBtn.current?.focus(); return; }
      if (e.key !== 'Tab') return;
      const f = [menuBtn.current as HTMLElement, ...focusables()].filter(Boolean);
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKey);
    const mq = window.matchMedia('(min-width:1200px)');
    const onMq = () => { if (mq.matches) closeAll(); };
    mq.addEventListener('change', onMq);
    return () => { document.removeEventListener('keydown', onKey); mq.removeEventListener('change', onMq); document.documentElement.style.overflow = ''; setInert(false); };
  }, [mobile, closeAll]);

  const clearTimer = () => { if (closeTimer.current) clearTimeout(closeTimer.current); };
  const hoverOpen = (p: Panel) => { if (window.matchMedia('(hover:hover)').matches) { clearTimer(); setPanel(p); } };
  const hoverClose = () => { clearTimer(); closeTimer.current = setTimeout(() => { if (!navRef.current?.contains(document.activeElement)) setPanel(null); }, 150); };

  const cur = (href: string) => (pathname === href || (href !== '/' && pathname.startsWith(href + '/')) ? 'page' : undefined);

  const item = (id: Exclude<Panel, null>, label: string, href: string) => (
    <div key={id} className="nav-item" onMouseEnter={() => hoverOpen(id)} onMouseLeave={hoverClose}>
      <Link href={href} className="nav-link" aria-current={cur(href)}>{label}</Link>
      <button
        type="button" className="disclose" ref={(el) => { triggerRefs.current[id] = el; }}
        aria-expanded={panel === id} aria-controls={`panel-${id}`} aria-label={`${label} menu`}
        onClick={() => setPanel(panel === id ? null : id)}
      ><Chevron /></button>
    </div>
  );

  return (
    <>
      <nav className="nav-desktop" aria-label="Primary" ref={navRef} onMouseEnter={clearTimer} onMouseLeave={hoverClose}>
        <Link href="/who-we-are" className="nav-link" aria-current={cur('/who-we-are')}>Who we are</Link>
        {item('services', 'What we do', '/what-we-do')}
        {item('resources', 'Insights & Resources', '/insights')}
        <Link href="/claims" className="nav-link" aria-current={cur('/claims')}>Claims</Link>
        <Link href={contactHref} className="pill nav-cta" aria-current={cur('/contact')}>Speak with us</Link>

        <div id="panel-services" className="mega" data-open={panel === 'services'} hidden={panel !== 'services'} onMouseEnter={clearTimer} onMouseLeave={hoverClose}>
          <div className="mega-inner">
            <div className="mega-grid">
              {services.map((s) => (
                <Link key={s.slug} className="mega-link" href={`/what-we-do/${s.slug}`}><span className="mega-title">{s.title}</span><span className="mega-sum">{s.summary}</span></Link>
              ))}
            </div>
            <div className="mega-band"><p>Not sure where to start? Tell us what you need to protect.</p><Link className="linkarrow" href="/what-we-do">All services</Link></div>
          </div>
        </div>
        <div id="panel-resources" className="mega" data-open={panel === 'resources'} hidden={panel !== 'resources'} onMouseEnter={clearTimer} onMouseLeave={hoverClose}>
          <div className="mega-inner">
            <div className="mega-grid two">
              <Link className="mega-link" href="/insights"><span className="mega-title">Insights</span><span className="mega-sum">Clear introductions to common insurance questions.</span></Link>
              <Link className="mega-link" href="/resources"><span className="mega-title">Resources</span><span className="mega-sum">Browse every guide by category.</span></Link>
            </div>
          </div>
        </div>
      </nav>

      <button type="button" className="menu-btn" ref={menuBtn} aria-expanded={mobile} aria-controls="mobile-panel" onClick={() => setMobile((m) => !m)}>
        {mobile ? 'Close' : 'Menu'}
        <svg width="18" height="12" viewBox="0 0 18 12" aria-hidden="true">{mobile ? <path d="M2 1l14 10M16 1L2 11" stroke="currentColor" strokeWidth="2" /> : <path d="M0 1h18M0 6h18M0 11h18" stroke="currentColor" strokeWidth="2" />}</svg>
      </button>
      <div className="backdrop m" data-open={mobile} onClick={() => setMobile(false)} />
      <div id="mobile-panel" className="mobile-panel" data-open={mobile} ref={mobileRef} role="dialog" aria-label="Site menu">
        <ul>
          <li><Link className="m-link" href="/who-we-are">Who we are</Link></li>
          <li>
            <button type="button" className="m-toggle" aria-expanded={sub === 'services'} aria-controls="m-services" onClick={() => setSub(sub === 'services' ? null : 'services')}>What we do<Chevron /></button>
            <div id="m-services" className="m-sub" hidden={sub !== 'services'}>
              <Link href="/what-we-do">All services</Link>
              {services.map((s) => <Link key={s.slug} href={`/what-we-do/${s.slug}`}>{s.title}</Link>)}
            </div>
          </li>
          <li>
            <button type="button" className="m-toggle" aria-expanded={sub === 'resources'} aria-controls="m-resources" onClick={() => setSub(sub === 'resources' ? null : 'resources')}>Insights &amp; Resources<Chevron /></button>
            <div id="m-resources" className="m-sub" hidden={sub !== 'resources'}>
              <Link href="/insights">Insights</Link>
              <Link href="/resources">Resources</Link>
            </div>
          </li>
          <li><Link className="m-link" href="/claims">Claims</Link></li>
        </ul>
        <Link href={contactHref} className="pill solid m-cta">Speak with us</Link>
      </div>
    </>
  );
}
