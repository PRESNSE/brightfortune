# Bright Fortune × BMS Website Replication Blueprint
## Build specification for a one-day VS Code rebuild

**Objective:** Rebuild Bright Fortune (Far East) Limited so that the public-facing experience is deliberately very close to the current BMS Group website in information architecture, section rhythm, editorial scale, media treatment, interaction style and component logic — while using Bright Fortune's own identity, facts, imagery and copy.

**Important implementation distinction:** Copy the *system*, not BMS's proprietary source code or paragraphs. The specification below translates the public BMS experience into original Bright Fortune components and copy. Exact CSS values on BMS are not publicly recoverable from the text crawl, so the dimensions below are implementation approximations designed to reproduce the same visual feel.

---

# 1. What BMS is actually doing

The current BMS website is not a collection of individually designed pages. It behaves like a modular editorial system.

The recurring pattern is:

1. Large media-led hero
2. Very short, high-confidence proposition
3. One substantial editorial statement
4. Proof / statistics / credibility
5. Large image or video-led explanatory section
6. Numbered or card-based service architecture
7. A horizontally animated or visually dense specialisms block
8. Supporting "discover more" cards
9. Claims / related expertise / people / location modules
10. Resource or news cards
11. Large, restrained footer

Service-detail pages repeat the same basic sequence with different content:

1. Product hero
2. Intro / market positioning
3. Why-us proof points
4. Sector or audience grid
5. Product / coverage grid
6. Features / approach
7. Related expertise
8. Claims module
9. Contact / key person module
10. Location / reach module
11. Resource download cards
12. Footer

This repetition is the key to finishing Bright Fortune quickly. Build the modules first. The individual pages then become data/configuration rather than unique front-end work.

---

# 2. Recommended Bright Fortune site architecture

## Primary navigation

**Logo**

**Who we are**

**What we do**
- Commercial & General Insurance
- Property & Fire
- Marine Insurance
- Life & Protection
- Medical & Dental

**Claims**

**Insights & Resources**

**Contact**

**Speak with us** — primary nav CTA

Do not add service lines that Bright Fortune cannot substantiate. The current public Bright Fortune site confirms general, fire, marine, burglary, property all risks, life, medical and dental insurance, together with term life, whole-of-life, trauma and income protection. Any additional class should stay out of production until the company confirms it.

## Routes

```text
/
 /who-we-are
 /what-we-do
 /what-we-do/commercial-general
 /what-we-do/property-fire
 /what-we-do/marine
 /what-we-do/life-protection
 /what-we-do/medical-dental
 /claims
 /insights
 /insights/[slug]
 /resources
 /contact
 /privacy
 /terms
 /regulation-and-complaints
```

If launch speed is critical, ship:
- Home
- Who we are
- What we do
- Marine
- Commercial & General
- Life & Protection
- Medical & Dental
- Claims
- Contact
- Resources

Then add articles later.

---

# 3. Proposed technology for the one-day build

This is a recommended Bright Fortune implementation, not a claim about BMS's exact front-end stack.

## Recommended

- Next.js App Router
- TypeScript
- Tailwind CSS
- Framer Motion for entrance, hover and marquee movement
- Next/Image
- Lucide icons only where absolutely necessary
- Static content objects in TypeScript/JSON for launch
- Optional Contentful/Sanity migration later
- Vercel deployment

Why: one developer can build the entire site quickly, reuse page templates, achieve strong performance and move content into a CMS later without redesigning the UI.

If the existing VS Code project is plain React, reproduce the same component structure there.

---

# 4. Suggested folder structure

```text
src/
  app/
    layout.tsx
    page.tsx
    who-we-are/page.tsx
    what-we-do/page.tsx
    what-we-do/[slug]/page.tsx
    claims/page.tsx
    insights/page.tsx
    resources/page.tsx
    contact/page.tsx

  components/
    layout/
      Header.tsx
      MegaMenu.tsx
      MobileMenu.tsx
      Footer.tsx

    hero/
      VideoHero.tsx
      ImageHero.tsx
      ProductHero.tsx

    sections/
      EditorialIntro.tsx
      StatementMedia.tsx
      StatsRail.tsx
      NumberedCards.tsx
      ExpertiseMarquee.tsx
      SolutionGrid.tsx
      WhyUs.tsx
      CoverageGrid.tsx
      FeatureList.tsx
      RelatedExpertise.tsx
      ClaimsPromo.tsx
      PeopleCards.tsx
      LocationPanel.tsx
      ResourcesStrip.tsx
      InsightCards.tsx
      CTASection.tsx

    ui/
      ArrowLink.tsx
      PillButton.tsx
      SectionEyebrow.tsx
      ResourceCard.tsx
      ContentCard.tsx
      FormField.tsx

  content/
    company.ts
    services.ts
    resources.ts
    insights.ts

  styles/
    globals.css
```

---

# 5. Bright Fortune visual system — designed to feel like BMS

## Core principle

The "BMS feel" comes less from decorative graphics and more from:
- very large typography
- confidence in empty space
- editorial photography
- sharp contrast between pale and dark sections
- restrained borders
- asymmetric grids
- subtle motion
- short copy blocks
- large media blocks
- repeated modules
- minimal iconography

Do not turn the site into a conventional insurance website full of shield icons, blue gradients, stock-photo handshakes, floating badges and boxed service tiles.

## Colour system

Use Bright Fortune branding, but keep the BMS tonal logic:

