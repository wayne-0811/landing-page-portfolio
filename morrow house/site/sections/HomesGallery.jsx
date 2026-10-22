'use client';

import { useEffect, useState } from 'react';
import { HomeCard } from '../components/HomeCard';
import { categories, gallery, homes } from '../content/homes';

const slugify = (c) => c.toLowerCase().replace(/[^a-z]+/g, '-');
const pad = (n) => String(n).padStart(2, '0');

// Filter chips over the staggered two-column grid. The filter lives in the
// URL (?type=renovations) so a filtered view can be shared or reloaded.
export function HomesGallery() {
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const type = new URLSearchParams(window.location.search).get('type');
    if (type && categories.some((c) => slugify(c) === type)) setFilter(type);
  }, []);

  const choose = (value) => {
    setFilter(value);
    const url = new URL(window.location.href);
    if (value === 'all') url.searchParams.delete('type');
    else url.searchParams.set('type', value);
    window.history.replaceState(null, '', url);
  };

  const shown = filter === 'all' ? homes : homes.filter((h) => slugify(h.category) === filter);
  const options = [
    { value: 'all', label: gallery.all, count: homes.length },
    ...categories.map((c) => ({ value: slugify(c), label: c, count: homes.filter((h) => h.category === c).length })),
  ];

  return (
    <section className="section gallery" aria-label="Homes">
      <div className="wrap">
        <div className="gallery__filters" role="group" aria-label="Filter homes">
          {options.map((o) => (
            <button
              key={o.value}
              type="button"
              className="gallery__filter"
              aria-pressed={filter === o.value}
              onClick={() => choose(o.value)}
            >
              {o.label}
              <span className="gallery__count" aria-label={`${o.count} homes`}>{pad(o.count)}</span>
            </button>
          ))}
        </div>

        <p className="sr-only" aria-live="polite">{shown.length} homes shown</p>

        {shown.length ? (
          <ul className="gallery__grid">
            {shown.map((h, i) => (
              <li key={h.slug} className="gallery__item">
                <HomeCard home={h} ratio={i % 4 === 0 || i % 4 === 3 ? '4 / 5' : '4 / 3'} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="body gallery__empty">
            {gallery.empty}{' '}
            <button type="button" className="gallery__reset" onClick={() => choose('all')}>{gallery.emptyLink} →</button>
          </p>
        )}
        <p className="micro gallery__note">{gallery.note}</p>
      </div>
    </section>
  );
}
