# Six-stage execution plan
## 1. Initialise and map (one inspection)
Read existing repository instructions/package/lockfile; preserve user files. Empty repo: scaffold Next App Router + TS using supported stable packages; native CSS, no Tailwind or animation library required. Use one package manager and a lockfile. Put the application at repo root alongside the pack. If pack is nested, use its paths as source inputs and keep production src independent of docs.
Copy public assets, integrate content, wire types. Use Node 22 LTS unless an existing supported LTS is pinned. Resolve version once rather than continually updating. Implement launch-mode resolver before metadata/forms.

## 2. Build the visual shell and home
Implement font loading, tokens, responsive container, wordmark, header/mega menu/mobile menu, buttons, image wrapper and footer. Build the triptych hero, capsule split, coloured fact tiles, alternating split, location panel, numbered cards and marquee. Match design-reference before building services. Keep actual content visible before hydration.

## 3. Complete route templates and content
Build service, editorial, listing and utility templates. Connect all five services, their FAQ/considerations/resources, home/about/hub/claims/contact and both resource indexes. Implement all five guide bodies and four legal pages. Missing slug -> real 404 via notFound(). No duplicate guide pages under /resources. Render article headings with stable IDs for TOC and print support. Do not condense complete copy to make implementation easier.

## 4. Functional states and SEO
Add topic prefill, shared validation, preview mode and live contact transport adapter, menu semantics and filtering. Add metadata, breadcrumbs, Organization/InsuranceAgency, Service and Article JSON-LD, canonical rules, redirects, robots/sitemap and OG generation. Use environment-specific indexing; do not trust NODE_ENV to identify public production. Apply no-store to form responses. Keep secrets server-only.

## 5. Focused QA and repair
Run pack validation before integration; after integration run package install/build/typecheck, crawl route list once, inspect desktop/mobile home + one long service + contact + guide. Check all navigation and form states, reduced motion, missing slug and preview indexing. Re-run only affected checks after fixes. Preserve report and screenshots locally in repo QA output if feasible; don't invent measured scores. Do not perform a real customer email transmission as a test without an approved test destination.

## 6. Deliver the finished draft
Provide start/build commands, actual route inventory and QA_REPORT.md. Run production readiness evaluation without silently flipping approvals. List remaining launch-only inputs from launch-config. Provide precise activation steps, with no new strategy phase. Do not publish, buy services or change DNS in this task.

## Checkpoint format
At end of each stage update PROGRESS.md with completed items, modified files, actual test status, unresolved issue and exact next step. If usage expires mid-stage, a subsequent session can read this file plus CLAUDE.md. Do not reload the entire source appendix.

## Dependency budget
Required: next/react/react-dom/typescript and matching type packages. Use native CSS and SVG icons. Markdown may use a small trusted parser (react-markdown + remark-gfm) with raw HTML disabled. Add Playwright only if absent and needed for validation. Contact adapter uses server fetch to a configured trusted provider; no account provisioning in code. Do not add CMS, ORM, state manager, search engine or component-kit dependency for this scope.
