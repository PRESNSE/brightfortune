export type ServiceSlug = 'commercial-general' | 'property-fire' | 'marine' | 'life-protection' | 'medical-dental';
export type Topic = ServiceSlug | 'claims' | 'other';
export type AssetId = 'harbour' | 'architecture' | 'marine' | 'workplace' | 'life' | 'health';
export interface TextItem { title: string; body: string }
export interface Faq { question: string; answer: string }
export interface Service {
  slug: ServiceSlug; title: string; summary: string; assetId: AssetId;
  introHeading: string; introBody: string[]; coverageHeading: string;
  coverages: (TextItem & { status: string })[];
  considerationsHeading: string; considerations: TextItem[]; audience: string[];
  faqs: Faq[]; related: ServiceSlug[]; resourceIds: string[]; ctaLabel: string; availabilityNote: string;
}
export interface Article {
  id: string; slug: string; title: string; category: string; assetId: AssetId;
  excerpt: string; summary: string; bodyFile: string; relatedServiceHref: string;
  author: string; reviewer: string | null; publishedAt: string | null; modifiedAt: string | null;
  approvalKey: string; readingMinutes: number;
}
export interface RouteSpec {
  path: string;
  template: 'home' | 'about' | 'hub' | 'service' | 'claims' | 'contact' | 'resources' | 'insights' | 'article' | 'legal';
  contentId?: string; title: string; description: string; intent: string; indexAfterApproval: boolean;
}
