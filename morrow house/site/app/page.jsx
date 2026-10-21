import { Hero } from '../sections/Hero';
import { Numbers } from '../sections/Numbers';
import { Compare } from '../sections/Compare';
import { HomesCarousel } from '../sections/HomesCarousel';
import { WhyMorrow } from '../sections/WhyMorrow';
import { Timeline } from '../sections/Timeline';
import { Pricing } from '../sections/Pricing';
import { Recognition } from '../sections/Recognition';
import { Reviews } from '../sections/Reviews';
import { NextChapter } from '../sections/NextChapter';
import { Questions } from '../sections/Questions';
import { SiteFooter } from '../components/SiteFooter';
import { footer } from '../content/homepage';

export default function Home() {
  return (
    <>
      <div id="top" />
      <main id="main">
        <Hero />
        <Numbers />
        <Compare />
        <HomesCarousel />
        <WhyMorrow />
        <Timeline />
        <Pricing />
        <Recognition />
        <Reviews />
        <NextChapter />
        <Questions />
      </main>
      <SiteFooter {...footer} />
    </>
  );
}
