import { ArrowUpRight, ArrowDown, ArrowRight, ArrowUp, ChevronLeft, ChevronRight, Plus, Star, Check } from 'lucide-react';

const ICONS = {
  'up-right': ArrowUpRight,
  down: ArrowDown,
  right: ArrowRight,
  up: ArrowUp,
  prev: ChevronLeft,
  next: ChevronRight,
  plus: Plus,
  star: Star,
  check: Check,
};

// Thin line icons from Lucide. Decorative unless a label is given.
export function Icon({ name = 'up-right', size = 14, label, className, strokeWidth = 1.5, ...rest }) {
  const Glyph = ICONS[name];
  return (
    <Glyph
      size={size}
      strokeWidth={strokeWidth}
      className={['icon', className].filter(Boolean).join(' ')}
      aria-hidden={label ? undefined : true}
      aria-label={label}
      role={label ? 'img' : undefined}
      focusable="false"
      {...rest}
    />
  );
}
