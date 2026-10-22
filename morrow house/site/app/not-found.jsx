import { PageFrame } from '../components/PageFrame';
import { ArrowLink } from '../components/ArrowLink';

export const metadata = { title: 'Page not found — Morrow House' };

// 404 copy from the copy deck's microcopy.
export default function NotFound() {
  return (
    <PageFrame>
      <section className="page-intro notfound">
        <div className="wrap">
          <p className="micro">404</p>
          <h1 className="page-intro__title notfound__title">We can’t find that page.</h1>
          <ArrowLink href="homes.html" icon="right" variant="rule">Back to the homes</ArrowLink>
        </div>
      </section>
    </PageFrame>
  );
}
