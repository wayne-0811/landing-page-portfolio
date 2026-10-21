import { Stat } from '../components/Stat';
import { stats } from '../content/homepage';

export function Numbers() {
  return (
    <section className="numbers" aria-label="Morrow House in numbers">
      <ul className="wrap numbers__list">
        {stats.map((s) => <Stat key={s.label} {...s} />)}
      </ul>
    </section>
  );
}
