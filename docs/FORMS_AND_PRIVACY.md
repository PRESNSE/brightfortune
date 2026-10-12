# Contact contract
## Fields and validation
| Key | Requirement | Validation |
|---|---|---|
| firstName | required | trim, 1–80 Unicode characters |
| lastName | optional | trim, <=80; support people without a surname |
| email | required | basic valid address format, <=254 |
| phone | optional | <=40; allow +, spaces, parentheses, digits; don't enforce Hong Kong-only |
| topic | required | commercial-general, property-fire, marine, life-protection, medical-dental, claims, other |
| company | optional | <=120 |
| message | required | trimmed 10–3000 characters; plain text |
| privacyAcknowledged | required | true; privacy acknowledgement is not marketing consent |
| website | hidden honeypot | must be empty; hidden from assistive technology and tab order |

GET ?topic=known-value prefills, unknown -> other. Never fill from untrusted query HTML. Client and server validation must agree. Max request body 16KB. Accept only application/json POST. Reject unexpected types and unsafe lengths; omit extra keys, escape output. No file input. No credit-card/medical fields. Show collection notice beside the form before submission.

## Runtime modes
preview: UI validation only; no external call, no console logging of entered PII, message “Preview only — your details have not been sent.” Reset on user choice. /api/enquiry returns 503 PREVIEW_DISABLED if called directly; client does not call it.
contact-only: no public form, display verified phone and/or email with explanatory CTA. Requires contactApproved and at least one verified channel. Complete page otherwise retained.
live: configured server transport, privacy approval, durable rate limiter and approved recipient. Provider credentials remain server-only. Fail closed with 503 if missing; never fake success or silently email a guessed address.

## Live endpoint
POST /api/enquiry -> JSON. Validate same-origin Origin against configured origin (absent Origin rejected for public browser route), JSON content type, body size, schema and honeypot. Durable rate limit: 5 attempts per 10 minutes per salted IP hash, plus sensible aggregate protection; tune after real observation. Use a provider/WAF/KV suitable for deployment. In-memory counters alone are insufficient on distributed serverless instances. Do not log raw IP or field content. A honeypot hit returns neutral 400 without revealing rule details, not a fake confirmation.

Normalise body to plain text. Use a fixed verified sender and recipient; user email goes in Reply-To only after validation, never From. Subject uses allowlisted topic, not raw message. Escape rendered HTML or send text-only. Idempotency: issue client request UUID per submit, reuse on deliberate retry; store short-lived duplicate status in same durable backend; don't double-send. Transport timeout <=10s; distinguish definite rejection from uncertain outcome. Log only request ID, result code and provider status, with no PII.

Responses:
- 200 {ok:true,reference:string} only after provider acknowledges acceptance; not proof of inbox delivery.
- 400 {ok:false,code:'VALIDATION',fieldErrors:{...}}.
- 403 {ok:false,code:'ORIGIN'}.
- 413 {ok:false,code:'TOO_LARGE'}.
- 415 {ok:false,code:'CONTENT_TYPE'}.
- 429 {ok:false,code:'RATE_LIMITED',retryAfter:seconds}, matching header.
- 503 {ok:false,code:'NOT_CONFIGURED'|'PREVIEW_DISABLED'|'TRANSPORT_UNAVAILABLE'}.
- 504 {ok:false,code:'DELIVERY_UNCERTAIN'}; do not auto-retry.

## Transport adapter and test contract
Implement sendEnquiry(validated,requestId): Promise<{accepted:boolean,reference:string}> server-only. Configure a standard email provider or existing company transport once credentials are available; use official API documentation for that adapter only. This pack does not invent a working provider account. During tests use a deterministic mock transport to test errors and success without sending messages. Mark real transportTestPassed only following a company-approved test recipient and actual provider response.

## Privacy configuration
No optional marketing checkbox at launch; no automatic subscription. The acknowledgement links /privacy and does not claim that consent cures every data handling issue. The privacy notice must match actual recipients, processing locations, retention and access/correction channels. The supplied legal draft explicitly records these unresolved details; replace review paragraphs before approval. Prefer no persistent enquiry database in the website: approved transport receives the message, rate-limit/idempotency backend stores minimum operational data for short periods. Adopt actual retention/deletion rules before activation. Never commit secrets or personal test messages.

Reference: Hong Kong PCPD introductory material on collection, purpose, retention, security and access/correction https://www.pcpd.org.hk/english/education_training/individuals/public_seminars/files/PDPO_eng_2020.pdf . This is a project implementation contract; legal text needs alignment with actual company practice.
