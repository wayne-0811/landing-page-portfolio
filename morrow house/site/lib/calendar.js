// Date helpers for the How we work calendar: real month grids (Monday
// first) and bookings placed on real dates. Plain local dates, no time zones.

export const WEEKDAYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
export const WEEKDAY_LABELS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const MONTHS_SHORT = MONTHS.map((m) => m.slice(0, 3));

const weekdayMon = (d) => (d.getDay() + 6) % 7;
const isWorkday = (d) => weekdayMon(d) < 5;
const sameDay = (a, b) => a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate();
export const dayKey = (d) => `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;

/** The first month of the example schedule: next month from `today`. */
export function startMonth(today = new Date()) {
  return { year: today.getFullYear(), month: today.getMonth() + 1 };
}

/** { year, month } plus `offset` months, normalised. */
export function addMonths({ year, month }, offset) {
  const d = new Date(year, month + offset, 1);
  return { year: d.getFullYear(), month: d.getMonth() };
}

export const monthLabel = ({ year, month }) => `${MONTHS[month]} ${year}`;
export const dateLabel = (d, withYear = false) =>
  `${WEEKDAY_LABELS[weekdayMon(d)]} ${d.getDate()} ${MONTHS_SHORT[d.getMonth()]}${withYear ? ` ${d.getFullYear()}` : ''}`;

/** 42 cells (6 weeks, Monday first) covering the month. */
export function monthGrid({ year, month }) {
  const offset = weekdayMon(new Date(year, month, 1));
  return Array.from({ length: 42 }, (_, i) => {
    const date = new Date(year, month, 1 - offset + i);
    return { date, inMonth: date.getMonth() === month };
  });
}

function daysOfMonth({ year, month }) {
  const out = [];
  for (let d = new Date(year, month, 1); d.getMonth() === month; d = new Date(year, month, d.getDate() + 1)) out.push(d);
  return out;
}

function addWorkdays(date, n) {
  let d = new Date(date);
  let left = n;
  while (left > 0) {
    d = new Date(d.getFullYear(), d.getMonth(), d.getDate() + 1);
    if (isWorkday(d)) left--;
  }
  return d;
}

/**
 * Bookings for one phase, placed in `ym`. Returns one entry per occurrence:
 * { id, date, time, title, reveal, recurring, inMonth }. A booking a year
 * on (yearAfter) falls outside the month and has inMonth: false.
 */
export function placeBookings(bookings, ym) {
  const days = daysOfMonth(ym);
  const placed = [];
  const firstOf = (id) => placed.find((p) => p.id === id)?.date;
  for (const b of bookings) {
    const base = { id: b.id, time: b.time, title: b.title, reveal: b.reveal };
    if (b.every) {
      days.filter((d) => WEEKDAYS[weekdayMon(d)] === b.every)
        .forEach((date) => placed.push({ ...base, date, recurring: true, inMonth: true }));
    } else if (b.nth) {
      const matches = days.filter((d) => WEEKDAYS[weekdayMon(d)] === b.day);
      const date = matches[Math.min(b.nth, matches.length) - 1];
      placed.push({ ...base, date, inMonth: true });
    } else if (b.workday) {
      placed.push({ ...base, date: days.filter(isWorkday)[b.workday - 1], inMonth: true });
    } else if (b.after) {
      const [id, n] = b.after;
      const from = firstOf(id);
      const date = new Date(from.getFullYear(), from.getMonth(), from.getDate() + n);
      placed.push({ ...base, date, inMonth: date.getMonth() === ym.month });
    } else if (b.afterWorkdays) {
      const [id, n] = b.afterWorkdays;
      const date = addWorkdays(firstOf(id), n);
      placed.push({ ...base, date, inMonth: date.getMonth() === ym.month });
    } else if (b.yearAfter) {
      const from = firstOf(b.yearAfter);
      // 52 weeks on keeps the same weekday.
      const date = new Date(from.getFullYear(), from.getMonth(), from.getDate() + 364);
      placed.push({ ...base, date, inMonth: false });
    }
  }
  return placed.sort((a, b) => a.date - b.date);
}

export { sameDay };
