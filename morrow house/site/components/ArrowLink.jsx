import { Icon } from './Icon';

// Uppercase label + brass arrow. variant "rule" sits on a hairline, "bare" has none.
export function ArrowLink({ children, href = '#', icon = 'up-right', variant = 'bare', tone, className, ...rest }) {
  const cls = ['alink', `alink--${variant}`, `alink--${icon}`, tone === 'dark' && 'alink--dark', className].filter(Boolean).join(' ');
  return (
    <a className={cls} href={href} {...rest}>
      <span>{children}</span>
      <Icon name={icon} size={14} className="alink__icon" />
    </a>
  );
}
