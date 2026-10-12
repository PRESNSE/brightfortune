# URL migration and deployment
## Known old URLs
| Legacy path | New canonical destination | Status |
|---|---|---|
| /main.htm | / | Permanent 301 or 308 |
| /aboutus.htm | /who-we-are | Permanent 301 or 308 |

These two legacy pages were retrieved. The root site timed out in the research fetch; its frame/page inventory was not exhaustively crawled. Do not claim this is a complete historic URL map. The remaining inventory must be obtained from actual repository/server routes, Search Console/export or approved access at migration. Unknown old URLs return a genuine 404 until a matching destination is known, not a blanket redirect to home.

Use approved HTTPS host consistently; redirect alternate www/non-www and HTTP at host/CDN, preserving path/query appropriately. Never point new Bright Fortune routes to BMS. Avoid chains, loops and cross-domain canonical confusion. Legacy query-string routing in a frameset, if present, needs separate evidence before implementation.

Preserve old site backup before switch. Confirm domain ownership, mail/DNS records and current hosting; do not alter MX records during website deployment. Set canonical only to approved public host, never localhost or preview. Existing links to PDFs/images should retain working paths or explicit equivalents if known. Test known legacy redirects and top existing traffic URLs from actual data before cutover.

Private preview: noindex with authentication if host supports it. Public activation: finish launch-config approvals, set SITE_MODE=public and SITE_URL to the approved origin, verify host condition and readiness gate, then deploy through user's hosting process. Confirm HTTP statuses, canonical, sitemap, robots and form/contact route on the public origin. Submit sitemap through verified search accounts. Recheck crawl errors after launch; no promise of immediate indexing or preserved rankings.

Rollback: retain previous deployment and DNS values, redeploy last known working version if routes/form/indexing break. Avoid deleting the previous site before the new one is validated. The coding-agent implementation scope does not authorise live DNS changes or publication.
