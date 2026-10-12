# PROGRESS
## Stage 1–4 (scaffold, shell, templates, forms/SEO) — code written, build passes
- Stack: Next 16.4 App Router, React 19.3, TS 5.9, react-markdown 10 + remark-gfm, @playwright/test (dev). Native CSS in `src/styles/{tokens,site}.css`. Node 22 (`.nvmrc`).
- Content stays in `content/` (read server-side); `src/lib/{content,release,seo,schema,enquiry,transport,selectors,assets,labels}.ts`.
- Routes: all 21 in routes.json + /api/enquiry, robots, sitemap, 404, error. Legacy redirects /main.htm, /aboutus.htm in next.config.ts. `src/proxy.ts` adds X-Robots-Tag noindex unless SITE_MODE=public and host = SITE_URL.
- Release gate: `getRelease()` (env SITE_MODE+SITE_URL AND launch-config approvals). Form modes: preview (default) / contact-only / live (mock transport only if not public-ready).
- Checks run: `npx tsc --noEmit` PASS, `npx next build` PASS (0 warnings).
## Next
Stage 5: run `npm run build && npm start`, crawl routes, screenshots (qa/output), form API tests, write QA_REPORT.md. Then Stage 6 README/run instructions + launch inputs.
