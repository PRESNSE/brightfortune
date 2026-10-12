> Historical baseline report from the first implementation. Its visual screenshots and mobile-spec assertions do NOT validate the current correction. See `qa/VISUAL_REPORT.md` for current results.

# QA report — Bright Fortune draft site
Date: 2026-10-12 · Build: Next 16.4.0 / React 19.3 / Node 22 · Environment: Linux container, Chromium (Playwright 1.64) headless.
Raw output: `qa/results/{checks,ui,console}.txt`; screenshots: `qa/screenshots/`. Reproduce: `npm ci && npm run qa:serve && npm run qa:checks && npm run qa:ui`.

## Results
| Area | Result | Evidence |
|---|---|---|
| Typecheck (`tsc --noEmit`) | PASS | clean |
| Production build, preview config | PASS | 23 static/dynamic pages, 0 warnings |
| Production build, public fixture config | PASS | separate `.next-public` build |
| Route/content: all 21 routes (200, one H1, exact registry title, description, noindex meta + header, no lorem/TODO_CONFIRM) | PASS | checks.txt |
| Unknown guide/service/path → real 404 (4 cases) | PASS | checks.txt |
| Legacy redirects `/main.htm`→`/`, `/aboutus.htm`→`/who-we-are` (single hop, 308) | PASS | checks.txt |
| Internal links resolve; no empty/`#` hrefs | PASS | crawl of all 21 routes |
| Preview SEO: noindex meta + `X-Robots-Tag`, empty sitemap, robots allows crawl, no canonical, no JSON-LD | PASS | checks.txt |
| Public fixture (`example.test`, **test-only** approvals): index/follow, canonical, JSON-LD (InsuranceAgency, WebSite, Service, Breadcrumb, Article — no invented dates), 17-URL sitemap w/o legal pages or lastmod, legal `noindex,follow`, wrong host stays noindex, form fails closed 503 | PASS | checks.txt |
| Form API, preview: `503 PREVIEW_DISABLED`, `no-store` | PASS | checks.txt |
| Form API, mock transport: 200+reference, duplicate request ID, 400, 403 (wrong/absent Origin), 413, 415, honeypot 400, 504, 503, 429+Retry-After | PASS | checks.txt |
| No server secrets / approval data in client bundle; no BMS references | PASS | checks.txt |
| Nav: disclosure aria-expanded, link≠button, Escape + focus return, outside click, route-change close | PASS | ui.txt |
| Mobile menu: inert background, scroll lock, focus in/restore, Escape, resize-to-desktop and route-change cleanup | PASS | ui.txt |
| Resources filter (counts, aria-pressed, URL, unknown→All, server-initial `?category=`), FAQ multi-open | PASS | ui.txt |
| Marquee Pause works; reduced-motion disables animation and hides control | PASS | ui.txt |
| Contact: topic prefill + unknown→other, error summary focus, `aria-describedby`, preview message with **no network call**, live (mock) failure/uncertain/success states | PASS | ui.txt |
| No-JS: content, FAQ answers, nav links present | PASS | ui.txt |
| No horizontal overflow at 320/375/768/1440 on 10 representative routes | PASS | ui.txt |
| Console errors/warnings/hydration on 5 pages | PASS (clean) | console.txt |
| Visual inspection: home 1440/375, service (marine) 1440/375, contact 375, guide 1440, mega menu, mobile menu | DONE (screenshots) | compared with design intent, not pixel-compared to BMS |
| Mobile spec conformance @375/320 (`qa/mobile-spec.mjs`): nav 68px, hero ≥640px, H1 48.75px/46px two-line with rule hidden and fitting the text width, three 33.3% photo strips, body 17px, H2 40px, 22px gutter, 64px section padding, capsule 280×350, facts 2+2+1, single-column solutions, all targets ≥44px | PASS (after fixing 40–42px footer/nav links) | mobile-spec.txt |
| Mobile parity with the live BMS site | **NOT VERIFIABLE**: the pack records that BMS mobile/breakpoints and motion were never measured (one ~1348px desktop inspection only), and re-crawling BMS is out of scope. Responsive values are Bright Fortune's committed spec, not BMS measurements. | DESIGN_SYSTEM.md |
| Hero image weight: desktop ≈3×60 KB (800w), mobile ≈3×22 KB (480w) | within budget | file sizes |
| Lighthouse / Web Vitals audit | **NOT RUN** (no tooling installed; no field data) | — |
| 200% zoom, screen-reader pass, other browsers/real devices | **NOT RUN** (layout reflows by CSS; unverified manually) | — |
| Real email delivery | **NOT RUN** (no provider credentials or approved test recipient) | — |
| `scripts/validate-pack.py` | PASS · `scripts/check-release.py` → "NOT READY" as expected | — |

## Implementation notes / deviations
- Release state (indexing, JSON-LD, sitemap, facts filtering) is resolved at **build time** for static pages: set `SITE_MODE`/`SITE_URL` for the build. `src/proxy.ts` additionally forces `X-Robots-Tag: noindex` unless `SITE_MODE=public` and the request host equals `SITE_URL`.
- Root canonical renders as `https://host` (Next normalises the empty path; equivalent to `https://host/`).
- Env names differ from the pack's suggested `.env.example`: Resend + Upstash adapters (`RESEND_API_KEY`, `ENQUIRY_FROM`, `ENQUIRY_TO`, `UPSTASH_REDIS_REST_*`, `RATE_LIMIT_SALT`) — see `.env.example`. The Resend adapter is untested against the real provider.
- Responsive images: bundled WebP derivatives (480/800/1600) via `srcset`; `public/images/og-default.png` (1200×630) used as OG image only in public mode; `apple-icon.png` generated from the favicon.
- `qa/fixtures/launch-config.public.json` is a **test fixture**; real `content/launch-config.json` keeps every approval `false`.
- Legal drafts render their supplied review paragraphs with a "Draft for review" badge until `legalApproved`.

## Launch-only inputs (all in `content/launch-config.json` unless noted)
1. `canonicalOrigin` + `SITE_URL` (approved HTTPS domain) and `SITE_MODE=public` at build; host/CDN redirects for www/HTTP.
2. Verified contact: phone/email/address/hours, privacy contact, complaints contact; set `contactApproved`.
3. Verified regulatory statement + licence particulars (`regulatoryStatement`, `regulatoryApproved`).
4. Company approval: `companyIdentityApproved`, `historyApproved`, `copyApproved`, `articlesApproved`; legal text replaced with verified statements, then `legalApproved`.
5. Assets: `assetsApproved`; official logo (`officialLogoProvided`) or `draftWordmarkApprovedForLaunch`; check the port photo's vessel branding.
6. Enquiry route: either live (`ENQUIRY_MODE=live`, provider + durable rate-limit credentials, `retentionPolicyApproved`, approved-recipient transport test, then `form.transportTestPassed`) or `form.contactOnlyFallback`.
7. Record who approved what in `approvalEvidence`. Then run `python3 scripts/check-release.py`.
8. Off-site work (Search Console/Bing, Business Profile, directories) — account actions outside the repo.
