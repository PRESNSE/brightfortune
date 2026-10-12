# PROGRESS
## Status: all six stages complete (draft site built, verified, committed)
- Stack: Next 16.4 App Router + React 19.3 + TS 5.9, native CSS (`src/styles/`), react-markdown + remark-gfm, Playwright (dev, QA only). Node 22 (`.nvmrc`).
- Files: `src/app/**` (21 routes + `/api/enquiry`, robots, sitemap, 404, error, apple-icon), `src/components/**`, `src/lib/**` (content, release gate, seo, schema, enquiry, transport, selectors), `src/proxy.ts`, `next.config.ts`, `qa/*` (checks, ui, shots, fixtures, scripts), `QA_REPORT.md`.
- Checks run (all PASS): tsc, two production builds, `qa/checks.mjs` 56/56, `qa/ui.mjs` all, console clean. NOT RUN: Lighthouse, real email delivery, manual 200% zoom/screen reader.
- Unresolved: launch-only inputs (see QA_REPORT.md). Approvals in `content/launch-config.json` deliberately remain false.
## Next command
`npm run qa:serve && npm run qa:checks && npm run qa:ui` to re-verify; then fill launch-config approvals with evidence and run `python3 scripts/check-release.py`.
