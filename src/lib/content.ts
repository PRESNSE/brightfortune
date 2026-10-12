import fs from 'node:fs';
import path from 'node:path';
import site from '@content/site.json';
import servicesJson from '@content/services.json';
import articlesJson from '@content/article-index.json';
import routesJson from '@content/routes.json';
import type { Article, RouteSpec, Service } from './types';

export { site };
export const services = servicesJson as Service[];
export const articles = articlesJson as Article[];
export const routes = routesJson as RouteSpec[];
export { assets } from './assets';

export const getService = (slug: string) => services.find((s) => s.slug === slug);
export const getArticle = (slug: string) => articles.find((a) => a.slug === slug);
export const getRoute = (p: string): RouteSpec => {
  const r = routes.find((x) => x.path === p);
  if (!r) throw new Error(`No route registry entry for ${p}`);
  return r;
};

const read = (rel: string) => fs.readFileSync(path.join(/* turbopackIgnore: true */ process.cwd(), rel), 'utf8');

export interface Heading { id: string; text: string; level: 2 | 3 }
export const slugify = (t: string) =>
  t.toLowerCase().replace(/[’']/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

/** Markdown body with the leading H1 removed (the hero renders the title) plus its heading list. */
function parseMarkdown(rel: string): { body: string; headings: Heading[] } {
  let body = read(rel).replace(/^﻿/, '');
  body = body.replace(/^\s*#\s+.*\n/, '').trim();
  const headings: Heading[] = [];
  const used = new Set<string>();
  let fence = false;
  for (const line of body.split('\n')) {
    if (line.startsWith('```')) fence = !fence;
    const m = !fence && /^(#{2,3})\s+(.+?)\s*#*$/.exec(line);
    if (m) {
      const text = m[2].replace(/[*_`]/g, '');
      let id = slugify(text) || 'section';
      for (let n = 2; used.has(id); n++) id = `${slugify(text)}-${n}`;
      used.add(id);
      headings.push({ id, text, level: m[1].length as 2 | 3 });
    }
  }
  return { body, headings };
}
export function getArticleBody(a: Article) {
  const r = parseMarkdown(a.bodyFile);
  // The hero already shows the summary; drop the duplicate lead paragraph.
  const first = r.body.split('\n\n')[0].trim();
  if (first === a.summary.trim()) r.body = r.body.slice(first.length).trim();
  return r;
}
export const getLegalBody = (id: string) => parseMarkdown(`content/legal/${id}.md`);

/** Minutes derived from the actual text (average 220 wpm), falling back to the supplied value. */
export function readingMinutes(a: Article): number {
  try {
    const words = parseMarkdown(a.bodyFile).body.split(/\s+/).length;
    return Math.max(1, Math.round(words / 220)) || a.readingMinutes;
  } catch {
    return a.readingMinutes;
  }
}

export { categoryLabels } from './labels';
import type { CardData } from './labels';
export const toCard = (a: Article): CardData => ({ id: a.id, slug: a.slug, title: a.title, excerpt: a.excerpt, category: a.category, assetId: a.assetId, minutes: readingMinutes(a) });
