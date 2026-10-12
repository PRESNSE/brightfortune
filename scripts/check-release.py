#!/usr/bin/env python3
"""Readiness diagnostic. Never edits approval fields."""
import json,sys
from pathlib import Path
from urllib.parse import urlsplit
root=Path(__file__).resolve().parents[1];c=json.loads((root/'content/launch-config.json').read_text());missing=[]
for k in ['companyIdentityApproved','historyApproved','copyApproved','articlesApproved','assetsApproved','legalApproved','regulatoryApproved','contactApproved']:
 if c.get(k) is not True:missing.append(k)
u=urlsplit(c.get('canonicalOrigin') or '')
if u.scheme!='https' or not u.hostname or u.path not in ('','/') or u.query or u.fragment or u.username or u.password:missing.append('valid canonicalOrigin')
if not c.get('regulatoryStatement'):missing.append('verified regulatoryStatement')
if not c['brand'].get('officialLogoProvided') and not c['brand'].get('draftWordmarkApprovedForLaunch'):missing.append('approved wordmark')
contact=c['contact'];form=c['form']
for k in ['privacyContactNameOrRole','privacyEmailOrPostalChannel','complaintsContactNameOrRole']:
 if not contact.get(k):missing.append('contact.'+k)
if form['mode']=='live':
 for k in ['provider','transportTestPassed','retentionPolicyApproved','rateLimitConfigured']:
  if not form.get(k):missing.append('form.'+k)
elif form['mode']=='contact-only':
 if not form.get('contactOnlyFallback') or not (contact.get('phone') or contact.get('email')):missing.append('verified contact-only route')
else:missing.append('live or verified contact-only mode')
if c['mode']!='public':missing.append('explicit public mode (leave preview until ready)')
if missing:
 print('PUBLIC RELEASE NOT READY (expected for initial preview):')
 for x in missing:print('- '+x)
 sys.exit(2)
print('Config readiness passed. Still verify host, credentials, revised legal copy, and actual runtime QA before publishing.')