```css
:root {
  --bf-bg: #f3f0e9;          /* warm editorial off-white */
  --bf-surface: #ffffff;
  --bf-ink: #101820;         /* very dark navy/charcoal */
  --bf-muted: #667078;
  --bf-border: rgba(16,24,32,.18);

  --bf-brand: #173b57;       /* replace with confirmed Bright Fortune primary */
  --bf-accent: #cf9a36;      /* replace with confirmed Bright Fortune accent */
  --bf-accent-soft: #e8d7b4;

  --bf-dark: #0b1924;
  --bf-dark-text: #f6f3eb;
}
```

If Bright Fortune's existing logo has an established primary colour, use that instead of inventing a new one. The most important thing is maintaining the BMS-style contrast: dark ink, warm light surfaces, one controlled accent.

## Typography

Aim for an elegant grotesk / neo-grotesk.

Good web-safe or easily licensed substitutes:
- Inter
- Manrope
- Geist
- Helvetica Neue / Arial fallback

Use one family throughout. BMS's sophistication comes from scale and spacing, not decorative typefaces.

```css
--display-xl: clamp(4rem, 10vw, 9.5rem);
--display-lg: clamp(3.2rem, 7vw, 7rem);
--heading-xl: clamp(2.6rem, 5vw, 5.1rem);
--heading-lg: clamp(2.2rem, 4vw, 4rem);
--heading-md: clamp(1.75rem, 2.8vw, 2.8rem);
--body-lg: clamp(1.12rem, 1.45vw, 1.42rem);
--body: 1rem;
--label: .72rem;
```

Display line-height: 0.92–1.02  
Heading line-height: 1.0–1.08  
Body line-height: 1.5–1.65

Use slightly negative letter-spacing for display headings and modest positive tracking for uppercase labels.

## Layout

Desktop content max-width:
```css
max-width: 1520px;
margin-inline: auto;
padding-inline: clamp(24px, 4vw, 72px);
```

Preferred grid:
```css
grid-template-columns: repeat(12, minmax(0, 1fr));
gap: clamp(16px, 1.6vw, 28px);
```

Section vertical padding:
```css
padding-block: clamp(84px, 10vw, 180px);
```

BMS-style pages should feel intentionally long and spacious.

## Cards

Avoid small rounded SaaS cards.

Preferred:
- border-top or hairline border
- square or 2–6px radius
- full-bleed image
- large text
- simple arrow link
- no shadows

## Image ratios

Hero:
- desktop 16:9 or viewport-cover
- mobile 4:5

Editorial split:
- 4:5 / 3:4

Service cards:
- 4:3

Insight cards:
- 16:10 or 4:3

Portraits:
- 4:5

---

# 6. Motion and interaction specification

The site should feel active but never "tech startup."

## Global entrance motion

On scroll:
- opacity 0 → 1
- translateY 24–40px → 0
- duration 0.7–1.0s
- easing `[0.22,1,0.36,1]`
- stagger children by 60–100ms

## Hero media

- autoplay muted loop playsInline
- no visible video controls
- poster image mandatory
- subtle dark overlay for legibility
- optional 1.02 → 1 scale drift over 12–18s

## Header

Desktop:
- transparent over hero
- light text over dark hero
- after scroll: solid or translucent light surface with dark text
- height about 82–92px
- thin border appears after scroll

Mega menu:
- full-width panel
- not a tiny dropdown
- 2–4 columns
- large category names
- one editorial image or highlighted contact card

Mobile:
- full-screen menu panel
- large link typography
- close icon
- body scroll locked

## Arrow links

Simple text + arrow.
On hover:
- arrow moves 4–6px right
- text opacity/underline transition
- 180–250ms

## Marquee

Service names move horizontally at low speed.
- pause or slow on hover
- respect prefers-reduced-motion
- repeat content seamlessly
- oversized typography

## Images

Hover:
- image scale 1 → 1.025
- 500–700ms
- overflow hidden

## Counters

Do not animate fake statistics from zero unless numbers are confirmed. Static numbers are cleaner.

---

# 7. HEADER — direct BMS-style adaptation

## Desktop structure

Left:
- Bright Fortune logo

Centre/right:
- Who we are
- What we do
- Claims
- Insights & Resources
- Contact

Far right:
- "Speak with us ↗" or circular arrow CTA

Optional:
- EN / 繁中 language control only if a Chinese version will actually exist.

## Mega menu: What we do

Column 1
**Commercial & General**
General insurance solutions for businesses, organisations and individuals.

Column 2
**Property & Fire**
Cover designed around physical assets, premises and property-related exposures.

Column 3
**Marine**
Marine insurance solutions arranged around your operations and exposures.

Column 4
**Life & Health**
Life, medical, dental and protection solutions for individuals and groups.

Bottom row:
**View all solutions →**

Do not create fake subsectors simply to make the menu look fuller.

---

# 8. HOMEPAGE — section-by-section build spec

## H01 — Full viewport hero

### BMS role
Extremely short brand statement over full-screen video/media.

### Bright Fortune version

**H1:**  
# Risk changes. Good advice keeps you ready.

**Subhead:**  
Independent insurance broking from Hong Kong, built around your risks, priorities and people.

**CTA:**  
Who we are →

Secondary optional CTA:
Explore our expertise →

### Media
Use one atmospheric Hong Kong / Asia risk-business sequence rather than generic insurance imagery:
- Victoria Harbour / port
- cargo/logistics movement
- commercial property skyline
- close-up client/broker interaction
- ships / marine operations
- understated office scene

10–15 second muted loop.

### Build
`<VideoHero />`
- min-height: 100svh
- text aligned lower-left
- headline max width 8–10 characters per line visually
- bottom scroll cue

---

## H02 — Editorial company statement

### Bright Fortune copy

**Heading:**  
## We get closer to the risk.

