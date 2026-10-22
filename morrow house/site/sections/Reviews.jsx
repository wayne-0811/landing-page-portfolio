import { SectionHeading } from '../components/SectionHeading';
import { ArrowLink } from '../components/ArrowLink';
import { Icon } from '../components/Icon';
import ScrollReelTestimonials from '@/components/ui/scroll-reel-testimonials';
import { reviews } from '../content/homepage';

function Stars({ label }) {
  return (
    <span className="stars" role="img" aria-label={label}>
      {[0, 1, 2, 3, 4].map((i) => <Icon key={i} name="star" size={14} fill="currentColor" strokeWidth={0} />)}
    </span>
  );
}

const testimonials = reviews.items.map((r) => ({
  quote: r.quote,
  author: r.name,
  detail: r.when,
  rating: 5,
  image: r.image,
}));

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
        <div className="reviews__reel">
          <ScrollReelTestimonials testimonials={testimonials} />
        </div>
        <div className="reviews__foot">
          <ArrowLink href="#reviews" variant="rule">{reviews.link}</ArrowLink>
          <p className="micro reviews__note">{reviews.note}</p>
        </div>
      </div>
    </section>
  );
}
