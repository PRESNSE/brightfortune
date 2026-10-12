'use client';
import { useState } from 'react';

export function Marquee({ items }: { items: string[] }) {
  const [paused, setPaused] = useState(false);
  const half = Math.ceil(items.length / 2);
  const rows = [items, [...items.slice(half), ...items.slice(0, half)]];
  return (
    <section id="H08" className={`marquee${paused ? ' paused' : ''}`} aria-label="Areas of expertise">
      <div className="container sr-only"><ul>{items.map((i) => <li key={i}>{i}</li>)}</ul></div>
      {rows.map((row, r) => (
        <div key={r} className={`m-row${r === 1 ? ' rev dup' : ''}`} aria-hidden={r === 1 ? true : undefined}>
          <div className="m-inner" aria-hidden="true">
            {[0, 1].map((k) => (
              <div key={k} className="m-track" aria-hidden={k === 1 ? true : undefined}>
                {row.map((t) => (<span key={t} style={{ display: 'contents' }}><span>{t}</span><i /></span>))}
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="container mq-ctl">
        <button type="button" aria-pressed={paused} onClick={() => setPaused((p) => !p)}>{paused ? 'Play motion' : 'Pause motion'}</button>
      </div>
    </section>
  );
}
