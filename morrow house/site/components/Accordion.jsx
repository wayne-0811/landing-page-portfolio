'use client';

import { useState } from 'react';
import { Eyebrow } from './Eyebrow';
import { Icon } from './Icon';

// Questions and answers, one open at a time. With a title, the heading shows;
// without one, the eyebrow labels the list and a hidden heading names it.
export function Accordion({ id, eyebrow, title, items, className = '' }) {
  const [open, setOpen] = useState(0);
  return (
    <section className={`section faq ${className}`} aria-labelledby={`${id}-title`}>
      <div className="wrap faq__grid">
        <div className="faq__intro">
          <Eyebrow>{eyebrow}</Eyebrow>
          {title
            ? <h2 className="h2" id={`${id}-title`}>{title}</h2>
            : <h2 className="sr-only" id={`${id}-title`}>{eyebrow}</h2>}
        </div>
        <div className="faq__list">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className={['faq__item', isOpen && 'is-open'].filter(Boolean).join(' ')}>
                <h3>
                  <button
                    type="button"
                    className="faq__q"
                    aria-expanded={isOpen}
                    aria-controls={`${id}-a-${i}`}
                    id={`${id}-q-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    <span>{item.q}</span>
                    <Icon name="plus" size={20} className="faq__icon" />
                  </button>
                </h3>
                <div className="faq__a" id={`${id}-a-${i}`} role="region" aria-labelledby={`${id}-q-${i}`} hidden={!isOpen}>
                  <p className="body">{item.a}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
