'use client';

import { useEffect, useState } from 'react';
import { Logo } from './Logo';
import { Button } from './Button';

// Sits over the hero photo. Below 1040px the nav collapses to a Menu toggle
// that opens a full-width panel.
export function SiteHeader({ links, cta }) {
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
    <header className={['site-head', open && 'is-open'].filter(Boolean).join(' ')}>
      <div className="wrap site-head__bar">
        <Logo />
        <nav className="site-head__nav" aria-label="Main">
          {links.map((l) => (
            <a key={l.label} className="site-head__link" href={l.href}>{l.label}</a>
          ))}
          <Button href={cta.href} variant="inverse">{cta.label}</Button>
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
            <a key={l.label} className="menu-panel__link" href={l.href} onClick={() => setOpen(false)}>{l.label}</a>
          ))}
          <Button href={cta.href} onClick={() => setOpen(false)} className="menu-panel__cta">{cta.label}</Button>
        </div>
      </nav>
    </header>
  );
}
