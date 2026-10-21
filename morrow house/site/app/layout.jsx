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
      </body>
    </html>
  );
}
