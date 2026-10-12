# Component and interaction contracts
## Header and navigation
Desktop >=1200: home wordmark; Who we are link; What we do link plus separate disclosure button; Insights & Resources link plus disclosure; Claims link; Contact primary pill. Do not use a link that also traps clicks as a menu button. Services panel full width, white, starts below sticky header, 5 service columns or 3+2 grid, one contact band. Resource panel links /insights and /resources. Show only real destinations. No language/search controls because there is one language and few pages.
Disclosure button has aria-expanded and aria-controls; open on click/Enter/Space; Escape closes and returns focus. Tab moves normally through links; hover may reveal only as an enhancement, with 150ms close delay and focus staying open. Close on outside click or route navigation. Header z-index 50, menu 60, backdrop 40. Never render a nested anchor.
Mobile/tablet menu button opens dialog-like panel below header; focus first link, inert underlying main/footer, trap focus inside menu, restore focus on close. Body scroll locks without jumping on close; Escape and close button work. Subgroups expand with real buttons. On route change close and remove lock/inert. Resize to desktop also clears modal state.

## Hero/media
HomeHero accepts title parts, intro, CTA and three asset IDs. ArticleHero and ServiceHero use one image each. Width/height/aspect-ratio reserved before load. Home image loaded eagerly with responsive sizes; below-fold images lazy. Alt for decorative hero backgrounds empty; meaningful card images describe the scene succinctly. Avoid redundant title repetition. On media failure display supplied navy background and full text, no broken-icon gap.

## Shared section contracts
| Component | Required inputs | Behaviour |
|---|---|---|
| EditorialSplit | heading, paragraphs, assetId, imageSide, crop | h2; intrinsic height; no hidden overflow on text |
| FactTiles | approved or preview facts | 5 tiles, responsive; no counters |
| NumberedSolutions | exactly 3 cards | 01–03; whole card one link; accessible name includes title |
| ServiceGrid | 5 services | uses title, summary, image, URL from services.json |
| ConsiderationGrid | title + body array | text tiles, no implied policy benefit guarantee |
| ProcessSteps | ordered steps | semantic ol; 2 columns desktop /1 mobile |
| FAQ | question/answer pairs | native details/summary; answers exist in HTML; multiple may open |
| RelatedServices | service IDs | links resolve from registry; no current service duplication |
| GuideCards | article IDs | category, title, excerpt; read time calculated, no false date |
| LocationPanel | region + approved contact | map omitted; no global network graphic |
| ContactCTA | heading, body, topic | /contact?topic=...; robust without JS |
| ResourceFilter | categories and guides | buttons with aria-pressed; immediate client filter; count aria-live polite |

All major section IDs from page-compositions must exist. Main page has one h1. Components receive title text, not heading-level HTML strings. Orange terminal punctuation should not create duplicate full stops.

## Listing states
Resources shows all 5 guides by default. Filter options: All, Property, Marine, Life & Protection, Medical & Dental, Claims. Do not show a Commercial filter with no matching article. Match category IDs exactly. No pagination/search until needed. Filtered URLs use ?category=slug, always canonicalise to /resources; unknown value -> All. Empty state (future filters only): “No guides in this category yet. View all guides.” All guide detail URLs are /insights/<slug>. Insights uses a featured guide and four further cards; no different article body copies.

## Contact states
Initial: required labels, privacy collection notice, submit or preview button determined by mode. Client-invalid: summary linked to first invalid input, individual error aria-describedby, focus summary; keep values. Submitting: disable duplicate submission, text “Sending…”; spinner optional with accessible status. Success only after server acknowledgement of configured transport; then show receipt reference, clear message data and allow another enquiry. Provider-accepted status is not proof recipient has read message. Failure: keep values, retry/manual contact guidance. Network timeout: uncertain-delivery wording; no automatic duplicate retry. Rate-limited: show retry interval.
Preview: call no external endpoint and show “Preview only — your details have not been sent.” Form field labels and validation remain fully usable. Never emit fake successful delivery.
No approved phone/email available: render contact form preview and “Contact details will be confirmed before launch” in preview-only utility text. Production either has an approved live form or confirmed phone/email contact-only block. Avoid dead mailto:# or invented emails.

## Utility states
404: “We couldn’t find that page.” Body: “The address may have changed. Explore our insurance services or contact Bright Fortune for help.” CTA /what-we-do and /contact. Actual HTTP 404, no home redirect. error.tsx: concise failure message + retry button; no stack trace. Legal pages have restrained 48px title and readable body; draft badge shown only in preview. Scroll-to-top is optional, standard anchor if used.