**Body:**  
Bright Fortune is an independent Hong Kong insurance broker helping clients navigate general, property, marine, life and health insurance with advice shaped around their circumstances — not a standard package.

For more than three decades, we have combined market knowledge with the kind of personal attention that is difficult to deliver at scale.

### Layout
12-column:
- image/video occupies columns 1–6
- heading/body columns 8–12
- large vertical spacing
- no boxed background

---

## H03 — Credibility / facts rail

Do not fabricate corporate-scale BMS-style metrics.

Use only robust facts:

**1995**  
Established in Hong Kong

**1983**  
Founder's insurance experience began

**30+ years**  
Serving local and expatriate clients

**Independent**  
Advice built around client needs

Potential fifth metric:
**Hong Kong**  
Local market knowledge

Before launch, replace any date wording if company records require a different phrasing.

### Design
5 horizontal stat blocks desktop.
2 columns mobile.
Large number, tiny label.
Hairline separators.

---

## H04 — Independence statement / media block

**Heading:**  
## Independent thinking. Personal accountability.

**Copy:**  
Insurance works best when the broker understands the detail behind the policy. We take time to understand the exposure, compare appropriate options and remain involved when the cover needs to perform.

**CTA:**  
How we work →

### Visual
Large editorial image of a real broker/client setting, architecture, port or city detail. Do not use staged handshake photography.

---

## H05 — "What we do" lead

**Eyebrow:** WHAT WE DO

**Heading:**  
# Clear advice across the risks that matter.

**Intro:**  
Our work spans commercial and general insurance, property, marine, life and health protection. The starting point is always the same: understand what needs protecting, then structure the right response.

---

## H06 — Numbered three-card solutions

This deliberately mirrors the rhythm of BMS's numbered solution modules.

### 01
**Commercial & General Insurance**

From general business cover to fire, burglary and property all risks, we help clients structure protection around the realities of their operations and assets.

Explore →

### 02
**Marine Insurance**

Marine risks demand specialist attention to movement, geography, value and responsibility. We help clients navigate appropriate marine insurance solutions for their circumstances.

Explore →

### 03
**Life, Medical & Protection**

From term and whole-of-life policies to medical, dental, trauma and income protection, we help clients compare protection options with clarity.

Explore →

### Layout
Each card:
- huge `01`
- image
- heading
- 2–3 lines
- arrow link
No floating icon.

---

## H07 — Specialisms marquee

### Heading
## Protection across changing circumstances.

### Marquee items
Property All Risks  
Fire  
Marine  
General Insurance  
Burglary  
Term Life  
Whole of Life  
Medical  
Dental  
Trauma  
Income Protection

Use exactly confirmed products only.

### Interaction
Two alternating marquee rows:
- row 1 left
- row 2 right
- very large text
- muted photographic/video background or dark solid background

---

## H08 — Discover more grid

BMS uses this area to expose adjacent company content. Bright Fortune should retain the exact principle.

### Card 1 — Our approach
**Heading:**  
## Advice that starts with listening.

**Body:**  
We begin with the risk, not the product.

CTA: Who we are →

### Card 2 — Claims
**Heading:**  
## Cover matters most when something goes wrong.

**Body:**  
We remain involved when a claim needs attention, helping clients navigate the process with clarity and continuity.

CTA: Claims support →

### Card 3 — Resources
**Heading:**  
## Practical information, without the jargon.

**Body:**  
Concise guides to common insurance questions, products and decisions.

CTA: View resources →

### Card 4 — Contact
**Heading:**  
## Start with a conversation.

**Body:**  
Tell us what you are trying to protect and we will point you in the right direction.

CTA: Speak with us →

Design: 2x2 editorial cards, each large enough to feel like a section rather than a tile.

---

## H09 — Optional trust / recognition module

Do not imitate BMS's award carousel unless Bright Fortune has real awards or recognised insurer relationships that can legally be displayed.

Better launch version:

**Heading:**  
## Built on long-term relationships.

Use:
- confirmed insurer logos only with permission, OR
- a simple client-centric statement
- no fabricated testimonials

If no assets exist, omit this section entirely. Empty prestige is worse than no prestige.

---

## H10 — Insights / resources

**Heading:**  
## Useful perspective for a changing risk landscape.

Show 3 cards:
1. Understanding Property All Risks
2. A practical introduction to Marine Insurance
3. Choosing between Term Life and Whole of Life

Metadata:
`GUIDE` / date / `4 min read`

These can launch as HTML articles before PDFs are ready.

---

## H11 — Footer

Dark full-width footer.

Top:
# Start with the right conversation.

Button:
Speak with us →

Then grid:

**Bright Fortune**
Short statement.

**Navigate**
Who we are  
What we do  
Claims  
Resources  
Contact

**Expertise**
Commercial & General  
Property & Fire  
Marine  
Life & Protection  
Medical & Dental

**Contact**
`{{CONFIRM_ADDRESS}}`  
`{{CONFIRM_PHONE}}`  
`{{CONFIRM_EMAIL}}`

Bottom:
Privacy  
Terms  
Regulation & Complaints  
© Bright Fortune (Far East) Limited

Regulatory language must be verified against the current Hong Kong Insurance Authority record before publishing.

---

# 9. WHO WE ARE PAGE

## A01 — Hero

**H1:**  
# Focused on the detail. Close to the client.

**Subhead:**  
We have been helping clients navigate insurance from Hong Kong since 1995.

Full-bleed editorial image.

---

## A02 — Founding story

**Heading:**  
## Experience built over decades.

**Copy:**  
Bright Fortune (Far East) Limited began operating in 1995, founded by Chander Lalwani after entering the insurance industry in 1983.

