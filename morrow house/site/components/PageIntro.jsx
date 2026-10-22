import { Eyebrow } from './Eyebrow';

// Opening block of an inner page: eyebrow (with an optional right-hand
// note), the page's h1, and a short paragraph.
export function PageIntro({ eyebrow, note, title, body, children }) {
  const lines = Array.isArray(title) ? title : [title];
  return (
    <section className="page-intro">
      <div className="wrap">
        <div className="page-intro__top">
          <Eyebrow>{eyebrow}</Eyebrow>
          {note && <span className="micro">{note}</span>}
        </div>
        <div className="page-intro__main">
          <h1 className="page-intro__title">
            {lines.map((l) => <span key={l} className="line">{l}</span>)}
          </h1>
          {body && <p className="body page-intro__body">{body}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}
