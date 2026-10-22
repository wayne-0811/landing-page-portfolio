'use client';

import { useEffect, useState } from 'react';
import { Logo } from './Logo';
import { Button } from './Button';

// tone "image" sits over a hero photo; tone "page" is a plain bar on linen.
// Below 1040px the nav collapses to a Menu toggle that opens a full-width panel.
export function SiteHeader({ links, cta, tone = 'image', current }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    const wide = window.matchMedia('(min-width: 1041px)');
    const onWide = () => wide.matches && setOpen(false);
    document.addEventListener('keydown', onKey);
    wide.addEventListener('change', onWide);
    return () => {
      document.removeEventListener('keydown', onKey);
      wide.removeEventListener('change', onWide);
    };
  }, [open]);

  return (
    <header className={['site-head', `site-head--${tone}`, open && 'is-open'].filter(Boolean).join(' ')}>
      <div className="wrap site-head__bar">
        <Logo />
        <nav className="site-head__nav" aria-label="Main">
          {links.map((l) => (
            <a key={l.label} className="site-head__link" href={l.href} aria-current={l.href === current ? 'page' : undefined}>{l.label}</a>
          ))}
          <Button href={cta.href} variant={tone === 'image' ? 'inverse' : undefined}>{cta.label}</Button>
        </nav>
        <button
          className="site-head__toggle"
          type="button"
          aria-expanded={open}
          aria-controls="menu-panel"
          onClick={() => setOpen(!open)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>
      <nav id="menu-panel" className="menu-panel" aria-label="Main" hidden={!open}>
        <div className="wrap">
          {links.map((l) => (
            <a key={l.label} className="menu-panel__link" href={l.href} aria-current={l.href === current ? 'page' : undefined} onClick={() => setOpen(false)}>{l.label}</a>
          ))}
          <Button href={cta.href} onClick={() => setOpen(false)} className="menu-panel__cta">{cta.label}</Button>
        </div>
      </nav>
    </header>
  );
}
