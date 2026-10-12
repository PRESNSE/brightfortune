#!/usr/bin/env python3
"""Validate handoff references; not an application or regulatory audit."""
from pathlib import Path
import json,re,sys
root=Path(__file__).resolve().parents[1]
def load(p):return json.loads((root/p).read_text())
routes=load('content/routes.json');services=load('content/services.json');articles=load('content/article-index.json');assets=load('design/asset-manifest.json');site=load('content/site.json');comp=load('design/page-compositions.json')
errors=[]
def check(ok,msg):
 if not ok:errors.append(msg)
paths={r['path'] for r in routes};sids={s['slug'] for s in services};aids={a['id'] for a in articles};assetids={a['id'] for a in assets}
check(len(routes)==21,'Expected 21 content routes');check(len(paths)==len(routes),'Duplicate routes');check(len({r['title'] for r in routes})==len(routes),'Duplicate metadata title')
for r in routes:
 check(r['template'] in comp,'Missing composition '+r['path']);check(bool(r['title'] and r['description']),'Missing metadata '+r['path'])
 if r['template']=='service':check(r['contentId'] in sids,'Unknown service '+r['path'])
 if r['template']=='article':check(r['contentId'] in aids,'Unknown article '+r['path'])
 if r['template']=='legal':check((root/f"content/legal/{r['contentId']}.md").is_file(),'Missing legal '+r['path'])
for s in services:
 check(s['assetId'] in assetids,'Unknown service image');check(len(s['introBody'])>=2 and len(s['faqs'])>=3,'Thin service '+s['slug']);check(bool(s['coverages'] and s['considerations']),'Empty service sections')
 for sid in s['related']:check(sid in sids and sid!=s['slug'],'Bad related service '+sid)
 for aid in s['resourceIds']:check(aid in aids,'Bad resource '+aid)
for a in articles:
 file=root/a['bodyFile'];check(file.is_file(),'Missing body '+a['id']);check(a['assetId'] in assetids,'Unknown guide image');check(a['relatedServiceHref'] in paths,'Bad service link')
 if file.is_file():
  body=file.read_text();check(len(body.split())>=350,'Guide too short '+a['id']);check(body.count('\n## ')>=4,'Missing guide structure '+a['id'])
for a in assets:
 for k in ['file','card','mobile','hero']:check((root/'public'/a[k].lstrip('/')).is_file(),'Missing asset '+a[k])
for p in list((root/'content/articles').glob('*.md'))+list((root/'content/legal').glob('*.md')):
 for href in re.findall(r'\]\((/[^)]+)\)',p.read_text()):check(href.split('?')[0].split('#')[0] in paths,f'Broken content link {p.name}: {href}')
def walk(x):
 if isinstance(x,dict):
  for k,v in x.items():
   if k.endswith('href') or k.endswith('Href'):
    if isinstance(v,str) and v.startswith('/'):check(v.split('?')[0] in paths,'Unknown href '+v)
   walk(v)
 elif isinstance(x,list):
  for v in x:walk(v)
walk(site)
check((root/'public/fonts/Figtree-Variable.ttf').is_file(),'Missing font');check((root/'public/fonts/OFL.txt').is_file(),'Missing font license')
config=load('content/launch-config.json');check(config['mode']=='preview','Pack should default to preview');check(config['form']['mode']=='preview','Form should default to preview')
check(not config['regulatoryApproved'],'Unverified regulation approved');check(config['contact']['email'] is None,'Email unexpectedly supplied')
for required in ['README.md','CLAUDE.md','IMPLEMENT_PROMPT.md','PLAN_PROMPT.md','design/design-reference.html','docs/SEO_GEO.md','docs/FORMS_AND_PRIVACY.md','qa/ACCEPTANCE.md']:
 check((root/required).is_file(),'Missing '+required)
if errors:
 print('\n'.join('FAIL: '+e for e in errors));sys.exit(1)
print(f'PASS: {len(routes)} routes, {len(services)} services, {len(articles)} guides, {len(assets)} photo assets; cross-references and defaults valid.')
