// Forest fill, uppercase label, trailing ↗︎ unless arrow is false or another glyph.
export function Button({ children, href, variant, size, arrow = '↗︎', className, ...rest }) {
  const cls = ['btn', variant && `btn--${variant}`, size && `btn--${size}`, className].filter(Boolean).join(' ');
  const content = (
    <>
      {children}
      {arrow && <span className="btn__arrow" aria-hidden="true">{arrow}</span>}
    </>
  );
  if (href) return <a className={cls} href={href} {...rest}>{content}</a>;
  return <button className={cls} type="button" {...rest}>{content}</button>;
}
