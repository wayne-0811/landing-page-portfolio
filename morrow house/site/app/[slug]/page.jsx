import { PageFrame } from '../../components/PageFrame';
import { HomeDetail } from '../../sections/HomeDetail';
import { homes } from '../../content/homes';

// One page per home, exported as a flat file (stillwater-house.html …).
export const dynamicParams = false;

export function generateStaticParams() {
  return homes.map((h) => ({ slug: h.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const home = homes.find((h) => h.slug === slug);
  return {
    title: `${home.name} — Morrow House`,
    description: `${home.name}, ${home.place}: ${home.description} A concept site.`,
  };
}

export default async function HomePage({ params }) {
  const { slug } = await params;
  const home = homes.find((h) => h.slug === slug);
  return (
    <PageFrame header={false}>
      <HomeDetail home={home} />
    </PageFrame>
  );
}
