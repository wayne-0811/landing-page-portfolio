import { SectionHeading } from '../components/SectionHeading';
import { ArrowLink } from '../components/ArrowLink';
import { Icon } from '../components/Icon';
import { reviews } from '../content/homepage';

function Stars({ label }) {
  return (
    <span className="stars" role="img" aria-label={label}>
      {[0, 1, 2, 3, 4].map((i) => <Icon key={i} name="star" size={14} fill="currentColor" strokeWidth={0} />)}
    </span>
  );
}

// In production these come from the Google Business Profile.
export function Reviews() {
  return (
    <section className="section reviews" id="reviews" aria-labelledby="reviews-title">
      <div className="wrap">
        <SectionHeading
          id="reviews-title"
          eyebrow={reviews.eyebrow}
          title={reviews.title}
          aside={
            <div className="reviews__score">
              <span className="reviews__rating">{reviews.rating}</span>
              <span className="reviews__count">
                <Stars label={`${reviews.rating} out of 5 stars`} />
                <span className="micro">{reviews.count}</span>
              </span>
            </div>
          }
        />
        <ul className="reviews__list">
          {reviews.items.map((r) => (
            <li key={r.name} className="review">
              <div className="review__who">
                <span className="review__avatar" aria-hidden="true">{r.name[0]}</span>
                <span>
                  <span className="review__name micro">{r.name}</span>
                  <span className="review__when body-s">{r.when}</span>
                </span>
              </div>
              <Stars label="5 out of 5 stars" />
              <blockquote className="review__quote">{r.quote}</blockquote>
            </li>
          ))}
        </ul>
        <div className="reviews__foot">
          <ArrowLink href="#reviews" variant="rule">{reviews.link}</ArrowLink>
          <p className="micro reviews__note">{reviews.note}</p>
        </div>
      </div>
    </section>
  );
}