From the outset, the business was designed to combine broad insurance knowledge with close client relationships. Today, that principle remains central to how we work: capable enough to handle complex requirements, but personal enough to stay close to the details.

CTA:
Our expertise →

### Design
Large 60/40 image-text split.

---

## A03 — History moments

Use BMS's storytelling rhythm, but with genuine Bright Fortune milestones.

### 1983
**A career in insurance begins.**
Chander Lalwani enters the insurance field.

### 1995
**Bright Fortune begins operations in Hong Kong.**
The business is established around personal advice, market knowledge and client service.

### Today
**Independent advice for changing risks.**
Bright Fortune continues to serve local and expatriate clients across general, marine, life, medical and related insurance.

If the company has genuine expansion milestones, insurer appointments, major market changes or second-generation leadership moments, add them. Do not invent "firsts."

---

## A04 — Values intro

**Heading:**  
# The way we work has stayed remarkably consistent.

**Copy:**  
Markets change. Products change. What clients expect from a good broker should not.

---

## A05 — Five numbered values

### 01 — We listen first.
Good insurance advice begins with understanding the client, not presenting a policy.

### 02 — We stay close to the detail.
Small terms, exclusions and practical circumstances can make a large difference.

### 03 — We value appropriate advice.
The objective is not simply more cover. It is cover that makes sense for the client.

### 04 — We respond with care.
Timely service and clear communication are part of the product.

### 05 — We build relationships for the long term.
Trust is earned through consistency before, during and after placement.

Build these as BMS-style numbered image/text modules, alternating image alignment.

---

## A06 — Facts rail

Repeat only if it adds value:
1995 / 1983 / 30+ years / Independent / Hong Kong

---

## A07 — People module

If founder/team photography exists:

**Heading:**  
## People make the relationship.

Card:
**Chander Lalwani**  
Founder / Director  
Short 60–90 word bio

Then other genuine team members.

If only one profile is available, do not create a lonely "team grid." Use one premium editorial founder feature instead.

---

## A08 — Related modules

Three cards:
- What we do
- Claims
- Contact

Then footer.

---

# 10. WHAT WE DO HUB

## W01 — Hero

**H1:**  
# Expertise applied where it matters.

**Subhead:**  
Insurance requirements are rarely identical. We help clients understand the exposure first, then identify the protection that fits.

---

## W02 — Editorial intro

**Heading:**  
## Insurance arranged around your circumstances.

**Copy:**  
Our work spans commercial and general insurance, property, marine, life and health. We combine access to insurance products with the practical judgement required to compare options, explain differences and help clients make informed decisions.

---

## W03 — Service cards

Use five large vertical product cards.

### Commercial & General Insurance
General insurance requirements structured around business and personal exposures.

### Property & Fire
Protection for property-related loss, damage and associated risks.

### Marine Insurance
Marine cover arranged with attention to the nature, movement and value of the risk.

### Life & Protection
Term life, whole-of-life, trauma and income protection options.

### Medical & Dental
Health and dental insurance solutions for individuals and relevant groups.

Each:
- large photo
- heading
- 2 lines
- "Explore →"
- subtle image zoom

---

## W04 — Connected approach

**Heading:**  
## Different risks. One relationship.

**Copy:**  
A client's exposures do not always fit neatly into one category. Keeping the relationship connected means we can look across the wider picture and help identify where different forms of protection may need to work together.

---

## W05 — Claims card

Use the same reusable `ClaimsPromo`.

---

## W06 — Contact card

Use the same reusable `CTASection`.

---

# 11. GENERIC SERVICE DETAIL TEMPLATE

Route:
`/what-we-do/[slug]`

Use one template populated by `services.ts`.

## S01 — Product hero

Left/bottom:
**Service title**

Short 1–2 sentence proposition.

Right/full:
large image.

Examples:
- Commercial: commercial tower / logistics / office detail
- Property: architecture / industrial property
- Marine: port / vessel / containers / water
- Life: restrained human portrait / family detail, not cliché
- Medical: modern healthcare/lifestyle image

---

## S02 — Positioning

**Heading:**  
## Understanding the exposure before arranging the cover.

Two short paragraphs explaining:
- what the class is for
- Bright Fortune's role
- no exaggerated "market-leading" claims

CTA:
Speak with us →

---

## S03 — Why Bright Fortune

4–5 proof points:

- Independent, relationship-led advice
- Experience serving Hong Kong clients since 1995
- Clear comparison of appropriate options
- Personal communication throughout placement
- Ongoing support when circumstances or claims change

Use bullets or a large split section — not icon cards.

---

## S04 — What we cover

Large typographic grid, typically 2 columns desktop.

Every item:
- title
- 1 sentence explanation

Only include confirmed covers.

---

## S05 — Approach / features

**Heading:**  
## A connected, practical approach.

Explain how the broker:
- understands need
- compares markets/products
- explains terms
- supports placement
- remains accessible afterwards

---

## S06 — Related expertise

2–3 cross-sell cards.

---

## S07 — Claims promo

**Heading:**  
## A policy proves its value when you need to use it.

**Body:**  
When a loss or insured event occurs, we help clients understand the next steps, assemble the relevant information and navigate communication through the claims process.

CTA:
Claims support →

Avoid promising claim outcomes.

---

## S08 — Contact / broker module

If named product specialists are available, show them.

Otherwise:
**Speak with Bright Fortune**
A direct contact card is better than inventing "key contacts."

---

## S09 — Resources strip

Title:
## Resources for clearer decisions.

Resource cards:
- guide title
- one sentence
- PDF / article type
- arrow

---

