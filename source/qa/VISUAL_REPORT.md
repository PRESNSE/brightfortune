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
