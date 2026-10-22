import { SiteHeader } from './SiteHeader';
import { SiteFooter } from './SiteFooter';
import { nav, footer } from '../content/homepage';

// Header, main and footer for the inner pages. Pages that open on a
// full-bleed photo render their own overlaid header (header={false}).
export function PageFrame({ current, header = true, children }) {
  return (
    <>
      <div id="top" />
      {header && <SiteHeader links={nav.links} cta={nav.cta} tone="page" current={current} />}
      <main id="main">{children}</main>
      <SiteFooter {...footer} />
    </>
  );
}