# 12. MARINE PAGE — ready-to-build Bright Fortune version

Important: Bright Fortune's public site confirms marine insurance, but does not publicly define the sub-classes. Therefore the production page should use only categories the company confirms. Items marked `CONFIRM` are development placeholders.

## M01 — Hero

**H1:**  
# Marine.

**Intro:**  
Marine risks move across locations, contracts and responsibilities. We help clients arrange insurance with the nature of the exposure clearly in view.

Image/video:
Hong Kong container terminal, vessel, harbour, freight handling or cargo movement.

---

## M02 — Intro

**Heading:**  
## Local understanding for risks that move.

**Copy:**  
Marine insurance can involve far more than the physical movement of goods or vessels. The nature of the interest, route, responsibility, value and contractual arrangements can all affect the cover required.

Bright Fortune works with clients to understand those circumstances and identify marine insurance solutions suited to the risk.

CTA:
Let's talk →

---

## M03 — Why Bright Fortune Marine

- Relationship-led advice from Hong Kong
- Experience arranging marine insurance as part of a broader insurance offering
- Clear explanation of cover, terms and exclusions
- Ability to consider marine requirements alongside property and general insurance needs
- Ongoing support through placement and claims communication

---

## M04 — What we cover

Keep these as temporary until the company's marine book is confirmed:

### Marine Cargo — `CONFIRM`
Protection relating to goods moving through relevant transit stages.

### Transit Risks — `CONFIRM`
Cover structured around goods or interests moving between locations.

### Hull / Vessel Risks — `CONFIRM`
Only include if Bright Fortune actually arranges this class.

### Marine Liability — `CONFIRM`
Only include if Bright Fortune actually arranges marine liability.

### Other Marine Risks
Talk to us about the specific nature of the marine interest or exposure.

The web build can support all five cards while hidden cards are controlled by content data.

---

## M05 — Connected expertise

**Heading:**  
## Marine risks rarely sit in isolation.

**Copy:**  
Businesses involved in marine activity may also carry property, fire and general insurance exposures. Looking at the wider picture helps keep the insurance programme coherent.

Related cards:
- Property & Fire
- Commercial & General

---

## M06 — Claims

Reusable claims module.

---

## M07 — Resource

**Marine Insurance Overview**
A concise introduction to the questions clients should consider before arranging marine insurance.

Button:
View guide →

Launch initially as HTML. Add PDF later.

---

# 13. COMMERCIAL & GENERAL INSURANCE PAGE

## C01 — Hero
# Commercial & General Insurance.

**Intro:**  
Practical insurance advice for the risks businesses and individuals face every day.

---

## C02 — Main statement

## Start with the business, not the policy.

We help clients identify the exposures that matter, review relevant insurance options and understand the practical differences between them. The objective is straightforward: protection that reflects the circumstances rather than a generic package.

---

## C03 — What we cover

### General Insurance
Broad insurance requirements considered around the client's circumstances.

### Fire
Protection relating to insured loss or damage arising from fire, subject to policy terms.

### Burglary
Cover relating to insured theft/burglary exposures, subject to the chosen policy.

### Property All Risks
Broader property protection arranged around insured physical assets and exposures.

Use careful factual wording and avoid legal-policy guarantees.

---

## C04 — Why Bright Fortune

Same five proof points.

---

## C05 — Related expertise
Property & Fire  
Marine  
Claims

---

# 14. PROPERTY & FIRE PAGE

## P01 — Hero
# Property & Fire.

**Intro:**  
Protecting the physical assets behind homes, businesses and operations.

---

## P02 — Main statement

## Cover shaped around what is actually at risk.

Property insurance can vary significantly depending on the asset, use, location, insured perils, values and policy wording. We help clients consider the relevant cover and compare available options with those details in mind.

---

## P03 — What we cover

### Property All Risks
Broad property protection subject to the scope, exclusions and conditions of the selected policy.

### Fire
Insurance addressing specified fire-related loss or damage exposures.

### Burglary
Protection relating to insured burglary or theft events, where applicable.

### General Property Requirements
For property-related requirements that do not fit neatly into one category, speak with us about the circumstances.

---

## P04 — Related expertise
Commercial & General  
Marine

---

# 15. LIFE & PROTECTION PAGE

## L01 — Hero
# Life & Protection.

**Intro:**  
Protection decisions deserve clear explanations, not a wall of product terminology.

---

## L02 — Main statement

## The right structure depends on what you are protecting.

Life and protection needs can change with income, family circumstances, liabilities and long-term plans. We help clients understand and compare suitable options across different forms of cover.

---

## L03 — What we cover

### Term Life
Life cover designed for a specified term, subject to the selected policy.

### Whole of Life
Longer-term life insurance structures designed to remain in force subject to policy terms and premiums.

### Trauma / Critical Illness
Protection that may provide benefits following specified insured medical events, subject to policy definitions.

### Income Protection
Cover designed to provide benefits in specified circumstances where illness or injury affects the ability to work, subject to policy terms.

Do not call a product "best," "guaranteed" or "most competitive" without evidence.

---

## L04 — Related expertise
Medical & Dental  
Commercial & General

---

# 16. MEDICAL & DENTAL PAGE

## HLT01 — Hero
# Medical & Dental.

**Intro:**  
Health cover explained around your priorities, circumstances and available options.

---

## HLT02 — Main statement

## Clarity matters before the claim ever happens.

Medical policies can differ materially in limits, networks, deductibles, exclusions and benefits. We help clients compare relevant options and understand the differences before making a decision.

---

## HLT03 — What we cover

### Medical Insurance
Health insurance options considered around individual or relevant group requirements.

