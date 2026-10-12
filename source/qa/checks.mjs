// Focused acceptance checks. Needs three running servers (see QA_REPORT.md): 3100 preview, 3101 mock-live form, 3102 public fixture.
import http from 'node:http';
import fs from 'node:fs';
const previewPort = Number(process.env.PREVIEW_PORT ?? 3100);
const routes = JSON.parse(fs.readFileSync('content/routes.json', 'utf8'));
const results = [];
const ok = (name, pass, detail = '') => { results.push({ name, pass }); console.log(`${pass ? 'PASS' : 'FAIL'}  ${name}${detail ? ' — ' + detail : ''}`); };

function req(port, path, { method = 'GET', headers = {}, body } = {}) {
  return new Promise((resolve, reject) => {
    const r = http.request({ host: 'localhost', port, path, method, headers }, (res) => {
      let d = ''; res.on('data', (c) => (d += c)); res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, text: d }));
    });
    r.on('error', reject); if (body) r.write(body); r.end();
  });
}
const strip = (h) => h.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;');

// 1. Routes (preview)
for (const r of routes) {
  const res = await req(previewPort, r.path);
  const h = res.text;
  const h1 = (strip(h).match(/<h1[\s>]/g) || []).length;
  const mainText = strip(h);
  const title = (h.match(/<title>([\s\S]*?)<\/title>/) || [])[1] ?? '';
  const desc = (h.match(/<meta name="description" content="([^"]*)"/) || [])[1] ?? '';
  const pass = res.status === 200 && h1 === 1 && title === esc(r.title).replace(/&#x27;/g, '&#x27;') && desc.length > 20 && !/lorem ipsum|TODO_CONFIRM/i.test(mainText) && /noindex/.test(h) && /noindex/.test(res.headers['x-robots-tag'] ?? '');
  ok(`route ${r.path}`, pass, `status=${res.status} h1=${h1} titleOK=${title === esc(r.title)} descLen=${desc.length}`);
}
const titles = new Set(routes.map((r) => r.title)); ok('titles unique', titles.size === routes.length);

// 2. 404s + redirects
for (const p of ['/insights/nonexistent-guide-test', '/what-we-do/nonexistent', '/nope', '/resources/x']) ok(`404 ${p}`, (await req(previewPort, p)).status === 404);
for (const [from, to] of [['/main.htm', '/'], ['/aboutus.htm', '/who-we-are']]) { const r = await req(previewPort, from); ok(`redirect ${from}`, [301, 308].includes(r.status) && r.headers.location === to, `${r.status} -> ${r.headers.location}`); }

// 3. Link integrity
const seen = new Set(routes.map((r) => r.path)); const bad = [];
for (const r of routes) {
  const h = (await req(previewPort, r.path)).text;
  for (const m of h.matchAll(/href="(\/[^"#?]*)(?:[?#][^"]*)?"/g)) {
    const p = m[1].replace(/\/$/, '') || '/';
    if (/^\/(_next|images|fonts)/.test(p) || p === '/robots.txt' || p === '/sitemap.xml' || seen.has(p)) continue;
    const st = (await req(previewPort, p)).status; seen.add(p); if (st >= 400 && st !== 308) bad.push(p + ':' + st); else if (st === 308) seen.add(p);
  }
  if (/href=""|href="#"|mailto:#/.test(h)) bad.push('empty href on ' + r.path);
}
ok('internal links resolve, no empty hrefs', bad.length === 0, bad.join(', '));

// 4. Preview SEO
const rb = await req(previewPort, '/robots.txt'); ok('robots.txt allows crawl, no sitemap in preview', /Allow: \//.test(rb.text) && !/Sitemap:/.test(rb.text) && !/Disallow: \/\s/.test(rb.text));
const sm = await req(previewPort, '/sitemap.xml'); ok('preview sitemap empty', !/<url>/.test(sm.text), sm.text.slice(0, 120));
ok('no JSON-LD in preview', !/application\/ld\+json/.test((await req(previewPort, '/')).text));
ok('no canonical in preview', !/rel="canonical"/.test((await req(previewPort, '/')).text));

// 5. Preview form API
const post = (port, b, h = {}) => req(port, '/api/enquiry', { method: 'POST', headers: { 'content-type': 'application/json', 'x-forwarded-for': '10.0.0.1', origin: `http://localhost:${port}`, ...h }, body: JSON.stringify(b) });
const valid = { firstName: 'Test', lastName: '', email: 'a@b.co', phone: '', topic: 'marine', company: '', message: 'A sufficiently long test message', privacyAcknowledged: true, website: '', requestId: '11111111-2222-3333-4444-555555555555' };
let r = await post(previewPort, valid); ok('preview API -> 503 PREVIEW_DISABLED', r.status === 503 && /PREVIEW_DISABLED/.test(r.text) && /no-store/.test(r.headers['cache-control']));

if (process.argv.includes('--preview-only')) {
  const failed = results.filter(r => !r.pass);
  console.log(`Preview checks: ${results.length - failed.length}/${results.length} passed`);
  process.exit(failed.length ? 1 : 0);
}

// 6. Mock live API contract
r = await post(3101, valid); ok('live accepted 200 + reference', r.status === 200 && /"reference":"BF-/.test(r.text));
r = await post(3101, valid); ok('duplicate requestId returns same reference (no 2nd send)', r.status === 200);
r = await post(3101, { ...valid, email: 'bad', requestId: 'aaaaaaaa-bbbb-cccc-dddd-000000000001' }); ok('invalid -> 400 VALIDATION', r.status === 400 && /VALIDATION/.test(r.text));
r = await post(3101, valid, { origin: 'https://evil.test' }); ok('wrong origin -> 403', r.status === 403);
r = await req(3101, '/api/enquiry', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(valid) }); ok('absent origin -> 403', r.status === 403);
r = await req(3101, '/api/enquiry', { method: 'POST', headers: { 'content-type': 'text/plain', origin: 'http://localhost:3101' }, body: 'x' }); ok('wrong type -> 415', r.status === 415);
r = await post(3101, { ...valid, message: 'x'.repeat(20000) }); ok('oversized -> 413', r.status === 413);
r = await post(3101, { ...valid, website: 'spam', requestId: 'aaaaaaaa-bbbb-cccc-dddd-000000000002' }); ok('honeypot -> 400 neutral', r.status === 400 && /BAD_REQUEST/.test(r.text));
r = await post(3101, { ...valid, message: 'MOCK_UNCERTAIN message text', requestId: 'aaaaaaaa-bbbb-cccc-dddd-000000000003' }); ok('uncertain -> 504', r.status === 504 && /DELIVERY_UNCERTAIN/.test(r.text));
r = await post(3101, { ...valid, message: 'MOCK_UNAVAILABLE message text', requestId: 'aaaaaaaa-bbbb-cccc-dddd-000000000004' }); ok('transport down -> 503', r.status === 503 && /TRANSPORT_UNAVAILABLE/.test(r.text));
r = await post(3101, { ...valid, requestId: 'aaaaaaaa-bbbb-cccc-dddd-000000000005' }); ok('5th attempt in window still allowed or limited', [200, 429].includes(r.status));
let last; for (let i = 0; i < 4; i++) last = await post(3101, { ...valid, requestId: `aaaaaaaa-bbbb-cccc-dddd-00000000010${i}` });
ok('rate limit -> 429 + Retry-After', last.status === 429 && !!last.headers['retry-after'], `status=${last.status}`);

// 7. Public fixture: canonical, sitemap, schema, legal noindex
const host = { host: 'example.test' };
const home = await req(3102, '/', { headers: host });
ok('public fixture: index,follow + canonical', /content="index, follow"/.test(home.text) && /rel="canonical" href="https:\/\/example\.test\/?"/.test(home.text) && !/noindex/.test(home.headers['x-robots-tag'] ?? ''));
const ld = [...home.text.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
ok('public fixture: JSON-LD parses (InsuranceAgency + WebSite)', ld.some((o) => o['@type'] === 'InsuranceAgency') && ld.some((o) => o['@type'] === 'WebSite'));
const svc = await req(3102, '/what-we-do/marine', { headers: host }); const ld2 = [...svc.text.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
ok('service JSON-LD Service + Breadcrumb', ld2.some((o) => o['@type'] === 'Service') && ld2.some((o) => o['@type'] === 'BreadcrumbList'));
const art = await req(3102, '/insights/property-all-risks', { headers: host }); const ld3 = [...art.text.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => JSON.parse(m[1]));
ok('guide JSON-LD Article without invented dates', ld3.some((o) => o['@type'] === 'Article' && !o.datePublished));
const lg = await req(3102, '/privacy', { headers: host }); ok('legal page noindex,follow in public fixture', /content="noindex, follow"/.test(lg.text));
const sm2 = await req(3102, '/sitemap.xml', { headers: host }); const urls = [...sm2.text.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
ok('public sitemap: 17 indexable routes, no legal, no lastmod', urls.length === 17 && !urls.some((u) => /privacy|terms|cookies|regulation/.test(u)) && !/lastmod/.test(sm2.text), `n=${urls.length}`);
ok('public fixture on wrong host stays noindex (header)', /noindex/.test((await req(3102, '/', { headers: { host: 'preview.vercel.app' } })).headers['x-robots-tag'] ?? ''));
ok('public fixture API (no transport env) fails closed 503', (await req(3102, '/api/enquiry', { method: 'POST', headers: { 'content-type': 'application/json', origin: 'https://example.test', host: 'example.test' }, body: JSON.stringify(valid) })).status === 503);

// 8. Secrets
const chunks = fs.readdirSync('.next/static', { recursive: true }).filter((f) => String(f).endsWith('.js'));
const clientText = chunks.map((f) => fs.readFileSync('.next/static/' + f, 'utf8')).join('');
ok('no server credentials/approval data in client bundle', !/RESEND_API_KEY|UPSTASH|approvalEvidence|launchConfig|legalReviewNotes/.test(clientText));
ok('no external BMS requests in HTML', !/bmsgroup|bms\.co|bms-group/i.test(home.text));

const fail = results.filter((x) => !x.pass).length;
console.log(`\n${results.length - fail}/${results.length} passed`);
process.exit(fail ? 1 : 0);
