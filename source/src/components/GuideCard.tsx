import Link from 'next/link';
import { categoryLabels, type CardData } from '@/lib/labels';
import type { AssetId } from '@/lib/types';
import { Arrow, Photo } from './ui';

export function GuideCard({ a, as: H = 'h3' }: { a: CardData; as?: 'h2' | 'h3' }) {
  return (
    <Link href={`/insights/${a.slug}`} className="gcard">
      <div className="ph"><Photo id={a.assetId as AssetId} sizes="(max-width:767px) 100vw, (max-width:1199px) 50vw, 33vw" decorative /></div>
      <div className="b">
        <span className="meta">{categoryLabels[a.category] ?? a.category} · {a.minutes} min read</span>
        <H>{a.title}</H>
        <p>{a.excerpt}</p>
        <span className="more linkarrow">Read the guide <Arrow /></span>
      </div>
    </Link>
  );
}