### Dental Insurance
Dental protection options subject to the structure and benefits of the selected plan.

If Bright Fortune arranges group medical/group life, add dedicated cards only after confirmation.

---

# 17. CLAIMS PAGE

This should strongly borrow the *role* of BMS's claims page: large hero, one core promise, process, classes and contact.

## CL01 — Hero

**H1:**  
# Support when the policy needs to perform.

**Subhead:**  
The value of insurance becomes clearest when something has happened. We help clients navigate the claims process with continuity and clear communication.

CTA:
Contact us →

---

## CL02 — Core statement

**Heading:**  
## Clear next steps. Consistent support.

**Copy:**  
A claim can involve policy wording, evidence, timelines and communication with multiple parties. We help clients understand what is required, organise the relevant information and remain involved as the claim progresses.

---

## CL03 — Process

### 01 — Tell us what happened
Contact Bright Fortune as soon as reasonably possible after an insured event.

### 02 — Gather the information
We help identify the policy and supporting information likely to be required.

### 03 — Submit and communicate
We assist with the communication and documentation process with the relevant insurer or parties.

### 04 — Stay informed
We remain available to help clients understand requests, developments and next steps.

Do not promise settlement speed or amounts.

---

## CL04 — Areas we support

General Insurance  
Property / Fire  
Marine  
Life / Protection  
Medical / Dental

---

## CL05 — Contact band

**Heading:**  
## Need to discuss a claim?

Phone: `{{CONFIRM_PHONE}}`  
Email: `{{CLAIMS_EMAIL_OR_GENERAL_EMAIL}}`

CTA:
Contact Bright Fortune →

---

# 18. CONTACT PAGE — BMS-style recreation

## CT01 — Hero

**H1:**  
# Good partnerships start with a conversation.

**Subhead:**  
Tell us what you need help with and we will connect you with the right person.

Large editorial image beside or below the form depending breakpoint.

---

## CT02 — Form

Use the same conceptual grouping as BMS, adapted to Bright Fortune.

### Personal details
First name  
Surname

### Contact details
Email  
Phone number

### What can we help with?
Dropdown:
- Commercial & General Insurance
- Property & Fire
- Marine
- Life & Protection
- Medical & Dental
- Claims
- Something else

### Company
Optional

### How can we help?
Textarea

### Consent
Checkbox:
I have read the privacy notice and consent to Bright Fortune using my information to respond to this enquiry.

Button:
Submit →

## Validation
- required fields clearly marked
- inline error state
- success message
- honeypot + server-side rate limit
- no reCAPTCHA unless spam becomes a problem

---

## CT03 — Office

**Heading:**  
## Hong Kong.

Use only company-confirmed contact information before launch.

Development placeholder based on public directory data:
`Room 1621–24, Beverley Commercial Centre, 87–105 Chatham Road, Tsim Sha Tsui, Kowloon, Hong Kong`

Publicly listed phone:
`+852 2314 9292`

These values must be confirmed internally before production.

Map embed optional. A clean address panel is visually closer to BMS than a giant Google Maps embed.

---

# 19. RESOURCES PAGE

BMS does not treat downloads as a dusty document repository. Resources are presented like editorial content.

Bright Fortune should do the same.

## R01 — Hero

# Clear information for better insurance decisions.

**Intro:**  
Short guides and practical explanations across the areas in which we work.

---

## R02 — Filter row

All  
Commercial  
Property  
Marine  
Life & Protection  
Medical  
Claims

Do not build complex filtering on day one unless there are at least 8–10 resources. Until then, simple categories or no filter.

---

## R03 — Resource cards

Launch set:

### Understanding Property All Risks
**GUIDE · 4 MIN READ**  
What the term means, the questions to ask and where policy differences can matter.

### Marine Insurance: Questions to Ask Before You Arrange Cover
**GUIDE · 5 MIN READ**

### Term Life vs Whole of Life
**GUIDE · 5 MIN READ**

### Preparing for an Insurance Claim
**CHECKLIST · 3 MIN READ**

### Understanding Medical Insurance Limits and Exclusions
**GUIDE · 5 MIN READ**

Each resource card:
- image
- category
- title
- short descriptor
- arrow
- optional PDF icon only if a PDF actually exists

---

# 20. RESOURCE / DOCUMENT DETAIL PAGE

This should visually resemble an editorial article, not a browser PDF dump.

## D01 — Hero/meta

Category  
Title  
Published date  
Estimated read time  
Optional "Download PDF" button

## D02 — Hero image

Full-width large image.

## D03 — Article body

Narrow readable column:
- max-width 760–840px
- 18–20px body text
- clear h2/h3 hierarchy
- pull quote / callout optional

## D04 — Download CTA

Dark horizontal block:
**Prefer a printable copy?**  
Download PDF →

## D05 — Related resources

3 cards.

---

# 21. INSIGHTS PAGE

If you want the BMS look even before publishing regular news, create the template now.

Hero:
# Perspective in a changing risk landscape.

Lead cards:
- guide
- company update
- insurance explainer

Filters can be added later.

Do not create fake news or filler articles simply to populate the grid.

---

# 22. FOOTER DETAILS

Desktop:
- dark background
- 12-column layout
- 120–160px top/bottom padding
- one huge CTA heading at top
- navigation below
- company info at bottom

Mobile:
- accordions are acceptable, but a simple stacked footer may feel more premium.

Regulatory footer:
Use the company's current Hong Kong Insurance Authority licensing wording after legal/internal verification. Do not migrate the old site's PIBA language automatically.

---

# 23. COMPONENT API / DATA MODEL

## services.ts

