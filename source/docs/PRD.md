# Product requirements
## Outcome
A complete English-language insurance brokerage website for Bright Fortune (Far East) Limited, suitable for stakeholder review and near-term public launch after factual/operational sign-off. Reproduce the BMS editorial system closely while reflecting a Hong Kong brokerage's actual offering. The primary conversion is a qualified enquiry; the secondary is claims/contact access. No online sale or quotation is performed.

## Audiences and journeys
| Audience | Entry | Key questions | Next action |
|---|---|---|---|
| Hong Kong business owner | Commercial, Property, Marine | What information matters? What can be discussed? | Topic-prefilled enquiry |
| Individual / family / expatriate | Life, Medical | How do policy structures differ? What should I compare? | Read guide, request discussion |
| Existing policyholder | Claims | What should I do and prepare? | Existing insurer instructions, then broker contact |
| Researching visitor | Guide / search | Concise explanation with limitations | Related service |
| Verifying company | About / Contact | Identity, history, location, regulation | Verified contact / register |

## Scope — all are required in draft
21 content routes in routes.json: home, about, solutions hub, five services, claims, contact, resources, insights, five guide pages, privacy, terms, regulation/complaints and cookies. Also not-found state, robots.txt, sitemap.xml, favicon and generated social image. Insights is a curated editorial landing page linking the same canonical guides, not duplicate article routes or fictional company news.

Shared header with four primary destinations and two direct actions; full-width services disclosure; mobile full-screen menu; footer; breadcrumbs; five reusable page templates; non-invasive motion; accessible FAQ; resources category filtering; contact topic prefill; print styles for guides. All supplied copy should render without lorem ipsum, missing cover cards or empty nav pages.

## Fixed scope exclusions
No CMS administration, customer portal, binding quotes, premium calculations, document uploads, live chat, automatic marketing enrolment, invented testimonial/awards, careers vacancy listings or unverified global office map. No Chinese switch until real translated pages exist. No scraping BMS media. No PDF button without a real PDF. No blog production pipeline required at launch.

## Conversion and trust
CTA hierarchy: a service-specific conversation first; guide second; claims link consistently available. CTA destination is /contact?topic=<service-slug>. Claims links use topic=claims. Navigation Contact and Speak with us may share the same route but use one prominent CTA only. Never obstruct emergency insurer instructions with a form.

## Content model
JSON is the canonical source for reusable and page copy; Markdown is canonical for guides/legal bodies. UI strings live in site.json. launch-config.json contains factual and operational approvals. There is no runtime CMS. Preserve IDs and slugs for future migration. Field-level provenance is internal, not UI copy. The bundle's authored content is draft copy, not company-approved policy advice.

## Delivery definition
All routes render on server with meaningful visible text; links resolve; content and asset imports are valid; build/typecheck pass; representative mobile/desktop pages are inspected; preview indexing and form transmission are safe by construction; production activation requirements are documented. A downloadable pack does not constitute running-app verification. The developer must record the actual results in QA_REPORT.md.

## Nonfunctional requirements
WCAG 2.2 AA as implementation target; no focus loss or keyboard traps. Respect reduced motion. Real-user goals LCP <=2.5s, INP <=200ms, CLS <=0.1 at p75, with lab checks used as diagnostics rather than proof. Server-render articles, local font, no mandatory video. Primary mobile hero media target <=250KB, desktop <=450KB after derivative generation. Avoid large third-party script bundles.

## Source priority / conflict rule
Current user request > canonical content and launch settings > current design/PRD/UX docs > current evidence notes > original uploaded blueprint. Prefer verified company facts over competitor claims. Design values marked observed describe a single desktop inspection; other values are committed design choices. If two new files conflict, favour routes.json for URLs, site/services/articles for words, tokens.css for values and launch-config for approvals; record the correction.
