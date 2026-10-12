# Handoff validation — 12 October 2026

PASS: 21 unique content routes; 5 service data objects; 5 complete guide bodies; 4 legal draft bodies; 6 original stock-photo downloads and 18 local WebP derivatives; local Figtree font/license; cross-linked guide/service content; all referenced assets and composition templates present.

PASS: metadata helper tested under Node 24 for canonical query/trailing slash normalization, HTTPS/origin constraints, rejection of protocol-relative routes, safe JSON-LD escaping, topic allowlist, and noindex preview metadata.

PASS: release diagnostic refuses public mode with the initial unapproved configuration. This is the intended result, not a failed website build.

Inspected: six stock photos as a contact sheet; original social image; layout atlas. HTML reference local source/image links checked. The HTML reference has not been browser-rendered in this environment; implementation visual checks are specified for Claude.

NOT RUN: application build, route HTTP responses, browser interaction, live form transport, Lighthouse and production crawl. No application is supplied by this pack. qa/ACCEPTANCE.md and the provided smoke specification define those downstream checks.

Scope limits: BMS desktop homepage inspected; other pages retrieved for structure and content topics. Full mobile/pixel equivalence not verified. Regulatory/contact/asset/legal approvals remain centralised in content/launch-config.json.
