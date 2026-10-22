import { PageFrame } from '../../components/PageFrame';
import { PageIntro } from '../../components/PageIntro';
import { ClosingCta } from '../../components/ClosingCta';
import { HomesGallery } from '../../sections/HomesGallery';
import { gallery, homes } from '../../content/homes';

export const metadata = {
  title: 'Homes — Morrow House',
  description: 'Six homes across Western North Carolina, from new custom builds to renovations and a home in planning. A concept site.',
};

export default function HomesPage() {
  return (
    <PageFrame current="homes.html">
      <PageIntro
        eyebrow={`${gallery.eyebrow} / ${String(homes.length).padStart(2, '0')}`}
        note={gallery.region}
        title={gallery.title}
        body={gallery.body}
      />
      <HomesGallery />
      <ClosingCta title={gallery.closing.title} body={gallery.closing.body} button={gallery.closing.button} />
    </PageFrame>
  );
}
