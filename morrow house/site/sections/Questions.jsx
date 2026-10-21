'use client';

import { useState } from 'react';
import { Eyebrow } from '../components/Eyebrow';
import { Icon } from '../components/Icon';
import { questions } from '../content/homepage';

// One answer open at a time.
export function Questions() {
  const [open, setOpen] = useState(0);
  return (
    <section className="section faq" aria-labelledby="faq-title">
      <div className="wrap faq__grid">
        <div>
          <Eyebrow>{questions.eyebrow}</Eyebrow>
          <h2 className="sr-only" id="faq-title">{questions.eyebrow}</h2>
        </div>
        <div className="faq__list">
          {questions.items.map((item, i) => {
            const isOpen = open === i;
            return (
              <div key={item.q} className={['faq__item', isOpen && 'is-open'].filter(Boolean).join(' ')}>
                <h3>
                  <button
                    type="button"
                    className="faq__q"
                    aria-expanded={isOpen}
                    aria-controls={`faq-a-${i}`}
                    id={`faq-q-${i}`}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    <span>{item.q}</span>
                    <Icon name="plus" size={20} className="faq__icon" />
                  </button>
                </h3>
                <div className="faq__a" id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} hidden={!isOpen}>
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
