// ─────────────────────────────────────────────────────────────────────────────
// Reusable AvailabilityBadge Component
// Supports both string ('in-stock' / 'out-of-stock') and boolean (inStock) fields
// ─────────────────────────────────────────────────────────────────────────────

export default function AvailabilityBadge({ availability, inStock, className = '' }) {
  const isOutOfStock = availability === 'out-of-stock' || inStock === false

  return (
    <span
      className={[
        'font-body text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider',
        isOutOfStock
          ? 'bg-red-50 text-red-700 border border-red-200/50'
          : 'bg-emerald-50 text-emerald-700 border border-emerald-200/50',
        className
      ].join(' ')}
      style={{
        backgroundColor: isOutOfStock ? 'rgba(239, 68, 68, 0.08)' : 'rgba(16, 185, 129, 0.08)',
        color:           isOutOfStock ? 'var(--color-primary, #7B4B6A)' : 'var(--color-secondary, #2d6b4c)',
      }}
    >
      {isOutOfStock ? 'Sold Out' : 'In Stock'}
    </span>
  )
}
