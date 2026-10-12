export const categoryLabels: Record<string, string> = {
  property: 'Property',
  marine: 'Marine',
  'life-protection': 'Life & Protection',
  'medical-dental': 'Medical & Dental',
  claims: 'Claims',
};
export interface CardData { id: string; slug: string; title: string; excerpt: string; category: string; assetId: string; minutes: number }
