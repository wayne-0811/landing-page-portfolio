import { SiteHeader } from '../components/SiteHeader';
import { Eyebrow } from '../components/Eyebrow';
import { Icon } from '../components/Icon';
import { AwardSeal } from '../components/AwardSeal';
import { CompareSlider } from '../components/CompareSlider';
import { ClosingCta } from '../components/ClosingCta';
import { nav } from '../content/homepage';
import { homeHref, neighbours, stillwater } from '../content/homes';

const pad = (n) => String(n).padStart(2, '0');

function Hero({ home }) {
  return (
    <section className="dhero" aria-labelledby="dhero-title">
      <img className="dhero__img" src={home.hero.src} alt={home.hero.alt} style={{ objectPosition: home.hero.position }} fetchPriority="high" />
      <div className="hero__scrim" aria-hidden="true" />
      <SiteHeader links={nav.links} cta={nav.cta} current="homes.html" />
      <div className="wrap dhero__content">
        <a className="dhero__back label" href="homes.html">
          <Icon name="prev" size={14} />All homes
        </a>
        <div className="dhero__foot">
          <div className="dhero__title">
            <p className="micro dhero__meta">{home.place} · {home.year} · {home.type}</p>
            <h1 className="dhero__name" id="dhero-title">{home.name}</h1>
          </div>
          <a className="dhero__scroll label" href="#the-home">Scroll <span aria-hidden="true">↓</span></a>
        </div>
      </div>
    </section>
  );
}

