# Acceptance and focused verification
Record PASS / FAIL / NOT RUN with evidence in QA_REPORT.md. This pack was checked as a pack, not as a built application.

## Route/content
All 21 routes in registry return their intended page; unknown service/guide returns 404. Each has one H1, nonempty unique title/description and its expected main content. Render all 5 complete guides; no generic repeating service filler. Internal anchor/link targets resolve. No lorem ipsum, TODO_CONFIRM, empty href, guessed email or fake download. Strip Markdown H1 when hero already contains title.

## Visual
Inspect home at 1440×1000 and 375×812, service at both, contact mobile, one guide desktop/mobile. Also check 320px width for horizontal overflow. Home has white header, centred three-panel hero, Figtree, capsule split, coloured curved facts and numbered solutions. No generic blue gradients/shields/rounded-card kit. Service has all S01–S12 modules with unique content. Media doesn't cover words; photo crops match focal notes. Compare to the current BMS reference and docs/VISUAL_FIDELITY.md; the original design-reference is superseded. Do not claim pixel equality with replacement imagery and copy. Footer links contrast and wrap cleanly.

## Interaction
Keyboard-only menu open/close/focus restoration; mobile body lock removed after close/route/resize; service menu link and disclosure separated; filters show correct counts; unknown filter returns All; FAQ operable; contact topic prefill validates allowed values. Reduced motion disables marquee/reveals; visible Pause button works. 200% zoom usable. No-JS content and links remain visible. Form enhancement is not required to read contact details.

## Forms
Preview input never sends to API or external network; direct API request rejected with explicit preview status. Live mock transport: invalid data 400, wrong origin 403, oversized body 413, type 415, rate limit 429, unavailable transport 503, uncertain result 504, accepted request 200 with reference. No success on timeout/failure. Duplicate request ID does not send twice. Client errors linked to fields and summary; fields preserved after failure. No PII in logs/analytics. Real delivery remains NOT RUN unless configured and tested with authorisation.

## SEO/security
Preview HTML noindex + header; robots not used to conceal noindex; empty preview sitemap. Public-mode test fixture emits correct canonical, sitemap, approved schema; unapproved actual config fails readiness. Legal pages noindex,follow and omitted from sitemap. No fake reviews/hours/prices/publication dates. JSON-LD parses and matches page. Dynamic slug 404. Legacy two redirects resolve without chain. Check no server credentials in client bundle. API no-store. No remote BMS requests or optional tracking.

## Build/performance
Install with lockfile; typecheck/build succeed. Inspect console/hydration once for tested pages. Reserve media size, check no horizontal overflow and no avoidable layout shift. Run one representative mobile performance audit if tooling exists; report test conditions and score, not a made-up field CWV pass. Do not repeatedly rerun all tests after minor copy changes; target the affected risk.

## Completion report
List actual implemented routes, commands and outcomes, inspected viewports, failed/unrun checks and launch-only inputs. Screenshots are evidence of the implementation, not substitutes for checking network form behaviour or metadata. No production-ready claim with unreviewed legal text or fake form transport.
