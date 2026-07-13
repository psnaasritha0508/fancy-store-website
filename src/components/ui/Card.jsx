// ─────────────────────────────────────────────────────────────────────────────
// Card — Reusable surface card with multiple variants
// ─────────────────────────────────────────────────────────────────────────────

const VARIANT_CLASSES = {
  default: 'card-base',
  elevated: [
    'card-base',
    'shadow-[var(--shadow-md)] hover:shadow-[var(--shadow-lg)]',
  ].join(' '),
  outlined: [
    'bg-[var(--color-card)]',
    'border-2 border-[var(--color-border)]',
    'rounded-[0.875rem]',
    'hover:border-[var(--color-primary)]',
    'transition-colors duration-[250ms]',
  ].join(' '),
  flat: [
    'bg-[var(--color-bg-alt)]',
    'rounded-[0.875rem]',
  ].join(' '),
}

const PADDING_CLASSES = {
  none: '',
  sm: 'p-3',
  md: 'p-5',
  lg: 'p-7',
  xl: 'p-9',
}

/**
 * Card
 * @param {'default'|'elevated'|'outlined'|'flat'} variant
 * @param {'none'|'sm'|'md'|'lg'|'xl'} padding
 * @param {boolean} hoverable  — enables hover lift
 * @param {boolean} clickable  — adds cursor-pointer
 */
export default function Card({
  variant   = 'default',
  padding   = 'md',
  hoverable = true,
  clickable = false,
  className = '',
  children,
  ...props
}) {
  return (
    <div
      className={[
        VARIANT_CLASSES[variant] ?? VARIANT_CLASSES.default,
        PADDING_CLASSES[padding] ?? PADDING_CLASSES.md,
        hoverable ? 'transition-all duration-[250ms]' : '',
        clickable ? 'cursor-pointer' : '',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </div>
  )
}

// ─── Sub-components for composition ─────────────────────────────────────────

Card.Header = function CardHeader({ className = '', children, ...props }) {
  return (
    <div className={`mb-4 ${className}`} {...props}>
      {children}
    </div>
  )
}

Card.Body = function CardBody({ className = '', children, ...props }) {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  )
}

Card.Footer = function CardFooter({ className = '', children, ...props }) {
  return (
    <div
      className={`mt-4 pt-4 border-t border-[var(--color-border)] ${className}`}
      {...props}
    >
      {children}
    </div>
  )
}