function Overview({ home }) {
  return (
    <section className="section doverview" id="the-home" aria-labelledby="the-home-title">
      <div className="wrap doverview__grid">
        <div className="doverview__lead">
          <div className="doverview__labels">
            <Eyebrow>The home</Eyebrow>
            {home.award && (
              <span className="award-tag">
                <AwardSeal year={home.award.slice(-4)} uid={`detail-${home.slug}`} size={44} />
                <span className="micro">{home.award}</span>
              </span>
            )}
          </div>
          <h2 className="doverview__tagline" id="the-home-title">{home.tagline}</h2>
        </div>
        <div className="doverview__body">
          <p className="doverview__summary">{home.summary}</p>
          <dl className="specs">
            {home.specs.map(([label, value]) => (
              <div key={label}>
                <dt className="micro">{label}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
          {!home.caseStudy && (
            <p className="micro doverview__note">
              {home.illustrative ? 'An illustrative home. Its full story isn’t written yet.' : 'The full case study is on its way.'}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

function Drawing() {
  const d = stillwater.drawing;
  return (
    <section className="section compare ddrawing" aria-labelledby="ddrawing-title">
      <div className="wrap">
        <div className="shead__main">
          <Eyebrow>{d.eyebrow}</Eyebrow>
          <h2 className="h2" id="ddrawing-title">{d.title}</h2>
        </div>
        <CompareSlider rendering={d.rendering} built={d.built} hint="Drag to compare the rendering with the finished home." />
      </div>
    </section>
  );
}

function Rooms({ rooms, start }) {
  return (
    <section className="section drooms" aria-label="Rooms">
      <div className="wrap drooms__list">
        {rooms.map((r, i) => {
          const n = start + i;
          return (
            <figure key={r.title} className={`droom${n % 2 ? ' droom--flip' : ''}`}>
              <div className="droom__media">
                {r.image ? (
                  <img src={r.image.src} alt={r.image.alt} style={{ objectPosition: r.image.position }} loading="lazy" />
                ) : (
                  <span className="droom__placeholder micro">Photograph to come</span>
                )}
              </div>
              <figcaption className="droom__caption">
                <span className="droom__num">{pad(n + 1)}</span>
                <h3 className="droom__title">{r.title}</h3>
                <p className="body">{r.text}</p>
              </figcaption>
            </figure>
          );
        })}
      </div>
    </section>
  );
}

function Challenges() {
  const c = stillwater.challenges;
  return (
    <section className="section section--stone dchallenges" aria-labelledby="dchallenges-title">
      <div className="wrap">
        <div className="shead__main">
          <Eyebrow>{c.eyebrow}</Eyebrow>
          <h2 className="h2" id="dchallenges-title">{c.title}</h2>
        </div>
        <div className="dchallenges__grid">
          <ul className="dchallenges__pairs">
            {c.items.map((it) => (
              <li key={it.problem} className="dpair">
                <div className="dpair__card">
                  <span className="micro">Problem</span>
                  <p className="dpair__text">{it.problem}</p>
                </div>
                <div className="dpair__card dpair__card--solution">
                  <span className="micro">Solution</span>
                  <p className="dpair__text">{it.solution}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="dchallenges__photos">
            {c.photos.map((p) => (
              <figure key={p.src} className="dphoto">
                <img src={p.src} alt={p.alt} loading="lazy" />
                <figcaption className="micro">{p.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Build() {
  const b = stillwater.build;
  return (
    <section className="section dbuild" aria-labelledby="dbuild-title">
      <div className="wrap">
        <Eyebrow>{b.eyebrow}</Eyebrow>
        <h2 className="sr-only" id="dbuild-title">The build</h2>
        <ol className="dbuild__bar">
          {b.phases.map(([name, months], i) => (
            <li key={name} className={`dbuild__phase ph-${i + 1}`} style={{ flexGrow: months }}>
              <span className="dbuild__fill" aria-hidden="true" />
              <span className="micro dbuild__label">{name}</span>
            </li>
          ))}
        </ol>
        <ul className="dbuild__photos">
          {b.photos.map((p) => (
            <li key={p.caption}>
              <figure className="dphoto">
                <img src={p.src} alt={p.alt} loading="lazy" />
                <figcaption className="micro">{p.caption}</figcaption>
              </figure>
            </li>
          ))}
        </ul>
        <p className="dbuild__result">{b.result}</p>
      </div>
    </section>
  );
}

function OwnersReview() {
  const r = stillwater.review;
  return (
    <section className="section section--stone dreview" aria-label="The owners’ review">
      <div className="wrap dreview__grid">
        <div className="dreview__media">
          <img src={r.image.src} alt={r.image.alt} style={{ objectPosition: r.image.position }} loading="lazy" />
        </div>
        <figure className="dreview__body">
          <blockquote className="dreview__quote">{r.quote}</blockquote>
          <figcaption className="micro dreview__who">{r.name} · {r.detail}</figcaption>
          <dl className="dreview__answers">
            {r.answers.map(([q, a]) => (
              <div key={q}>
                <dt className="micro">{q}</dt>
                <dd>{a}</dd>
              </div>
            ))}
          </dl>
        </figure>
      </div>
    </section>
  );
}

function Materials({ home }) {
  const withPhotos = home.materials.every((m) => m.image);
  return (
    <section className="section dmaterials" aria-labelledby="dmaterials-title">
      <div className="wrap">
        <div className="dmaterials__head">
          <Eyebrow>Materials</Eyebrow>
          <h2 className="h2" id="dmaterials-title">{home.materials.map((m) => m.name).join(' · ')}</h2>
        </div>
        <ul className={`dmaterials__list${withPhotos ? '' : ' dmaterials__list--text'}`}>
          {home.materials.map((m) => (
            <li key={m.name} className="dmaterial">
              {withPhotos && (
                <span className="dmaterial__swatch">
                  <img src={m.image.src} alt="" style={{ objectPosition: m.image.position }} loading="lazy" />
                </span>
              )}
              <span className="micro dmaterial__name">{m.name}</span>
              <span className="body-s">{m.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function PrevNext({ home }) {
  const { prev, next } = neighbours(home.slug);
  const side = (h, dir) => (
    <a className={`dpn__link dpn__link--${dir}`} href={homeHref(h)}>
      <span className="dpn__thumb"><img src={h.image.src} alt="" style={{ objectPosition: h.image.position }} loading="lazy" /></span>
      <span className="dpn__text">
        <span className="label dpn__dir">{dir === 'prev' ? '← Previous' : 'Next →'}</span>
        <span className="dpn__name">{h.name}</span>
        <span className="dpn__tagline">{h.tagline}</span>
      </span>
    </a>
  );
  return (
    <nav className="wrap dpn" aria-label="More homes">
      {side(prev, 'prev')}
      {side(next, 'next')}
    </nav>
  );
}

// One home's page. Stillwater House carries the full case study; the other
// homes show the parts their data supports.
export function HomeDetail({ home }) {
  const rooms = stillwater.rooms;
  return (
    <>
      <Hero home={home} />
      <Overview home={home} />
      {home.caseStudy && (
        <>
          <Drawing />
          <Rooms rooms={rooms.slice(0, 2)} start={0} />
          <Challenges />
          <Rooms rooms={rooms.slice(2)} start={2} />
          <Build />
          <OwnersReview />
        </>
      )}
      <Materials home={home} />
      <PrevNext home={home} />
      <ClosingCta title={stillwater.closing.title} button={stillwater.closing.button} />
    </>
  );
}
