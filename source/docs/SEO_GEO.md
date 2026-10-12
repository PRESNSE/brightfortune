# SEO and answer visibility implementation
## One intent per destination
`content/routes.json` maps every route to its purpose, title and description. Home owns the broad Hong Kong broker/entity intent. The solutions hub is a directory; each service owns a distinct service enquiry. Guides answer comparison/preparation questions and link to the corresponding service, not compete with it through duplicate service copy. Resources is a browsable library; Insights is a curated editorial entry. Both link to one canonical guide body under /insights/<slug>.

No fabricated keyword volume or ranking forecast is supplied. These are sensible intent targets, not completed search-demand measurements. Use natural Hong Kong context in title, intro and contact entity information. Do not repeat place names in every heading or create districts with no meaningful unique service/location content.

## Server and metadata requirements
Render all core text, links, FAQ answers and guide content on the server. The site must remain readable without client JavaScript. Set <html lang="en-HK">. Exactly one meaningful H1 per page. H2 section headings, H3 subordinate topics. Use real anchors for navigation, not click handlers on divs. Use descriptive labels such as “Discuss marine insurance”, not five indistinguishable “Click here” links.

Supply unique title and description from route data; a title pixel preview is useful, but there is no fixed SEO character guarantee. Do not add brand twice with a template suffix. Absolute canonical uses approved origin + normalized route, no UTM/filter/topic/query parameters. Root canonical ends in /. Other routes have no trailing slash. Query variants point to their underlying index/contact route; do not canonicalise a guide to a service page.

Generate OG/Twitter image 1200×630 using original Bright Fortune wordmark, navy/pale background and a concise title; bundle local image derivatives. Use summary_large_image card. No competitor images/logos. Add favicon and apple touch icon from original initials/approved mark. Open Graph locale en_HK. Do not invent social profile URLs.

## Indexing modes
Default preview is noindex,nofollow with X-Robots-Tag on HTML and explicit robots metadata. Preview sitemap returns an empty urlset. robots.txt must allow crawling to see noindex (Disallow is not a substitute for noindex); private host authentication is preferred to keep an unpublished draft private. Noindex alone is not access control.

Public indexing requires explicit deployment mode, the production hostname matching approved canonical origin, and all release gates. A Vercel preview build often has NODE_ENV=production, so it must not trigger indexing. Generate index/follow only for approved marketing/guide routes. Utility legal routes remain noindex,follow by design and are omitted from sitemap. Form API noindex + no-store. Real 404s remain 404. Unknown service/article slugs must not generate empty 200 pages.

Sitemap includes only canonical, approved, indexable 200 pages. lastmod only reflects an actual content revision date; omit if unknown. Do not emit the build date as every page's lastmod. Keep pages internally linked even if not in sitemap. No robots-blocked CSS or JS. No doorway pages.

## Structured data
One entity ID `<origin>/#organization`, type InsuranceAgency after company approval; this is a local-business/organisation subtype, not a second competing identity. Name is Bright Fortune (Far East) Limited; alternateName Bright Fortune; url origin; approved logo; areaServed Hong Kong. Include foundingDate 1995 after history approval, and approved telephone/address/email only. Do not include unverifiable geo coordinates, opening hours, priceRange, reviews, aggregateRating or insurer affiliations. Without public approvals omit business JSON-LD in preview.

WebSite ID `<origin>/#website`, publisher entity ID, language en-HK. No SearchAction because there is no site-search endpoint. BreadcrumbList on internal pages: Home -> What we do -> service; Home -> Insights -> guide; Home -> utility for single-depth pages. Breadcrumb text matches visible labels.

Service pages: Service node with @id route/#service, name, serviceType, provider entity reference, areaServed Hong Kong and url. These describe broking enquiries, not insurance-policy offers; do not add price, availability, insurer underwriting promises or Product ratings.

