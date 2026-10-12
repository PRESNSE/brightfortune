'use client';
import { useState } from 'react';
import type { CardData } from '@/lib/labels';
import { GuideCard } from './GuideCard';

interface Props { categories: { id: string; label: string }[]; items: CardData[]; initial: string }

export function ResourceFilter({ categories, items, initial }: Props) {
  const [active, setActive] = useState(categories.some((c) => c.id === initial) ? initial : 'all');
  const shown = active === 'all' ? items : items.filter((i) => i.category === active);
  const label = categories.find((c) => c.id === active)?.label;
  const choose = (id: string) => {
    setActive(id);
    window.history.replaceState(null, '', id === 'all' ? '/resources' : `/resources?category=${id}`);
  };
  return (
    <>
      <div className="tabs" role="group" aria-label="Filter guides by category">
        {[{ id: 'all', label: 'All' }, ...categories].map((c) => (
          <button key={c.id} type="button" className="tab" aria-pressed={active === c.id} onClick={() => choose(c.id)}>{c.label}</button>
        ))}
      </div>
      <p className="count" role="status" aria-live="polite">
        {shown.length === 0 ? 'No guides in this category yet.' : `Showing ${shown.length} ${shown.length === 1 ? 'guide' : 'guides'}${active === 'all' ? '' : ` in ${label}`}.`}
      </p>
      {shown.length === 0 ? (
        <p><button type="button" className="tab" onClick={() => choose('all')}>View all guides</button></p>
      ) : (
        <ul className="gcards" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {shown.map((a) => (<li key={a.id} style={{ display: 'flex' }}><GuideCard a={a} /></li>))}
        </ul>
      )}
    </>
  );
}
