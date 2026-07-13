import Container from './Container'

// ─────────────────────────────────────────────────────────────────────────────
// Section — Full-width section wrapper with optional container + title
// ─────────────────────────────────────────────────────────────────────────────

const BG_VARIANTS = {
  default:  '',
  alt:      'bg-[var(--color-bg-alt)]',
  primary:  'bg-[var(--color-primary)]',
  dark:     'bg-charcoal-900',
}

/**
 * Section
 * @param {'default'|'alt'|'primary'|'dark'} bg
 * @param {string} title        — optional section heading
 * @param {string} subtitle     — optional subtitle below heading
 * @param {boolean} withContainer — wraps content in Container
 * @param {'sm'|'md'|'lg'} containerWidth
 */
export default function Section({
  bg             = 'default',
  title,
  subtitle,
  withContainer  = true,
  containerWidth = 'lg',
  className      = '',
  children,
  ...props
}) {
  const content = withContainer
    ? <Container maxWidth={containerWidth}>{children}</Container>
    : children

  return (
    <section
      className={[
        'section-padding',
        BG_VARIANTS[bg] ?? '',
        className,
      ].join(' ')}
      {...props}
    >
      {(title || subtitle) && (
        <Container maxWidth={containerWidth}>
          <div className="text-center mb-10 sm:mb-14">
            {title && (
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-3"
                  style={{ color: 'var(--color-text)' }}>
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="font-body text-base sm:text-lg max-w-2xl mx-auto"
                 style={{ color: 'var(--color-text-muted)' }}>
                {subtitle}
              </p>
            )}
            <div className="divider-gold w-24 mx-auto mt-5" />
          </div>
        </Container>
      )}
      {content}
    </section>
  )
}
