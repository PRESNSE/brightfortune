import assetsJson from '@/data/assets.json';
import type { AssetId } from './types';
export const assets = assetsJson as Record<AssetId, { alt: string; focalPoint: string; card: string; mobile: string; hero: string }>;