Guides: Article with headline, description, canonical mainEntityOfPage, image, publisher entity, and organisation author only after company adoption. Include datePublished/dateModified only when recorded and visibly consistent. No invented professional reviewer. FAQs remain useful visible content; do not promise FAQ rich results. FAQPage markup is optional and not part of default because it adds no necessary capability here. JSON-LD must match visible content and escape '<' as \u003c.

## Image and performance work
Use local images with meaningful alt text when informative and empty alt for decorative crops. Reserve image dimensions. Generate hero/card/mobile derivatives in WebP or AVIF, keep originals for traceability. Use responsive sizes and avoid sending all full-size hero originals to mobile. Local Figtree variable font, swap display, preload one file only. No Google Fonts runtime fetch. Bundle no maps/video embeds/pixels by default. Static server components wherever possible; client code limited to menus, filter, form and motion enhancement.

Measure mobile home, service and guide once using available tooling. Performance targets: LCP <=2.5s, INP <=200ms, CLS <=0.1 at p75; lab runs are diagnostics and cannot certify field data. Lighthouse 90+ is a target under stated conditions, not a promised outcome. Do not let below-fold animations hide text from SSR or trigger layout shifts.

## GEO / answer-friendly content
Google states that its AI features rely on normal search eligibility and do not need special AI markup. No guarantee of citations or inclusion follows from adding schema. This pack therefore emphasises readable text, explicit company identity, clear short answers, comparison tables, practical lists, source provenance and links between guides and services. There is no hidden “AI instruction”, prompt injection, fabricated citation, mass-generated location page or keyword list.

Each supplied guide begins with a clear summary and uses answer-oriented headings. Preserve the limitations surrounding policy coverage. Publish only with business review; add real author/reviewer details when available. Keep important answers in HTML, not image text or downloads. `llms.txt` is optional experimental infrastructure and is deliberately omitted from the default; it is not an established substitute for crawlability, quality or indexing. Do not block ordinary search crawlers in production without an explicit business decision. Search discovery and model-training crawler policies are separate choices, not one universal switch.

## Off-page and post-launch work — concrete operations, not code claims
| Priority | Owner/action | Input | Completion evidence |
|---|---|---|---|
| Launch | Owner verifies Google Search Console domain; submit canonical sitemap | DNS/account access | Property verified and sitemap accepted |
| Launch | Owner verifies Bing Webmaster Tools | Account/domain access | Property and sitemap present |
| Launch | Company checks official regulatory entry and corrects discrepancies through appropriate channel | Verified corporate records | Current particulars consistent |
| Week 1 | Update eligible Google Business Profile with real company name, full accurate location/contact and category | Profile access; actual customer-facing operation | Approved listing fields and URL |
| Week 1 | Update existing genuine industry/company directory entries | Existing accounts and consistent contact facts | Exact live URLs logged |
| Month 1 | Seek relevant editorial mentions from genuine partners/associations where relationship exists | Relationship and permission | Live contextual mention/link |
| Ongoing | Invite genuine clients to leave honest reviews through allowed platform process | Company/platform-approved approach | Organic reviews; no incentives or fabricated quotes |

Do not create fake branches, virtual-office addresses, bought link schemes, self-awarded rankings, directory spam or retrospective “expert review” stamps. No external profile creation, submissions or outreach were performed by this pack. These account actions cannot be completed by uploading website files alone.

## Measurement without overbuilding
Default tracking off. If approved later, record enquiry_submit only after accepted server response, click_tel/click_email and guide_to_service clicks. Never send message text, email, phone, name or sensitive topics to analytics. Use low-cardinality service slugs. Review consent/storage arrangements before activation. Track Search Console impressions/clicks/indexing by service/guide, enquiry quality, and actual referral sources. Optional monthly fixed-question checks can log AI mentions/citations separately from traffic; do not treat personalised model output as a stable rank.

Sources: Google AI features https://developers.google.com/search/docs/appearance/ai-features ; migration https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes . Checked 12 October 2026 HKT. Other implementation choices above are project specifications, not claims that Google requires every item.
