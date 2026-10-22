import { Button } from './Button';
import { nav } from '../content/homepage';

// Closing band: an optional headline and line, and the enquiry button.
export function ClosingCta({ title, body, button = nav.cta.label }) {
  return (
    <section className="section section--sand closing" aria-label={title || button}>
      <div className="wrap closing__inner">
        {title && (
          <div className="closing__text">
            <h2 className="h2">{title}</h2>
            {body && <p className="body">{body}</p>}
          </div>
        )}
        <Button href={nav.cta.href}>{button}</Button>
      </div>
    </section>
  );
}
