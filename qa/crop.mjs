import { chromium } from '@playwright/test';
const [,, path, w, y, h, out] = process.argv;
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const p = await b.newPage({ viewport: { width: +w, height: 900 } });
await p.goto('http://localhost:3100' + path, { waitUntil: 'networkidle' });
await p.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { scrollTo(0, y); await new Promise(r => setTimeout(r, 60)); } scrollTo(0, 0); });
await p.waitForTimeout(300);
await p.screenshot({ path: out, fullPage: true, clip: { x: 0, y: +y, width: +w, height: +h } });
await b.close();
