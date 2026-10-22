'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { howWeWork } from '../content/pages';
import {
  WEEKDAY_LABELS, addMonths, dateLabel, dayKey, monthGrid, monthLabel, placeBookings, startMonth,
} from '../lib/calendar';

const { stages: steps, calendar, labels } = howWeWork;
const { detailLabels } = calendar;
const pad = (n) => String(n).padStart(2, '0');

// Each phase's month, its 42-day grid and its bookings on real dates.
function buildSchedule(start) {
  return steps.map((step, k) => {
    const ym = addMonths(start, step.monthOffset);
    const bookings = placeBookings(step.bookings, ym);
    const byDay = new Map();
    bookings.filter((b) => b.inMonth).forEach((b) => {
      const key = dayKey(b.date);
      byDay.set(key, [...(byDay.get(key) || []), b]);
    });
    return { k, step, ym, label: monthLabel(ym), grid: monthGrid(ym), bookings, byDay };
  });
}

// One line per booking, recurring ones folded into "Every Tuesday".
function agenda(bookings) {
  const seen = new Set();
  return bookings.flatMap((b) => {
    if (b.recurring) {
      if (seen.has(b.id)) return [];
      seen.add(b.id);
      return [{ ...b, when: `Every ${dateLabel(b.date).split(' ')[0]}` }];
    }
    return [{ ...b, when: dateLabel(b.date, !b.inMonth) }];
  });
}

function MonthGrid({ phase, revealed = Infinity, compact = false }) {
  const shown = (b) => b.reveal <= revealed;
  const lastShown = phase.bookings.filter((b) => b.inMonth && shown(b)).sort((a, b) => b.reveal - a.reveal || a.date - b.date)[0];
  return (
    <div className={`mcal${compact ? ' mcal--compact' : ''} ph-${phase.k + 1}`} aria-hidden="true">
      {WEEKDAY_LABELS.map((d) => <span key={d} className="mcal__dow micro">{compact ? d[0] : d}</span>)}
      {phase.grid.map(({ date, inMonth }) => {
        const items = inMonth ? (phase.byDay.get(dayKey(date)) || []).filter(shown) : [];
        const isNow = lastShown && inMonth && dayKey(lastShown.date) === dayKey(date);
        return (
          <div key={dayKey(date)} className={['mcal__day', !inMonth && 'is-out', isNow && 'is-now', items.length && 'has-booking'].filter(Boolean).join(' ')}>
            <span className="mcal__num">{date.getDate()}</span>
            {compact ? (
              items.length > 0 && <span className="mcal__dot" />
            ) : (
              <>
                {items.slice(0, 2).map((b) => (
                  <span key={b.id} className="mcal__chip">
                    {b.time && <span className="mcal__time">{b.time}</span>}
                    <span className="mcal__title">{b.title}</span>
                  </span>
                ))}
                {items.length > 2 && <span className="mcal__more">+{items.length - 2} more</span>}
              </>
            )}
          </div>
        );
      })}
    </div>
  );
}

