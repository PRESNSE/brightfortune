# Visual system — authoritative revision
## Observed vs specified
Live BMS desktop homepage inspected at approximately 1348×926 viewport on 12 October 2026 HKT. Observed: white sticky navigation; central triptych media hero; Figtree; hero computed 144px / 149.76px / 500; section H2 72px / 83.52px / 500; ink rgb(33,55,82); orange terminal punctuation; pale neutral splits; capsule-cropped editorial media and curved coloured fact tiles. The complete responsive system below is a deliberate Bright Fortune implementation, not recovered BMS source. Header menus, mobile breakpoints and exact animation timelines have not been measured on BMS.

## Brand treatment
Use supplied original typeset Bright Fortune wordmark, navy on white, white on navy; orange square is punctuation. No BMS logo or implied affiliation. This wordmark is a working draft until the company supplies its official logo. Do not spend the build session inventing a new identity. Maintain colour placement even if the logo is later replaced.

## Desktop composition
Page background #f4f4f4. Sticky white top bar 76px, horizontal padding 40px at 1440. Main container 1320px max with 64px side padding at 1440 (use border-box). Headlines 500 weight. Body 18px /1.6 in muted grey. Headings are navy, with the final punctuation styled orange as an aria-hidden decorative span (spoken text remains natural).
Home hero: height min(780px, calc(100svh - 76px)), minimum 620px desktop. Three equal full-height media columns, no gutters; each object-fit cover. Centre image architecture, left harbour, right workplace. Overlay rgba(0,0,0,.40) with lower gradient. H1 “Look ahead.”: centred words separated visually by a thin 92px rule, max width 1220px, 144px at reference width, line-height 1.04. Rule decorative, no em dash in accessible name. Subhead 24px/1.35 width 760px; pill outline CTA below, 52px height. Avoid a long four-line headline here.

Capsule editorial: two 50% panels, left #eeeeee, right #f4f4f4. Media 360×500 within left panel, radius 180px, with optional decorative circular label omitted by default. Right has 64px inset, H2 72px, body 18px, two paragraphs. Section 780px approximate desktop, content determines final height. Do not crop text or fix content height.
Facts: three columns first row, two second row (second-row items span half). Four corners are not all rounded: apply large top-left or bottom-right 96px corners selectively. Use burgundy/peach, slate/white, powder/navy, rust/white, green/mint. Fact type 80px desktop; labels 16px. No unverified statistics. Every tile displays the exact approved/provisional fact text, not false premium volume or retention rates.
Alternating split: 50/50 text/media, 660–780px minimum on desktop with intrinsic height for text, 64px text inset, large media full bleed, no drop shadow. Location: replace global map with 50/50 harbour image and Hong Kong contact panel.
Solutions: three tall columns with number at top, 4:3 photo, 32px heading, 18px body, arrow link; hairline divisions, no shadow. Marquee: navy background, two rows 84px desktop, alternate movement, 50 seconds per content cycle, visible Pause control.
Footer: navy, white/pale text, oversized 64px CTA, then 4 columns. Footer can be long; preserve readable links at 16px. Do not copy BMS's UK regulatory footer.

## Internal page heroes
Service hero: background pale grey, breadcrumbs above H1; 45/55 split text/photo on desktop, title 88px with normal wrapping, intro 22px. Photo aspect 4:3. Narrow titles may remain one line; medical-dental and commercial-general wrap naturally. Utility/contact: 72px heading with 50/50 form/photo below. Article: 72px title max 1000px, summary 24px max 850px, then 16:9 image and 760px body. About: full-width photo with left-aligned title 96px; unlike home no triptych.

## Responsive values
| Token | >=1200 | 768–1199 | <768 |
|---|---|---|---|
| Nav | 76px | 72px/mobile menu | 68px/mobile menu |
| Side padding | 64px content / 40px nav | 32px | 22px |
| Hero H1 | clamp to 144px | 96px | clamp(48px,13vw,64px) |
| H2 | 72px | 56px | 40px |
| Body | 18px | 18px | 17px |
| Section padding | 120px | 88px | 64px |
| Service cards | 3 | 2 | 1 |
| Fact tiles | 3+2 | 2+2+1 | 2+2+1 |

At 375px home hero: minimum 640px, two-line H1, decorative rule hidden, three 33.3% photographic strips maintained behind text; text fits 331px. On <=359px use 46px headline and automatic wrapping. Never force desktop whitespace with non-breaking strings. Capsule media becomes max-width 280px, 350px tall above text. Split sections become media then text except claims process (text first). Full-width image remains 4:3; use crop focal points in asset manifest. Facts final tile spans full width. Detail content never requires horizontal swipe. Tables can scroll within their own labelled wrapper.

## Motion
Default CSS transition 220ms; arrow translateX(4px); photo hover scale 1.025 over 600ms; optional reveal 700ms ease cubic-bezier(.22,1,.36,1), 24px movement. Content is visible by default and only animated once enhancement attaches; no blank SSR page. No scroll hijack, custom cursor or parallax. Reduced motion removes drift, marquee and transforms. The marquee has a keyboard-accessible pause toggle and duplicate rows hidden from assistive technology. Stills are the launch default; optional licensed video must have a poster, pause control and reduced-motion fallback.

## Assets and accessibility
Photos are illustrative, never labelled as Bright Fortune staff, office or clients. Text overlays need minimum 4.5:1 contrast, controls 3:1. Orange used only decoratively or with navy text on pale orange; never small orange copy on white. Focus is 3px navy on light or pale mint on dark, offset 4px. Touch areas >=44px. No all-caps paragraphs. Site language en-HK. Preserve zoom at 200%.
