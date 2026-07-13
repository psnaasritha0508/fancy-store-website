// ─────────────────────────────────────────────────────────────────────────────
// Container — Responsive width-constrained layout wrapper
// ─────────────────────────────────────────────────────────────────────────────

const MAX_WIDTHS = {
  sm:   'max-w-3xl',
  md:   'max-w-5xl',
  lg:   'max-w-7xl',  // default
  xl:   'max-w-screen-2xl',
  full: 'max-w-full',
}

/**
 * Container
 * @param {'sm'|'md'|'lg'|'xl'|'full'} maxWidth
 * @param {boolean} centered — mx-auto
 */
export default function Container({
  maxWidth  = 'lg',
  centered  = true,
  className = '',
  children,
  ...props
}) {
  return (
    <div
      className={[
        'w-full px-4 sm:px-6 lg:px-8',
        MAX_WIDTHS[maxWidth] ?? MAX_WIDTHS.lg,
        centered ? 'mx-auto' : '',
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </div>
  )
}