function PhaseCard({ phase, latest, photo = true, live = false }) {
  const { step, k } = phase;
  return (
    <article className="cal-card" aria-live={live ? 'polite' : undefined} aria-atomic={live ? 'true' : undefined}>
      {photo && (
        <div className="cal-card__media">
          <img src={step.image.src} alt={step.image.alt} style={{ objectPosition: step.image.position }} loading="lazy" />
        </div>
      )}
      <div className="cal-card__body">
        <p className="micro cal-card__kicker">Stage {pad(k + 1)} · {step.time}</p>
        <h3 className="cal-card__title">{step.title}</h3>
        <p className="body">{step.text}</p>
        <dl className="cal-card__facts">
          {Object.entries(labels).map(([key, label]) => (
            <div key={key}>
              <dt className="micro">{label}</dt>
              <dd>{step[key]}</dd>
            </div>
          ))}
        </dl>
        <div className="cal-card__more">
          <div>
            <p className="micro">{detailLabels.meet}</p>
            <p className="cal-card__meet">{step.meet}</p>
          </div>
          <div>
            <p className="micro">{detailLabels.leave}</p>
            <ul className="cal-card__list">
              {step.leave.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        </div>
        {latest && (
          <p className="cal-card__booked">
            <span className="micro">Booked</span>
            <span>{dateLabel(latest.date, !latest.inMonth)}{latest.time ? ` · ${latest.time}` : ''} · {latest.title}</span>
          </p>
        )}
      </div>
    </article>
  );
}

// The six stages as a real calendar (How we work page). On wide screens the
// panel holds still while the page scrolls through a runway: each stage turns
// to its month and its bookings appear as you scroll, with a card on what to
// expect, who you'll meet and what you leave with. Dates start from the
// visitor's next month. Phones stack the stages instead.
export function Timeline() {
  const runway = useRef(null);
  const sticky = useRef(null);
  const [start, setStart] = useState(calendar.fallbackStart);
  const [pos, setPos] = useState({ k: 0, t: 0 });
  const schedule = useMemo(() => buildSchedule(start), [start]);

  // Real dates only in the browser, so the static export never freezes them.
  useEffect(() => setStart(startMonth(new Date())), []);

  useEffect(() => {
    const el = runway.current;
    let raf = 0;
    const update = () => {
      raf = 0;
      // Hidden (phones) or not pinned: nothing to drive.
      if (el.offsetParent === null || getComputedStyle(sticky.current).position !== 'sticky') return;
      const box = el.getBoundingClientRect();
      const travel = box.height - window.innerHeight;
      const p = Math.min(1, Math.max(0, -box.top / (travel || 1)));
      const k = Math.min(steps.length - 1, Math.floor(p * steps.length));
      const t = Math.min(1, p * steps.length - k);
      // Only re-render when a booking crosses its reveal point or the phase changes.
      const marks = steps[k].bookings.map((b) => b.reveal);
      const stepT = Math.max(0, ...marks.filter((m) => m <= t));
      setPos((prev) => (prev.k === k && prev.t === stepT ? prev : { k, t: stepT }));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const jump = useCallback((k) => {
    const el = runway.current;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const travel = el.offsetHeight - window.innerHeight;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: top + ((k + 0.9) / steps.length) * travel, behavior: reduce ? 'auto' : 'smooth' });
  }, []);

  const phase = schedule[pos.k];
  const revealedList = phase.bookings.filter((b) => b.reveal <= pos.t);
  const latest = revealedList.sort((a, b) => b.reveal - a.reveal || a.date - b.date)[0];

  return (
    <section className="section tl-section" id="schedule" aria-labelledby="schedule-title">
      <div className="wrap">
        <SectionHeading id="schedule-title" eyebrow={calendar.eyebrow} title={calendar.title} />
      </div>

      {/* Wide screens: pinned calendar */}
      <div className="cal-runway" ref={runway} style={{ '--phases': steps.length }}>
        <div className="cal-sticky" ref={sticky}>
          <div className="wrap cal-layout">
            <div className="cal">
              <div className="cal__phases" role="group" aria-label="Stages">
                {steps.map((s, k) => (
                  <button
                    key={s.title}
                    type="button"
                    className={`cal__phase ph-${k + 1}`}
                    aria-current={k === pos.k ? 'step' : undefined}
                    onClick={() => jump(k)}
                  >
                    <span className="cal__swatch" aria-hidden="true" />
                    <span className="cal__phase-name">{s.title}</span>
                  </button>
                ))}
              </div>

              <div className="mcal-head" key={`head-${pos.k}`}>
                <p className="mcal-head__month">{phase.label}</p>
                <p className="micro mcal-head__phase">Stage {pad(pos.k + 1)} · {phase.step.title}</p>
              </div>
              <div className="mcal-wrap" key={`grid-${pos.k}`}>
                <MonthGrid phase={phase} revealed={pos.t} />
              </div>
              <ul className="sr-only">
                {agenda(phase.bookings).map((b) => <li key={b.id}>{b.when}{b.time ? `, ${b.time}` : ''}: {b.title}</li>)}
              </ul>
              <p className="cal__note micro">{calendar.note}</p>
            </div>

            <div key={`card-${pos.k}`} className="cal-card-wrap">
              <PhaseCard phase={phase} latest={latest} live />
            </div>
          </div>
        </div>
      </div>

      {/* Phones: phases stacked, each with its month and bookings */}
      <div className="wrap cal-stack">
        {schedule.map((ph) => (
          <div key={ph.k} className="cal-stack__phase">
            <div className="mcal-head">
              <p className="mcal-head__month">{ph.label}</p>
              <p className="micro mcal-head__phase">Stage {pad(ph.k + 1)} · {ph.step.title}</p>
            </div>
            <MonthGrid phase={ph} compact />
            <ul className={`agenda ph-${ph.k + 1}`}>
              {agenda(ph.bookings).map((b) => (
                <li key={b.id}>
                  <span className="agenda__when micro">{b.when}{b.time ? ` · ${b.time}` : ''}</span>
                  <span className="agenda__title">{b.title}</span>
                </li>
              ))}
            </ul>
            <PhaseCard phase={ph} photo={false} />
          </div>
        ))}
        <p className="cal__note micro">{calendar.note}</p>
      </div>
    </section>
  );
}
