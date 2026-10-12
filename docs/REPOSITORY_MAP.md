# Target application structure
The coding agent creates these files; the pack is not claiming they already exist.

- src/app/layout.tsx: local font, header/footer, metadata defaults, preview banner.
- src/app/page.tsx: home composition.
- src/app/who-we-are/page.tsx; what-we-do/page.tsx; claims/page.tsx; contact/page.tsx.
- src/app/what-we-do/[slug]/page.tsx: shared service page, metadata/static params/404.
- src/app/insights/page.tsx; resources/page.tsx; insights/[slug]/page.tsx.
- src/app/privacy/page.tsx; terms/page.tsx; regulation-and-complaints/page.tsx; cookies/page.tsx.
- src/app/api/enquiry/route.ts: configured server endpoint with truthful preview/live modes.
- src/app/robots.ts; sitemap.ts; not-found.tsx; error.tsx; icon.svg; opengraph-image or bundled OG.
- src/components/layout/: Header, DesktopMenu, MobileMenu, Footer.
- src/components/sections/: shared components named in page-compositions.
- src/components/forms/: EnquiryForm and field/error primitives.
- src/content/: integrated immutable content objects / loader; keep raw review docs out of browser.
- src/lib/: launch-mode, metadata, schema, validation, server transport/rate-limit adapters.
- src/styles/: tokens and component CSS.
- tests/: focused route/form/accessibility checks.

All 21 public content pages are implemented even when preview mode marks them non-indexable. No React Router client-only fallback in a new Next app. API routes require a server-capable host; do not configure output:export with a live API handler. Static export is only appropriate if the project explicitly uses a verified contact-only deployment, with documentation updated accordingly.
