import type { Service, Article, Topic } from './content-types';
export const allowedTopics: readonly Topic[] = ['commercial-general','property-fire','marine','life-protection','medical-dental','claims','other'];
export function normaliseTopic(value: string | null | undefined): Topic {
  return allowedTopics.includes(value as Topic) ? value as Topic : 'other';
}
export function serviceHref(slug: string): string { return `/what-we-do/${encodeURIComponent(slug)}`; }
export function articleHref(slug: string): string { return `/insights/${encodeURIComponent(slug)}`; }
export function contactHref(topic: string): string { return `/contact?topic=${normaliseTopic(topic)}`; }
export function relatedServices(all: Service[], service: Service): Service[] {
  return service.related.map(id => all.find(item => item.slug === id)).filter((v):v is Service => !!v);
}
export function relatedArticles(all: Article[], current: Article): Article[] {
  return all.filter(a=>a.id!==current.id).sort((a,b)=>Number(b.category===current.category)-Number(a.category===current.category)).slice(0,2);
}
