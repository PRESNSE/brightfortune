// Usage: BASE_URL=http://localhost:3100 node qa/shots.mjs  -> qa/output/*.png (+ overflow report)
import { chromium } from '@playwright/test';
import fs from 'node:fs';
const base = process.env.BASE_URL ?? 'http://localhost:3000';
const exe = fs.existsSync('/opt/pw-browsers/chromium') ? '/opt/pw-browsers/chromium' : undefined;
const jobs = [
  ['home', '/', [1440, 1000], true], ['home', '/', [375, 812], true],
  ['service', '/what-we-do/marine', [1440, 1000], true], ['service', '/what-we-do/marine', [375, 812], true],
  ['contact', '/contact', [375, 812], true], ['contact', '/contact?topic=claims', [1440, 1000], true],
  ['guide', '/insights/property-all-risks', [1440, 1000], true], ['guide', '/insights/property-all-risks', [375, 812], true],
  ['about', '/who-we-are', [1440, 1000], true], ['resources', '/resources', [1440, 900], false],
  ['home', '/', [320, 700], false],
];
const browser = await chromium.launch({ executablePath: exe });
for (const [name, path, [w, h], full] of jobs) {
  const page = await browser.newPage({ viewport: { width: w, height: h } });
  await page.goto(base + path, { waitUntil: 'networkidle' });
  await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 80)); } window.scrollTo(0, 0); });
  await page.waitForTimeout(400);
  const over = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  await page.screenshot({ path: `qa/output/${name}-${w}.png`, fullPage: full });
  console.log(name, path, w, 'overflowPx=' + over);
  await page.close();
}
await browser.close();
