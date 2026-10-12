# Visual correction validation — 12 October 2026

Base repository commit: `e45fd38b4c19ab431caaa1de93d5af3176c21516`.

| Check | Result | Evidence |
|---|---|---|
| Locked dependency install | PASS | npm ci --ignore-scripts |
| Production build | PASS | npm run build; 24 generated entries, 21 content routes |
| TypeScript | PASS | npm run typecheck |
| Focused preview HTTP checks | PASS, 34/34 | qa/results/visual-http.txt |
| All 21 content routes, one H1, expected titles/descriptions | PASS | HTTP checks |
| Internal links, 404s, legacy redirects | PASS | HTTP checks |
| Preview noindex, empty sitemap, no public schema/canonical | PASS | HTTP checks |
| Preview enquiry endpoint fails truthfully with 503 | PASS | HTTP checks |
| Live BMS desktop measurement | DONE | Main, About, What we do, Insurance solutions; 1363×936 browser viewport |
| New rendered desktop/mobile comparison | BLOCKED | Cloud browser cannot reach local workspace server; GitHub connector rejects repository writes with 403 Resource not accessible by integration, so no branch preview could be published |
| New mobile overflow/menu/interaction screenshots | NOT RUN | Responsive CSS exists; no new rendered mobile validation is claimed |
| Public-fixture and mock-live form suite | NOT RERUN | Those implementations and launch settings were not changed; baseline report is historical |
| Lighthouse / real-user performance | NOT RUN | No score claimed |
| Branch push / PR / deployment | BLOCKED | No GitHub write or live deployment succeeded |

## Reproduce

Run `npm ci`, `npm run build`, `npm run typecheck`, then `npm run start -- --hostname 127.0.0.1 --port 3105`.
In another terminal run `PREVIEW_PORT=3105 node qa/checks.mjs --preview-only`.
The full existing suite remains available without --preview-only when its three fixture servers are running.

For a temporary responsive review utility, copy `qa/visual-review.html` into `public/`, open `/visual-review.html` on the preview, and remove the public copy after inspection. This file is not shipped in public by default. Inspect home, service, about, contact and resources at 390, 320, 768, 1024 and desktop widths. Review menus, map disclosure, marquee pause/reduced motion, FAQ, and contact validation. The existing UI tests still need an approved browser environment; older mobile-spec expectations must be updated to the new measured design before being treated as acceptance gates.

## Scope and remaining fidelity gaps

The patch corrects homepage composition, shared navigation/footer and hero templates. It does not constitute a verified 1:1 match across every route. Replacement stock photography, a static film slot, BF-specific service labels and the absence of actual awards remain deliberate differences. Mobile BMS geometry has not been measured. After write access is restored: publish this exact patch on a branch, obtain the Vercel preview, complete screenshot comparison and correct remaining geometry before requesting merge.


## Integration and browser verification — 12 October 2026 (second session)

Integration: `brightfortune-visual.patch` was applied to the branch (base commit e45fd38 is not in this repository's history; `git apply --check` failed only on the pre-existing identical `AGENTS.md`, which was excluded). The applied tree was verified identical to the bundled `source/`; the redundant `source/`, patch and bundle instruction files were then removed so only one application exists.

| Check | Result |
|---|---|
| `npm ci`, `npm run build`, `npm run typecheck` | PASS |
| `PREVIEW_PORT=3105 node qa/checks.mjs --preview-only` | PASS, 34/34 (after fixes too) |
| Playwright/Chromium at 1363, 768, 390, 320: horizontal overflow on all 21 routes | PASS after fixes (only the table inside its own scroll wrapper scrolls) |
| Images across all routes (eager-loaded) | PASS, none broken |
| Desktop dropdown open / Escape closes / focus returns; mobile menu open / Escape | PASS |
| Map disclosure (both 1363 and 390), FAQ details, resource filters | PASS |
| Contact: empty submit shows errors; valid preview submit states nothing is transmitted | PASS |
| Reduced-motion: marquee stops; preview robots noindex | PASS |

Fixes made: (1) 768px home map overflowed by ~245px, so the card now stacks under the map from 768–1099px; (2) 320px header menu button overflowed by 9px; (3) service "Related areas of work" cards inherited the home-service grid `span 2` rule and rendered as huge blank boxes, so the rule is scoped to `.sgrid`.

NOT done: **side-by-side comparison with bmsgroup.com.** The sandbox egress proxy rejects www.bmsgroup.com (403 CONNECT), so BMS could not be loaded and no BMS measurement was repeated; the measurements in `docs/VISUAL_FIDELITY.md` from the earlier session are the only reference data. Mobile (390/768) BMS geometry therefore remains unmeasured; no claim of a verified mobile match is made. No screenshots are committed. Interior service/About/Claims/Resources/Contact modules were reviewed only as rendered Bright Fortune pages, not against BMS equivalents.

Remaining differences: stock photography; static film slot; Commercial & General and Property & Fire services share one image; no awards band (service principles instead); no hero video.
