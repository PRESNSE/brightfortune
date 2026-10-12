# Visual fidelity correction — 12 October 2026

This document supersedes the original HTML mockup and earlier visual assumptions. The task is to reconstruct the measured composition of the current BMS site while retaining Bright Fortune's identity, actual offerings and factual approval controls. Do not rebuild from the old mockup.

## Reference and observations

Reference URLs inspected: https://www.bmsgroup.com/en, /en/who-we-are, /en/what-we-do and /en/what-we-do/insurance-solutions. Desktop browser viewport: 1363 × 936; page content width excluding scrollbar: 1348px. These are desktop observations, not inferred mobile measurements.

| Component | Observed reference | Implementation target |
|---|---|---|
| Header | 72px, white, distributed navigation | 72px; real Bright Fortune destinations, no fake language or office selectors |
| Home hero | 710px; three equal media panels; centered 144px heading; 120px fine rule; 24px intro | Same geometry, Bright Fortune words, locally bundled replacement imagery |
| Capsule split | 796px; equal columns; 314 × 523px capsule in a 360 × 600px text-path envelope | Same capsule proportions; original phrase; no animation-dependent content visibility |
| Fact section | 400px overall, two 200px rows; overlapping thirds; 96px curved joins | Same slabs and joins; BF 1995 / 1983 / HK / Personal / Connected content |
| Full-image split | 796px; 64px text gutters | Match at desktop, auto-height on smaller screens |
| Section introductions | Equal columns, 72px gap, 72px title, body opposite | Use EditorialIntro rather than a full-width stacked heading |
| Geographic panel | Large world map and rounded regional card | Public-domain map, only Hong Kong marker, real contact link; no invented office network |
| Solutions | ~400 × 650px images, 80px middle stagger, column dividers, 32px labels, outline pills | Match image heights/stagger/dividers and button treatment |
| Brand feature | Intro + large 16:9 film | Restore full-sized media slot with a static image; no fake play control or missing video URL |
| Expertise marquee | Paper background, large outlined text capsules, two directions | Replace solid navy band; retain pause and reduced-motion support |
| Discovery | Eight image/colour cells, four columns × two rows, ~418px row height, 128px curves | Four corresponding pairs for approach, claims, guides and contact |
| Recognition band | Heading + horizontal awards | Explicit adaptation: four real service principles, no fabricated award badges |
| News | Large image-led editorial columns | Existing real draft guides, 420px desktop image height, unboxed text |
| Footer | Rust contact band, curved upper-right, separate deep-blue body | Distinct 279px minimum contact band; company and legal menus |
| Inner image hero | 612px, large left title, rust intro block with 128px upper-right corner | Applied to About and What we do |
| Insurance solutions hero | Left editorial title, right 2×2 curved colour/photo puzzle | Shared service hero adapted for all five BF services |

## Deliberate differences, not completion claims

- BF is a Hong Kong broker. Keep its actual services and identity; don't turn it into a global BMS office network.
- Stock photographs are illustrative, not portraits of BF employees or clients. BMS's commissioned photographs and video have not been copied. The hero remains a still triptych; the film slot remains a static image until BF-owned/cleared footage is supplied. These prevent a literal pixel-identical result.
- Brief copy was edited to match editorial line density and explain the existing offering, not to introduce new insurance services or proprietary competitor claims.
- Mobile styles are implemented responsively; only viewports explicitly listed in qa/VISUAL_REPORT.md have been visually checked. Do not claim a mobile BMS match without inspecting that reference viewport.
- Service-body content and all routes remain intact. This correction is strongest on the homepage, navigation/footer, and shared hero system; it does not assert that every interior module has been individually measured against a BMS equivalent.

## Validation procedure

1. Build and typecheck; validate all registered routes and internal links.
2. Compare rendered page and BMS at identical viewport dimensions after fonts/images settle. A passing build is not visual evidence.
3. Check header and hero, capsule, facts, solutions, discovery and footer as individual compositions. Target measured geometry; do not use a fabricated percentage-similarity score.
4. Check narrow layouts, overflow, readable cards, map disclosure, keyboard menu/escape, resource filters, FAQ and reduced motion. Preserve preview noindex, form truthfulness and the existing launch settings.
5. Recheck affected components after any correction. Record actual results and limitations in qa/VISUAL_REPORT.md.

## Follow-on instructions for Claude

Work from this branch's source. Do not revert to design/design-reference.html. Read this document, the QA report, src/styles/{tokens,site,home}.css and the component being changed. Patch measured differences in small groups; render each group. Keep source assets local, update provenance for replacements, and avoid new dependencies unless a concrete missing function requires one. Preserve the current content routes and approval switches. No restart or new planning phase is needed.
