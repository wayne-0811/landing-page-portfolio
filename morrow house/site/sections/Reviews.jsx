import { SectionHeading } from '../components/SectionHeading';
import { ArrowLink } from '../components/ArrowLink';
import { Icon } from '../components/Icon';
import TestimonialSlider from '@/components/ui/testimonial-slider-1';
import { reviews } from '../content/homepage';

function Stars({ label }) {
  return (
    <span className="stars" role="img" aria-label={label}>
      {[0, 1, 2, 3, 4].map((i) => <Icon key={i} name="star" size={14} fill="currentColor" strokeWidth={0} />)}
    </span>
  );
}

const slides = reviews.items.map((r, i) => ({
  id: i,
  name: r.name,
  affiliation: `Google review · ${r.when}`,
  quote: r.quote,
  rating: 5,
  imageSrc: r.image,
  imagePosition: r.imagePosition,
}));

// In production these come from the Google Business Profile.
export function Reviews() {
  return (
    <section className="section section--forest reviews" id="reviews" aria-labelledby="reviews-title">
      <div className="wrap">
        <SectionHeading
          id="reviews-title"
          tone="dark"
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
        <div className="reviews__slider">
          <TestimonialSlider reviews={slides} />
        </div>
        <div className="reviews__foot">
          <ArrowLink href="#reviews" variant="rule" tone="dark">{reviews.link}</ArrowLink>
          <p className="micro reviews__note">{reviews.note}</p>
        </div>
      </div>
    </section>
  );
}
