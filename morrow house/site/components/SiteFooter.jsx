import { Logo } from './Logo';

export function SiteFooter({ tagline, links, contacts, signoff, legal, concept }) {
  return (
    <footer className="site-foot">
      <div className="wrap">
        <div className="site-foot__top">
          <div className="site-foot__brand">
            <Logo mark={false} size="footer" />
            <p className="site-foot__tagline">{tagline}</p>
          </div>
          <ul className="site-foot__col">
            {links.map((l) => <li key={l.label}><a href={l.href}>{l.label}</a></li>)}
          </ul>
          <ul className="site-foot__col">
            {contacts.map((l) => <li key={l.label}><a href={l.href}>{l.label}</a></li>)}
          </ul>
          <a className="site-foot__top-link label" href="#top">Back to top <span aria-hidden="true">{'↑︎'}</span></a>
        </div>
        <p className="site-foot__signoff">{signoff}</p>
        <div className="site-foot__legal micro">
          <span>{legal[0]}</span>
          <span>{concept}</span>
          <span>{legal[1]}</span>
        </div>
      </div>
    </footer>
  );
}