```ts
export type Service = {
  slug: string;
  title: string;
  heroIntro: string;
  heroImage: string;
  introHeading: string;
  introBody: string[];
  whyUs: string[];
  coverages: {
    title: string;
    body: string;
    confirmed: boolean;
  }[];
  related: string[];
  resourceIds: string[];
};

export const services: Service[] = [
  {
    slug: "marine",
    title: "Marine.",
    heroIntro:
      "Marine risks move across locations, contracts and responsibilities. We help clients arrange insurance with the nature of the exposure clearly in view.",
    heroImage: "/images/services/marine-hero.webp",
    introHeading: "Local understanding for risks that move.",
    introBody: [
      "Marine insurance can involve the nature of the interest, route, responsibility, value and contractual arrangements.",
      "Bright Fortune works with clients to understand those circumstances and identify marine insurance solutions suited to the risk."
    ],
    whyUs: [
      "Relationship-led advice from Hong Kong",
      "Experience arranging marine insurance as part of a broader insurance offering",
      "Clear explanation of cover, terms and exclusions",
      "Ability to consider related property and general insurance needs",
      "Ongoing support through placement and claims communication"
    ],
    coverages: [
      {
        title: "Marine Cargo",
        body: "Protection relating to goods moving through relevant transit stages.",
        confirmed: false
      },
      {
        title: "Transit Risks",
        body: "Cover structured around goods or interests moving between locations.",
        confirmed: false
      }
    ],
    related: ["property-fire", "commercial-general"],
    resourceIds: ["marine-overview"]
  }
];
```

Only render `confirmed: true` coverages in production.

---

# 24. RESPONSIVE RULES

## Desktop ≥ 1200
- 12-column
- full-width visual drama
- split sections
- giant display type
- 3–5 stat cells
- 3-column card grids

## Tablet 768–1199
- 8-column or simplified 12
- reduce display type 20–30%
- preserve asymmetry where possible
- 2-column grids

## Mobile < 768
- single-column content
- hero 100svh
- 24px horizontal padding
- 64–96px section spacing
- 2-column stat cells where possible
- marquee remains horizontal
- menu becomes full-screen
- cards remain large and editorial

Do not shrink desktop layouts into tiny mobile cards. Recompose them.

---

# 25. IMAGE DIRECTION

The single easiest way to ruin the BMS-inspired aesthetic is generic insurance stock photography.

## Use
- Hong Kong architecture
- harbour / logistics / container terminals
- shipping details
- restrained workplace candid scenes
- architectural shadow / material details
- real staff portraits
- city movement
- high-quality health/lifestyle imagery

## Avoid
- handshake closeups
- umbrella icon imagery
- family giving thumbs-up
- smiling call-centre headsets
- blue holographic shield
- staged boardroom stock
- visible competitor branding
- fake charts / analytics

Colour-grade consistently:
- slightly desaturated
- clean contrast
- natural skin
- restrained warmth
- no heavy teal/orange LUT

---

# 26. COPY STYLE

The BMS copy style is:
- short
- declarative
- confident
- concept-first
- low jargon
- sparse adjectives
- repeated thematic vocabulary
- headings do much of the persuasion

Bright Fortune should follow the same rhythm without pretending to have BMS's global scale.

## Use
"Independent advice, built around the detail."

"Local understanding for risks that move."

"Start with the business, not the policy."

"Clear next steps. Consistent support."

## Avoid
"We are your one-stop shop for all your insurance needs."

"Best price guaranteed."

"We offer unparalleled world-class comprehensive solutions."

"We care for every customer like family."

"Leading broker" unless independently substantiated.

---

# 27. SEO / METADATA

## Home
Title:
`Bright Fortune | Independent Insurance Broker in Hong Kong`

Description:
`Bright Fortune (Far East) Limited is a Hong Kong insurance broker providing general, property, marine, life, medical and dental insurance solutions.`

## Marine
Title:
`Marine Insurance Hong Kong | Bright Fortune`

## Property
Title:
`Property & Fire Insurance Hong Kong | Bright Fortune`

## Life
Title:
`Life & Protection Insurance Hong Kong | Bright Fortune`

## Medical
Title:
`Medical & Dental Insurance Hong Kong | Bright Fortune`

Add:
- Organization schema
- InsuranceAgency / FinancialService schema if appropriate
- LocalBusiness address after internal confirmation
- Breadcrumb schema on service pages
- Article schema on resources

Do not stuff "Hong Kong insurance broker" into every heading.

---

# 28. PERFORMANCE REQUIREMENTS

Target:
- Lighthouse performance 90+
- CLS < 0.1
- LCP < 2.5 sec on realistic mobile
- hero poster visible immediately
- video lazy/conditional loading if network is poor
- WebP/AVIF images
- responsive `sizes`
- font preloading only for required weights
- no giant animation library beyond Framer Motion
- no autoplay audio
- no 4K hero video

Hero video:
- 1080p maximum
- 5–10 MB target, preferably smaller
- H.264 MP4 + poster

---

# 29. ACCESSIBILITY

- semantic H1/H2 order
- keyboard-accessible mega menu
- visible focus states
- 4.5:1 text contrast
- labels on all form controls
- `prefers-reduced-motion`
- pause/disable marquee when motion preference requires it
- descriptive image alt text
- decorative images `alt=""`
- no text embedded inside imagery

---

# 30. ONE-DAY BUILD ORDER

## Hour 1 — Foundation
- Next app
- fonts
- global CSS tokens
- max-width/grid utility
- Header/Footer
- ArrowLink/Button

## Hour 2 — Core visual components
- VideoHero
- EditorialIntro
- StatementMedia
- StatsRail
- NumberedCards
- ExpertiseMarquee

