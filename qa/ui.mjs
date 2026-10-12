// UI interaction checks (Playwright library). Needs servers from qa/start-servers.sh.
import { chromium } from '@playwright/test';
const exe = '/opt/pw-browsers/chromium';
const b = await chromium.launch({ executablePath: exe });
let fails = 0;
const ok = (n, p, d = '') => { if (!p) fails++; console.log(`${p ? 'PASS' : 'FAIL'}  ${n}${d ? ' — ' + d : ''}`); };
const P = 'http://localhost:3100', L = 'http://localhost:3101';

// --- desktop nav
{
  const pg = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await pg.goto(P + '/', { waitUntil: 'networkidle' });
  const trig = pg.getByRole('button', { name: 'What we do menu' });
  await trig.focus(); await pg.keyboard.press('Enter');
  ok('desktop: disclosure opens (aria-expanded)', (await trig.getAttribute('aria-expanded')) === 'true' && await pg.locator('#panel-services').isVisible());
  ok('desktop: What we do link separate from disclosure button', (await pg.locator('a.nav-link', { hasText: 'What we do' }).count()) === 1);
  await pg.keyboard.press('Escape');
  ok('desktop: Escape closes + focus returns', (await trig.getAttribute('aria-expanded')) === 'false' && await trig.evaluate((e) => e === document.activeElement));
  await trig.click(); await pg.mouse.click(700, 600);
  ok('desktop: outside click closes', (await trig.getAttribute('aria-expanded')) === 'false');
  await trig.click(); await pg.locator('#panel-services a', { hasText: 'Marine Insurance' }).click(); await pg.waitForURL('**/what-we-do/marine'); await pg.waitForTimeout(300);
  ok('desktop: route change closes panel', await pg.locator('#panel-services').isHidden());
  await pg.close();
}
// --- mobile nav
{
  const pg = await b.newPage({ viewport: { width: 375, height: 812 } });
  await pg.goto(P + '/', { waitUntil: 'networkidle' });
  const btn = pg.locator('.menu-btn');
  await btn.click();
  ok('mobile: panel opens, main inert, scroll locked', await pg.locator('#mobile-panel').isVisible() && await pg.evaluate(() => document.getElementById('main').hasAttribute('inert') && document.documentElement.style.overflow === 'hidden'));
  ok('mobile: focus moved into panel', await pg.evaluate(() => document.getElementById('mobile-panel').contains(document.activeElement)));
  await pg.locator('.m-toggle', { hasText: 'What we do' }).click();
  ok('mobile: subgroup expands (aria-expanded)', await pg.locator('#m-services').isVisible());
  await pg.keyboard.press('Escape');
  ok('mobile: Escape closes, lock removed, focus restored', await pg.evaluate(() => !document.getElementById('main').hasAttribute('inert') && document.documentElement.style.overflow === '' ) && await btn.evaluate((e) => e === document.activeElement));
  await btn.click(); await pg.setViewportSize({ width: 1440, height: 900 });
  await pg.waitForTimeout(200);
  ok('mobile: resize to desktop clears modal state', await pg.evaluate(() => !document.getElementById('main').hasAttribute('inert') && document.documentElement.style.overflow === ''));
  await pg.setViewportSize({ width: 375, height: 812 }); await btn.click();
  await pg.locator('#mobile-panel a', { hasText: 'Claims' }).first().click(); await pg.waitForURL('**/claims'); await pg.waitForTimeout(300);
  ok('mobile: route change closes + unlocks', await pg.evaluate(() => !document.getElementById('main').hasAttribute('inert') && document.documentElement.style.overflow === ''));
  await pg.close();
}
// --- filter, FAQ, marquee
{
  const pg = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await pg.goto(P + '/resources', { waitUntil: 'networkidle' });
  ok('resources: 5 guides by default', (await pg.locator('.gcard').count()) === 5 && /Showing 5 guides/.test(await pg.locator('.count').innerText()));
  ok('resources: no Commercial filter', (await pg.getByRole('button', { name: 'Commercial', exact: false }).count()) === 0);
  await pg.getByRole('button', { name: 'Marine', exact: true }).click();
  ok('resources: Marine filter -> 1 guide, aria-pressed, URL', (await pg.locator('.gcard').count()) === 1 && (await pg.getByRole('button', { name: 'Marine', exact: true }).getAttribute('aria-pressed')) === 'true' && pg.url().endsWith('?category=marine'), await pg.locator('.count').innerText());
  await pg.goto(P + '/resources?category=bogus', { waitUntil: 'networkidle' });
  ok('resources: unknown category -> All', (await pg.locator('.gcard').count()) === 5);
  await pg.goto(P + '/resources?category=claims', { waitUntil: 'networkidle' });
  ok('resources: ?category=claims server-initial filter', (await pg.locator('.gcard').count()) === 1);
  const canon = await pg.goto(P + '/what-we-do/marine', { waitUntil: 'networkidle' });
  const d = pg.locator('.faq details').first(); await d.locator('summary').click(); await pg.locator('.faq details').nth(1).locator('summary').click();
  ok('FAQ: native details, multiple open', (await pg.locator('.faq details[open]').count()) === 2);
  await pg.goto(P + '/', { waitUntil: 'networkidle' });
  const pause = pg.getByRole('button', { name: /Pause motion/ });
  await pause.click();
  const state = await pg.evaluate(() => getComputedStyle(document.querySelector('.m-inner')).animationPlayState);
  ok('marquee: Pause button pauses animation', state === 'paused' && (await pg.getByRole('button', { name: /Play motion/ }).count()) === 1);
  await pg.close();
  const rm = await b.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  await rm.goto(P + '/', { waitUntil: 'networkidle' });
  ok('reduced motion: marquee animation off, pause hidden', (await rm.evaluate(() => getComputedStyle(document.querySelector('.m-inner')).animationName)) === 'none' && !(await rm.getByRole('button', { name: /Pause motion/ }).isVisible()));
  await rm.close();
}
// --- preview form
{
  const pg = await b.newPage({ viewport: { width: 1440, height: 900 } });
  const apiCalls = []; pg.on('request', (r) => { if (r.url().includes('/api/')) apiCalls.push(r.url()); });
  await pg.goto(P + '/contact?topic=marine', { waitUntil: 'networkidle' });
  ok('contact: topic prefill marine', (await pg.locator('#f-topic').inputValue()) === 'marine');
  await pg.goto(P + '/contact?topic=<script>', { waitUntil: 'networkidle' });
  ok('contact: unknown topic -> other (no injection)', (await pg.locator('#f-topic').inputValue()) === 'other');
  await pg.getByRole('button', { name: /Check enquiry/ }).click();
  const sum = pg.locator('.errsum');
  ok('contact: invalid submit shows summary, focused', await sum.isVisible() && await sum.evaluate((e) => e === document.activeElement));
  ok('contact: field errors linked via aria-describedby', (await pg.locator('#f-email').getAttribute('aria-describedby')) === 'e-email' && (await pg.locator('#f-email').getAttribute('aria-invalid')) === 'true');
  await sum.locator('a').first().click();
  ok('contact: summary link focuses field', await pg.locator('#f-firstName').evaluate((e) => e === document.activeElement));
  await pg.fill('#f-firstName', 'Test'); await pg.fill('#f-email', 'a@b.co'); await pg.fill('#f-message', 'This is a preview test message.'); await pg.check('#f-privacyAcknowledged');
  await pg.getByRole('button', { name: /Check enquiry/ }).click();
  ok('contact preview: truthful message, no API call, values kept', (await pg.locator('.status').innerText()).includes('Preview only — your details have not been sent.') && apiCalls.length === 0 && (await pg.inputValue('#f-message')).length > 5);
  await pg.close();
}
// --- live (mock transport) form
{
  const lctx = await b.newContext({ viewport: { width: 1440, height: 900 }, extraHTTPHeaders: { 'x-forwarded-for': '10.0.0.2' } });
  const pg = await lctx.newPage();
  await pg.goto(L + '/contact?topic=claims', { waitUntil: 'networkidle' });
  ok('contact live: claims urgent notice shown', await pg.locator('text=Is this urgent?').isVisible());
  const fill = async (msg) => { await pg.fill('#f-firstName', 'Test'); await pg.fill('#f-email', 'a@b.co'); await pg.fill('#f-message', msg); if (!(await pg.isChecked('#f-privacyAcknowledged'))) await pg.check('#f-privacyAcknowledged'); };
  await fill('MOCK_UNAVAILABLE failure test message'); await pg.getByRole('button', { name: 'Send enquiry' }).click();
  await pg.waitForSelector('.status.bad');
  ok('contact live: failure keeps values, no success', (await pg.inputValue('#f-message')).includes('MOCK_UNAVAILABLE') && !(await pg.locator('.status.ok').count()));
  await pg.fill('#f-message', 'MOCK_UNCERTAIN timeout test message'); await pg.getByRole('button', { name: 'Send enquiry' }).click();
  await pg.waitForFunction(() => /could not be confirmed/i.test(document.querySelector('.status.bad')?.textContent ?? ''));
  ok('contact live: uncertain wording, no success', !(await pg.locator('.status.ok').count()));
  await pg.fill('#f-message', 'A clean success test message.'); await pg.getByRole('button', { name: 'Send enquiry' }).click();
  await pg.waitForSelector('.status.ok');
  ok('contact live: success only after 200, reference shown, message cleared', /BF-[0-9A-F]{8}/.test(await pg.locator('.status.ok').innerText()) && (await pg.inputValue('#f-message')) === '');
  await pg.close();
}
// --- no-JS + overflow
{
  const ctx = await b.newContext({ javaScriptEnabled: false, viewport: { width: 375, height: 812 } });
  const pg = await ctx.newPage();
  await pg.goto(P + '/what-we-do/marine');
  ok('no-JS: content, FAQ answers and nav links present', (await pg.locator('.faq .ans').count()) >= 3 && (await pg.locator('#mobile-panel a[href="/claims"]').count()) === 1 && (await pg.locator('main h1').innerText()).length > 3);
  await ctx.close();
  for (const w of [320, 375, 768, 1440]) {
    const pg2 = await b.newPage({ viewport: { width: w, height: 800 } });
    const bad = [];
    for (const path of ['/', '/what-we-do', '/what-we-do/medical-dental', '/claims', '/contact', '/resources', '/insights', '/who-we-are', '/insights/term-vs-whole-life', '/privacy']) {
      await pg2.goto(P + path, { waitUntil: 'load' });
      const o = await pg2.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      if (o > 1) bad.push(path + '(+' + o + ')');
    }
    ok(`no horizontal overflow @${w}px on 10 representative routes`, bad.length === 0, bad.join(', '));
    await pg2.close();
  }
}
await b.close();
console.log(fails ? `\n${fails} FAILED` : '\nall UI checks passed');
process.exit(fails ? 1 : 0);
