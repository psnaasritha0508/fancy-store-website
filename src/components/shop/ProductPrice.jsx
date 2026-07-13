import { formatCurrency } from '@utils'

// ─────────────────────────────────────────────────────────────────────────────
// Reusable ProductPrice Component
// Renders selling price, marked price, and discount percentage cleanly
// ─────────────────────────────────────────────────────────────────────────────

export default function ProductPrice({ markedPrice, sellingPrice, className = '', size = 'md' }) {
  const discount = Math.round(((markedPrice - sellingPrice) / markedPrice) * 100)

  const isLg = size === 'lg'

  return (
    <div className={['flex items-center flex-wrap gap-2.5', className].join(' ')}>
      {/* Selling Price */}
      <span
        className={[
          'font-heading font-bold',
          isLg ? 'text-2xl' : 'text-lg',
        ].join(' ')}
        style={{ color: 'var(--color-primary)' }}
      >
        {formatCurrency(sellingPrice, 'INR').replace('INR', '₹').replace(/\s/g, '')}
      </span>

      {/* Marked Price */}
      <span
        className={[
          'font-body line-through text-neutral-400 dark:text-neutral-500',
          isLg ? 'text-base' : 'text-sm',
        ].join(' ')}
      >
        {formatCurrency(markedPrice, 'INR').replace('INR', '₹').replace(/\s/g, '')}
      </span>

      {/* Discount Badge */}
      {discount > 0 && (
        <span
          className={[
            'font-body font-extrabold rounded-full px-2 py-0.5 text-xs text-white bg-amber-500',
          ].join(' ')}
        >
          {discount}% OFF
        </span>
      )}
    </div>
  )
}
