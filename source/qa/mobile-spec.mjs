// Checks computed mobile values against design/DESIGN_SYSTEM.md "Responsive values" (375px and 320px). Needs server on 3100.
import { chromium } from '@playwright/test';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
let fails = 0;
const ok = (n, p, d = '') => { if (!p) fails++; console.log(`${p ? 'PASS' : 'FAIL'}  ${n}${d ? ' — ' + d : ''}`); };
const px = (v) => parseFloat(v);
for (const w of [375, 320]) {
  const p = await b.newPage({ viewport: { width: w, height: 812 } });
  await p.goto('http://localhost:3100/', { waitUntil: 'networkidle' });
  const m = await p.evaluate(() => {
    const cs = (s) => { const e = document.querySelector(s); return e ? getComputedStyle(e) : null; };
    const r = (s) => document.querySelector(s)?.getBoundingClientRect();
    const strips = [...document.querySelectorAll('.hero-media img')].map((i) => Math.round(i.getBoundingClientRect().width));
    const h1 = document.querySelector('.hero h1').getBoundingClientRect();
    const facts = [...document.querySelectorAll('.fact')].map((e) => Math.round(e.getBoundingClientRect().width));
    const small = [...document.querySelectorAll('a,button,summary,input,select')].filter((e) => { const b = e.getBoundingClientRect(); return b.width > 0 && b.height > 0 && (b.height < 44) && getComputedStyle(e).display !== 'inline' && !e.closest('.hp') && e.type !== 'checkbox'; }).length;
    return {
      header: r('.site-header').height, hero: r('.hero').height, h1: cs('.hero h1').fontSize, h1w: h1.width, rule: cs('.hero .rule').display,
      strips, body: cs('body').fontSize, h2: cs('.split h2').fontSize, sec: cs('.pad')?.paddingTop, gutter: cs('.container').paddingLeft,
      cap: [Math.round(r('.cap').width), Math.round(r('.cap').height)], facts, small,
      numbered: getComputedStyle(document.querySelector('.numbered')).gridTemplateColumns.split(' ').length,
    };
  });
  console.log(`--- ${w}px`, JSON.stringify(m));
  ok(`${w}: nav height 68`, m.header === 68);
  ok(`${w}: hero min 640`, m.hero >= 640);
  ok(`${w}: H1 two lines, rule hidden, fits ${w - 44}px`, m.rule === 'none' && m.h1w <= w - 44 + 1);
  ok(`${w}: H1 size ${w <= 359 ? '46' : 'clamp(48,13vw,64)'}`, w <= 359 ? px(m.h1) === 46 : px(m.h1) === Math.min(64, Math.max(48, w * 0.13)));
  ok(`${w}: three photo strips ≈33.3%`, m.strips.length === 3 && m.strips.every((s) => Math.abs(s - w / 3) <= 2));
  ok(`${w}: body 17px, H2 40px, gutter 22px, section padding 64px`, m.body === '17px' && m.h2 === '40px' && m.gutter === '22px' && m.sec === '64px');
  ok(`${w}: capsule 280×350`, m.cap[0] === 280 && m.cap[1] === 350, m.cap.join('×'));
  ok(`${w}: facts 2+2+1 (last full width)`, m.facts.length === 5 && m.facts[4] >= w - 2 && m.facts[0] <= w / 2 + 1, m.facts.join(','));
  ok(`${w}: solutions single column`, m.numbered === 1);
  ok(`${w}: touch targets ≥44px`, m.small === 0, `${m.small} under 44px`);
  await p.close();
}
await b.close(); process.exit(fails ? 1 : 0);
