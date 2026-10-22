import './globals.css';
import '../styles/tokens/colors.css';
import '../styles/tokens/typography.css';
import '../styles/tokens/spacing.css';
import '../styles/tokens/effects.css';
import '../styles/tokens/base.css';
import '../styles/site.css';

/*
  CONCEPT PAGE. Morrow House is not a real business. The homes, figures,
  awards and reviews are sample content, the phone number is from the range
  reserved for fiction, and the enquiry form sends nothing.
*/

export const metadata = {
  title: 'Morrow House — considered custom homes in Asheville, NC',
  description:
    'Concept site for a made-up custom home builder in Western North Carolina. Custom homes, thoughtful renovations and pre-construction, from first sketch to final key.',
  icons: { icon: 'assets/house.svg' },
};

export const viewport = {
  themeColor: '#f2f0e9',
};

// A page reached by a link opens at its top. Browsers do this themselves, but
// some previews keep the last page's scroll position, or show the page at full
// height inside a scrolling frame, so the next home opened at its footer. This
// scrolls the window and asks any framing scroller to bring the top into view,
// once now and once more on load unless the visitor has started scrolling.
// Links to a #section and back/forward navigation keep their usual behaviour.
const startAtTop = `(function () {
  if (location.hash) return;
  var nav = performance.getEntriesByType && performance.getEntriesByType('navigation')[0];
  if (nav && nav.type !== 'navigate') return;
  var moved = false;
  function top() {
    if (moved) return;
    window.scrollTo(0, 0);
    document.body.scrollIntoView({ block: 'start' });
  }
  ['wheel', 'touchstart', 'keydown'].forEach(function (e) {
    addEventListener(e, function () { moved = true; }, { once: true, passive: true });
  });
  top();
  addEventListener('load', top, { once: true });
})();`;

export default function RootLayout({ children }) {
  return (
    <html lang="en-US">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Archivo:wght@400;500&family=Instrument+Serif:ital@0;1&display=swap"
        />
      </head>
      <body>
        <a className="skip" href="#main">Skip to content</a>
        {children}
        <script dangerouslySetInnerHTML={{ __html: startAtTop }} />
      </body>
    </html>
  );
}
