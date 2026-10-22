export function Eyebrow({ children, tone, as: Tag = 'p' }) {
  return (
    <Tag className={['eyebrow', tone && `eyebrow--${tone}`].filter(Boolean).join(' ')}>
      <span className="eyebrow__sq" aria-hidden="true" />
      <span>{children}</span>
    </Tag>
  );
}
