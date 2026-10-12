# PROGRESS
## Status: all six stages complete (draft site built, verified, committed)
- Stack: Next 16.4 App Router + React 19.3 + TS 5.9, native CSS (`src/styles/`), react-markdown + remark-gfm, Playwright (dev, QA only). Node 22 (`.nvmrc`).
- Files: `src/app/**` (21 routes + `/api/enquiry`, robots, sitemap, 404, error, apple-icon), `src/components/**`, `src/lib/**` (content, release gate, seo, schema, enquiry, transport, selectors), `src/proxy.ts`, `next.config.ts`, `qa/*` (checks, ui, shots, fixtures, scripts), `QA_REPORT.md`.
- Checks run (all PASS): tsc, two production builds, `qa/checks.mjs` 56/56, `qa/ui.mjs` all, console clean. NOT RUN: Lighthouse, real email delivery, manual 200% zoom/screen reader.
- Unresolved: launch-only inputs (see QA_REPORT.md). Approvals in `content/launch-config.json` deliberately remain false.
## Next command
`npm run qa:serve && npm run qa:checks && npm run qa:ui` to re-verify; then fill launch-config approvals with evidence and run `python3 scripts/check-release.py`.

## Visual correction — 12 October 2026
- Reconstructed homepage composition, shared shell and internal hero styles from live BMS desktop measurements.
- Added locally bundled illustrative photos and public-domain map, preserved real BF content and release controls.
- Superseded old mockup/avoid-research guidance in CLAUDE.md and QA acceptance.
- Build and TypeScript pass; awaiting rendered preview and focused route checks. Next: inspect branch deployment, correct visible issues, complete qa/VISUAL_REPORT.md.

## Visual correction checkpoint — ready for branch publication
- Current source has passed production build, TypeScript and 34/34 focused HTTP checks across all 21 content routes; evidence: qa/results/visual-http.txt.
- Git CLI has no push credential; the connected GitHub write API returned 403 Resource not accessible by integration. No branch/PR/deployment was created remotely. Do not retry via alternate write endpoints to bypass that permission boundary.
- Local browser comparison is blocked by separate browser/workspace environments. Do not represent the code as visually verified. Old screenshots in qa/screenshots are baseline only.
- Exact next action after authorized repository write access is restored: publish the local correction branch/patch, open a draft PR, inspect its Vercel preview alongside BMS, and resolve visual differences. Current authority: docs/VISUAL_FIDELITY.md; current checks: qa/VISUAL_REPORT.md.
