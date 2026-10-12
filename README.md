# Bright Fortune — implementation handoff
Version 2.0 · 12 October 2026 · English-language draft

This is a repository-ready implementation specification, content and asset pack. It is not an already-built Next.js website. All 21 intended content routes are specified and supplied with content. Claude implements the application using these files.

## Use in GitHub / Claude web
1. Extract this ZIP on your computer. Upload the **contents** of `bright-fortune-implementation-pack` to the root of your GitHub repository. Uploading the unopened ZIP does not expose its files to Claude. Preserve folders. For an existing application, put this pack in `implementation-pack/` and tell Claude that path; merge CLAUDE.md instructions without overwriting existing project instructions.
2. Connect/select that repository in Claude web and use `IMPLEMENT_PROMPT.md` as your first message. This is the recommended direct-build route.
3. Use `PLAN_PROMPT.md` only if you explicitly want a plan-mode pass first. A `/plan` command is interface-dependent; the prompt works as plain text. Do not spend a separate session re-planning a plan already supplied.
4. Claude must implement all routes, run the focused checks, and give you a preview plus an honest remaining-launch-input list. Hosting credentials and business approvals are not included in a ZIP.

## Files to start with
- `CLAUDE.md`: concise execution rules and reading order.
- `docs/PRD.md`: scope, audience, functionality and acceptance criteria.
- `docs/BUILD_SEQUENCE.md`: dependency-ordered implementation and checkpoint rules.
- `design/DESIGN_SYSTEM.md`, `design/tokens.css`: definitive visual system.
- `design/page-compositions.json`: exact module order, media, tone and layout for every template.
- `design/layout-atlas.svg` / `.png`: editable and preview wireframes for all ten templates.
- `design/design-reference.html`: portable visual direction and desktop/mobile composition boards; open locally in a browser. Original design reference, not a BMS screenshot or production application.
- `content/site.json`, `content/services.json`, `content/articles/*.md`, `content/legal/*.md`: complete draft copy.
- `content/routes.json`: route/metadata/indexability source of truth.
- `docs/SEO_GEO.md`, `docs/MIGRATION.md`: technical SEO, migration, answer visibility and off-site work.
- `docs/FORMS_AND_PRIVACY.md`: complete interaction/server contract and failure states.
- `content/launch-config.json`: all outstanding business approval fields in one place.
- `references/RESEARCH.md`: current source observations, provenance and limits.
- `public/`: bundled local stock photographs, Figtree font/license and original draft wordmark.
- `starter/`: reusable types, pure content selectors and metadata helpers; integrate with the application.
- `qa/`: measurable acceptance criteria and route test contract.
- `scripts/validate-pack.py`: validates this handoff's cross-references and assets; not an application test.

## What changed from the uploaded blueprint
Live desktop inspection corrected the hero, typography, palette and tile geometry. BMS currently shows a solid white top bar, centred three-panel hero, Figtree, navy type, orange punctuation, capsule-cropped media and curved coloured fact tiles. The original blueprint's transparent nav, generic grotesk, warm-ivory/gold palette and lower-left hero are superseded.

This pack targets a close adaptation of the inspected BMS desktop structure and visual language. Exact BMS motion timing, every breakpoint, all pages and proprietary assets have not been captured. Responsive dimensions here are explicit implementation decisions, not claimed BMS measurements. Stock stills replace competitor media; the Bright Fortune wordmark is provisional. Pixel identity and completion within a particular Claude usage allowance cannot be guaranteed.

The content fills service gaps with original, useful explanations and concrete enquiry questions. It does not transplant BMS's achievements, global teams, product availability, claims results or paragraphs. The marine page remains substantial without asserting unverified vessel/liability subclasses. Optional subclass drafts are supplied separately for company review.

## Preview and public release
Default: private preview, noindex, no live form submission, full draft copy. Public release requires a confirmed canonical domain, contact information, regulatory statement, privacy/legal review, approved assets and a tested contact route. These are finite factual/configuration inputs, not another website-planning exercise. Off-page listings, earned links and Search Console ownership require account work after implementation.

## Token-efficient session habits
- Start each session by reading `PROGRESS.md` (if present), then only the files `CLAUDE.md` lists for the current stage; skip `references/` and appendices unless a task needs them.
- Build in the order of `docs/BUILD_SEQUENCE.md`; finish a stage, run its focused check, update `PROGRESS.md` (files touched, checks run, next command), then commit.
- Read files by range or grep rather than whole-file dumps; never re-read a file you just edited.
- Batch independent tool calls; use `scripts/validate-pack.py` and one `build`/`lint`/`typecheck` run per stage, not per edit.
- Reuse `starter/` selectors and `content/*.json` instead of re-deriving data; do not repeat research or competitor crawling.
- Keep chat replies short: report outcomes and the next command, not file contents.
- Start a fresh session between major stages; `PROGRESS.md` carries the state.
