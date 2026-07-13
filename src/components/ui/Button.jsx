import { forwardRef } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// Button — Reusable, accessible button with multiple variants
// ─────────────────────────────────────────────────────────────────────────────

const VARIANT_CLASSES = {
  primary: [
    'bg-[var(--color-primary)] text-white',
    'hover:bg-[var(--color-primary-lt)]',
    'focus-visible:ring-[var(--color-primary)]',
    'shadow-[var(--shadow-sm)] hover:shadow-[var(--shadow-lg)]',
  ].join(' '),

  secondary: [
    'bg-[var(--color-secondary)] text-[var(--color-text)]',
    'hover:bg-[var(--color-secondary-lt)]',
    'focus-visible:ring-[var(--color-secondary)]',
    'shadow-[var(--shadow-gold)]',
  ].join(' '),

  outline: [
    'bg-transparent text-[var(--color-primary)]',
    'border-2 border-[var(--color-primary)]',
    'hover:bg-[var(--color-primary)] hover:text-white',
    'focus-visible:ring-[var(--color-primary)]',
  ].join(' '),

  ghost: [
    'bg-transparent text-[var(--color-text)]',
    'hover:bg-[var(--color-bg-alt)]',
    'focus-visible:ring-[var(--color-primary)]',
  ].join(' '),

  danger: [
    'bg-red-600 text-white',
    'hover:bg-red-700',
    'focus-visible:ring-red-500',
  ].join(' '),
}

const SIZE_CLASSES = {
  xs: 'px-3 py-1.5 text-xs rounded-lg gap-1',
  sm: 'px-4 py-2 text-sm rounded-xl gap-1.5',
  md: 'px-6 py-3 text-sm rounded-xl gap-2',
  lg: 'px-8 py-4 text-base rounded-2xl gap-2',
  xl: 'px-10 py-5 text-lg rounded-2xl gap-3',
}

/**
 * Button
 * @param {'primary'|'secondary'|'outline'|'ghost'|'danger'} variant
 * @param {'xs'|'sm'|'md'|'lg'|'xl'} size
 * @param {boolean} isLoading
 * @param {boolean} fullWidth
 * @param {React.ReactNode} leftIcon
 * @param {React.ReactNode} rightIcon
 */
const Button = forwardRef(function Button(
  {
    variant    = 'primary',
    size       = 'md',
    isLoading  = false,
    fullWidth  = false,
    leftIcon,
    rightIcon,
    disabled,
    className  = '',
    children,
    ...props
  },
  ref,
) {
  const isDisabled = disabled || isLoading

  return (
    <button
      ref={ref}
      disabled={isDisabled}
      className={[
        // Base
        'inline-flex items-center justify-center font-body font-semibold',
        'transition-all duration-[var(--transition-base)]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
        'select-none',
        // Variant
        VARIANT_CLASSES[variant] ?? VARIANT_CLASSES.primary,
        // Size
        SIZE_CLASSES[size] ?? SIZE_CLASSES.md,
        // State
        isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer active:scale-[0.98]',
        fullWidth ? 'w-full' : '',
        className,
      ].join(' ')}
      {...props}
    >
      {isLoading ? (
        <>
          <span
            className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin"
            aria-hidden="true"
          />
          <span>Loading…</span>
        </>
      ) : (
        <>
          {leftIcon && <span className="shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="shrink-0">{rightIcon}</span>}
        </>
      )}
    </button>
  )
})

export default Button
