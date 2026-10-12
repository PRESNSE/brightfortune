# Finite launch configuration list
Complete the entire preview with supplied defaults. Do not block development or request more planning.

| Input | Where to set it | Why it remains open |
|---|---|---|
| Canonical HTTPS origin / domain control | canonicalOrigin + SITE_URL | Public legacy domain observed; hosting ownership/configuration not supplied |
| Current phone, email, postal address, privacy/complaints contact | contact fields + contactApproved | Directory phone/address are provisional; verified email unavailable |
| Current regulatory statement / business lines | regulatoryStatement + regulatoryApproved | Third-party directories disagree on linked long-term authority; official record not verified |
| Company/content/guide approval | companyIdentityApproved, historyApproved, copyApproved, articlesApproved | Published history is sourced; new advice/service copy needs company adoption |
| Final legal texts/retention and processor details | legal files + legalApproved, retentionPolicyApproved | Actual operating arrangements not supplied |
| Asset/wordmark approval | assetsApproved + logo supplied or draftWordmarkApprovedForLaunch | Stock illustrative images and original draft wordmark supplied |
| Enquiry delivery or contact-only choice | form.mode + provider + test / contactOnlyFallback | No credentials or recipient supplied |

Do not set approvals programmatically merely to pass a gate. Record who confirmed what and when in approvalEvidence. All approval values default false. This is a near-launch draft, not a declaration of regulatory/operational readiness.

Public content must not contain “will be confirmed”, draft notices, null tokens or guessed facts. Replace legal review paragraphs with actual approved details. If contact-only mode is selected, render verified phone/email and omit the form rather than show a disabled public form. A licensed-service statement needs actual current verification. Omit optional unverified subclasses entirely; they are not a launch blocker.

Deployment release gate = explicit public mode AND canonical origin AND identity/history/copy/articles/legal/regulatory/contact/assets approvals AND an approved wordmark choice AND an operational contact route. Live form additionally requires retention approval, durable rate limit and successful approved-destination transport test. Preview builds remain functional with every gate false. Production assets must not expose draft JSON/research files through public/.
