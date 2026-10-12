// Framework-independent helpers. Wire results to Next Metadata/robots/sitemap APIs.
import type { RouteSpec } from './content-types';
export function canonical(origin:string, path:string):string {
  const base = new URL(origin);
  if(base.protocol!=='https:') throw new Error('Public origin must use HTTPS');
  if(base.pathname!=='/' || base.search || base.hash || base.username || base.password) throw new Error('Origin only; no path or credentials');
  const clean=path.split(/[?#]/)[0].replace(/\/+$/,'') || '/';
  if(!clean.startsWith('/') || clean.startsWith('//')) throw new Error('Local absolute route required');
  return new URL(clean,base.origin).href;
}
export function jsonLd(value:unknown):string { return JSON.stringify(value).replace(/</g,'\\u003c'); }
export function routeMetadata(route:RouteSpec, origin:string|null, publicReady:boolean) {
  return {
    title: route.title, description:route.description,
    robots: {index:publicReady && route.indexAfterApproval,follow:publicReady},
    ...(origin ? {alternates:{canonical:canonical(origin,route.path)}} : {})
  };
}
// Do not call publicReady=true until release checks and production-host checks pass.
// Do not use build timestamps for article dates or sitemap lastmod.