## Hour 3 — Generic supporting modules
- WhyUs
- CoverageGrid
- RelatedExpertise
- ClaimsPromo
- ResourcesStrip
- CTASection

## Hour 4 — Home
Assemble all modules and tune spacing.

## Hour 5 — Service template
Build `[slug]` and populate 4–5 service data objects.

## Hour 6 — About + What We Do
Reuse modules; no new layout inventions.

## Hour 7 — Claims + Contact + Resources
Build form and article/resource grid.

## Hour 8 — Responsive / motion / polish
- mobile menu
- hero sizing
- motion
- image treatment
- hover
- typography

## Hour 9 — SEO / QA / content verification
- metadata
- sitemap
- robots
- form destination
- broken links
- internal confirmation of regulatory/contact data
- marine sub-class confirmation

The key is to refuse bespoke page exceptions until the main template is finished.

---

# 31. FINAL QA CHECKLIST

## Visual
- [ ] Hero feels editorial, not corporate-template
- [ ] Large type is genuinely large
- [ ] Enough whitespace
- [ ] Images are consistently graded
- [ ] No rounded-card overload
- [ ] No generic insurance icons
- [ ] Dark/light section rhythm feels intentional
- [ ] Every page feels like the same design system

## Content
- [ ] No unverified service line
- [ ] No unverified award
- [ ] No invented global capability
- [ ] No unsupported superlatives
- [ ] Marine sub-classes confirmed
- [ ] Founder/company dates confirmed
- [ ] Address/telephone/email confirmed
- [ ] Current Insurance Authority wording confirmed

## UX
- [ ] Mega menu works on keyboard
- [ ] Mobile menu works
- [ ] Contact form sends successfully
- [ ] Success/error states work
- [ ] Resource links work
- [ ] All CTAs have a destination
- [ ] No empty "coming soon" navigation page

## Technical
- [ ] Canonical URLs
- [ ] OG image
- [ ] favicon
- [ ] sitemap
- [ ] robots
- [ ] structured data
- [ ] optimized images
- [ ] compressed hero video
- [ ] no console errors
- [ ] no hydration errors
- [ ] no cumulative layout shift

---

# 32. COPY-PASTE CODING AGENT BRIEF

Use the following as the instruction at the top of the VS Code coding session:

> Rebuild the Bright Fortune insurance website as a premium editorial brokerage website strongly inspired by the current public BMS Group website. Reproduce the BMS design *system* and interaction logic as closely as practical: full-screen media heroes, very large neo-grotesk typography, warm off-white and dark sections, large editorial photography, spacious 12-column grids, numbered solution modules, horizontally moving specialism typography, full-width mega menus, restrained arrow CTAs, alternating media/text sections, claims cross-links, resource cards and a large dark footer.
>
> Do not copy BMS proprietary source code, logos, images or written paragraphs. Build original reusable React/Next components that achieve the same visible experience using Bright Fortune branding and content.
>
> Treat this as a component-driven system, not individually designed pages. Create reusable modules for VideoHero, ImageHero, EditorialIntro, StatementMedia, StatsRail, NumberedCards, ExpertiseMarquee, WhyUs, CoverageGrid, RelatedExpertise, ClaimsPromo, ResourcesStrip, CTASection, Header/MegaMenu and Footer. Service pages must be driven by a `services.ts` data object.
>
> The confirmed Bright Fortune public offering is: general insurance, fire, marine, burglary, property all risks, life, medical and dental insurance, plus term life, whole-of-life, trauma and income protection. Do not invent additional products. Any unconfirmed marine sub-class must remain a content flag and must not render in production.
>
> Bright Fortune began operations in 1995 and its founder Chander Lalwani entered the insurance field in 1983. Use these only as factual credibility signals, not inflated statistics.
>
> Build these routes: `/`, `/who-we-are`, `/what-we-do`, `/what-we-do/commercial-general`, `/what-we-do/property-fire`, `/what-we-do/marine`, `/what-we-do/life-protection`, `/what-we-do/medical-dental`, `/claims`, `/resources`, `/contact`, plus privacy/terms/regulation placeholders.
>
> Use Next.js App Router + TypeScript + Tailwind + Framer Motion unless the existing project already has an established stack. Prioritise a visually faithful BMS-like frontend over backend complexity. Use static TypeScript content for launch.
>
> All animation must be subtle: 0.7–1.0s fade/translate entrances, restrained image zoom, arrow movement and a slow seamless text marquee. Respect `prefers-reduced-motion`.
>
> The output must be responsive, WCAG-conscious, fast, SEO-ready and deployable. Do not stop after creating wireframes: implement the complete pages and polish spacing, states, responsive behavior and motion.
>
> Use `TODO_CONFIRM` placeholders for Bright Fortune's current office contact details, current Insurance Authority regulatory wording, individual staff profiles and unconfirmed marine insurance sub-classes. Do not publish unsupported claims.

---

# 33. The most important design decision

The closest successful Bright Fortune recreation of BMS will **not** come from copying every BMS sentence or trying to imitate BMS's corporate scale.

It comes from copying the deeper mechanics:

- confidence
- restraint
- editorial hierarchy
- giant type
- media-led sections
- repeated structural modules
- minimal decoration
- short copy
- deliberate transitions
- integrated service + claims + resources journey
- consistent footer/contact architecture

Bright Fortune's own distinction is then supplied through:
- Hong Kong identity
- 1995 heritage
- founder experience since 1983
- independence
- personal service
- marine capability
- combination of general + life/health products
- close client relationships

That keeps the rebuild recognisably inspired by BMS while still making Bright Fortune credible on its own terms.