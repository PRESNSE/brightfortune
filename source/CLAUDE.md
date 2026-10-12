# Execution instructions — Bright Fortune

## Visual correction authority (12 October 2026)
Read `docs/VISUAL_FIDELITY.md` first for visual work. The user explicitly requested a closer reconstruction after the first build. That measured reference and the current implementation supersede the approximate HTML mockup, original blueprint, and older visual assumptions below. Inspect the actual BMS reference when a measurement is missing; do not guess or regress to generic cards. Preserve the existing functional and launch controls.

Implement the complete website described by this pack. Do not stop at a plan, skeleton, homepage or design proposal. The user has already chosen the architecture and reference direction.

## Read once in this order
1. `docs/PRD.md`, `docs/BUILD_SEQUENCE.md`.
2. `design/DESIGN_SYSTEM.md`, `design/COMPONENTS_AND_UX.md`, `design/page-compositions.json` and `design/tokens.css`.
3. `content/routes.json`, `content/site.json`, `content/services.json`, `content/launch-config.json`; read articles/legal files when wiring those templates.
4. `docs/SEO_GEO.md`, `docs/FORMS_AND_PRIVACY.md`, `docs/MIGRATION.md`, `qa/ACCEPTANCE.md`.
Use `references/original-blueprint.md` only for provenance. New specifications supersede it. Do not read every appendix into context before coding.

## Fixed decisions
Next.js App Router, TypeScript, native CSS using supplied tokens, server-rendered content, small client islands, local bundled assets and Figtree. Preserve a sound existing stack if present; avoid a destructive rewrite or extra package manager. No CMS, database, authentication, quote calculator, payment, multilingual toggle, fabricated news, fake staff or insurer logos. Native CSS instead of adding Tailwind/animation dependencies to an empty repo is intentional.

Use all content; do not replace it with generic placeholder prose. A complete page includes its editorial body, relevant coverage/consideration sections, FAQ, related content and CTA. Build every route in routes.json. Use one service template and one article template. Do not import competitor source or fetch BMS at runtime.

Public launch is controlled by launch-config and environment, not NODE_ENV alone. Production builds on preview hosts must remain noindex. Unapproved business fields remain explicit review records; never silently mark them approved. Complete the preview regardless. Non-production form validates locally and states that nothing was sent. Live mode must use a configured transport or a verified contact-only fallback.

Inspect package.json, lockfile and existing instructions once. Reuse established dependencies; otherwise resolve supported stable versions once, record exact versions in lockfile, and use Node 22 LTS (or a newer supported LTS already pinned by repo). Do not install an unverified historical patch from this document.

Do not repeat broad keyword research. Focused BMS page inspection and matched-viewport visual comparisons are required for fidelity corrections. A focused official-doc check is permitted to resolve a real build/API failure. Keep build/test checks necessary to avoid shipping broken routes, false form success or accidental indexing. Never claim tests passed if not run.

Priority if time becomes tight: all routes/content, navigation and form truthfulness, responsive visual system, metadata, then subtle animation. Do not trade away content or mobile usability for decorative effects. Write PROGRESS.md after each stage with exact files, completed checks and next command so a later session can resume without re-planning.
