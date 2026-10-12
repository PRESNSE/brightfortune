# Bright Fortune — implemented BMS visual correction

This is completed source code plus a binary-safe patch, not a new planning pack.
Repository: https://github.com/PRESNSE/brightfortune
Base: e45fd38b4c19ab431caaa1de93d5af3176c21516
Local correction: de9e9278ffbaf0831cd743485edc3c19bcc42e91

## Status
Production build and TypeScript pass. The 34 focused preview HTTP checks pass.
No remote branch, PR or deployment was created: GitHub returned 403 Resource not accessible by integration.
Rendered comparison of the changed website is still outstanding. Do not describe this as a verified 1:1 replica.

## Use with Claude in the existing repository
Upload this ZIP and paste CLAUDE_CONTINUE.md. Claude should apply brightfortune-visual.patch on a new branch and finish browser verification. The patch includes binary assets.
The patch targets the base above. If the repository has moved forward, preserve newer work and resolve overlapping changes; never reset main to the bundled source.

## Use the complete source
source/ contains every tracked file at the correction commit, including assets, dependencies lockfile, all routes and procedural documents. It excludes .git, installed dependencies, build output and local secrets. For an empty checkout, unpack source/ into the project root. For the existing repository, use the patch instead.

## What changed
Header and three-panel hero geometry; capsule sections; compact overlapping facts; geographic section; tall staggered service columns; editorial introductions; film-sized image slot; outlined expertise marquee; eight-cell discovery puzzle; service-principle band; rust contact strip and navy footer; About and service hero templates. The older approximate design instructions are explicitly superseded.

## Read first
source/docs/VISUAL_FIDELITY.md — measured reference and remaining differences.
source/qa/VISUAL_REPORT.md — actual checks and limitations.
source/docs/ASSET_UPDATES.md — image and map provenance.

Replacement photographs, a static film slot and Bright Fortune-specific facts remain intentional differences. Interior body modules and mobile reference geometry still need individual visual checks. Preview noindex and existing launch approval switches remain enabled. This bundle does not establish public launch readiness or complete off-page SEO.
