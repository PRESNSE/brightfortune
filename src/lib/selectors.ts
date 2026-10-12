import type { Service, Article, Topic } from './types';
export const allowedTopics: readonly Topic[] = ['commercial-general', 'property-fire', 'marine', 'life-protection', 'medical-dental', 'claims', 'other'];
export function normaliseTopic(value: string | null | undefined): Topic {
  return allowedTopics.includes(value as Topic) ? (value as Topic) : 'other';
}
export const serviceHref = (slug: string) => `/what-we-do/${encodeURIComponent(slug)}`;
export const articleHref = (slug: string) => `/insights/${encodeURIComponent(slug)}`;
export const contactHref = (topic: string) => `/contact?topic=${normaliseTopic(topic)}`;
export function relatedServices(all: Service[], service: Service): Service[] {
  return service.related.map((id) => all.find((s) => s.slug === id)).filter((v): v is Service => !!v);
}
export function relatedArticles(all: Article[], current: Article, count = 2): Article[] {
  return all
    .filter((a) => a.id !== current.id)
    .sort((a, b) => Number(b.category === current.category) - Number(a.category === current.category))
    .slice(0, count);
}
/** Topic for a service-like href, used for CTA prefill. */
export function topicFromHref(href: string): Topic {
  return normaliseTopic(href.split('/').pop());
}
