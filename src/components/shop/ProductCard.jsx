import { motion } from 'framer-motion'
import { ShoppingBag } from 'lucide-react'
import { formatCurrency } from '@utils'

// ─────────────────────────────────────────────────────────────────────────────
// Reusable ProductCard Component
// ─────────────────────────────────────────────────────────────────────────────

export default function ProductCard({ product, index = 0 }) {
  const discount = Math.round(
    ((product.markedPrice - product.sellingPrice) / product.markedPrice) * 100,
  )

  const isOutOfStock = product.availability === 'out-of-stock'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: (index % 8) * 0.05, duration: 0.45, ease: 'easeOut' }}
      className="group relative flex flex-col rounded-2xl border overflow-hidden"
      style={{
        backgroundColor: 'var(--color-card)',
        borderColor:     'var(--color-border)',
        boxShadow:       'var(--shadow-sm)',
        transition:      'box-shadow 0.25s ease, transform 0.25s ease',
      }}
      whileHover={{ y: -4, boxShadow: 'var(--shadow-md)' }}
    >
      {/* ── Image/Placeholder Area ─────────────────────────── */}
      <div
        className="relative aspect-square overflow-hidden select-none"
        style={{
          background: `linear-gradient(135deg, ${product.color || '#C9A227'}12, ${product.color || '#C9A227'}24)`,
        }}
      >
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2.5">
            <span className="text-5xl" role="img" aria-label={product.name}>
              {product.emoji || '✨'}
            </span>
            <span
              className="font-body text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full"
              style={{
                backgroundColor: `${product.color || '#C9A227'}18`,
                color:           product.color || '#C9A227',
              }}
            >
              No Image
            </span>
          </div>
        )}

        {/* Badges Overlay */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1">
          {product.isNew && (
            <span
              className="font-body text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
              style={{ backgroundColor: '#2d6b4c' }}
            >
              New
            </span>
          )}
          {product.featured && (
            <span
              className="font-body text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
              style={{ backgroundColor: 'var(--color-secondary)', color: '#2C2C2C' }}
            >
              Featured
            </span>
          )}
          {discount > 0 && (
            <span
              className="font-body text-[10px] font-bold px-2 py-0.5 rounded-full text-white"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              {discount}% off
            </span>
          )}
        </div>

        {/* Availability Badge */}
        <div className="absolute bottom-2 right-2">
          <span
            className="font-body text-[10px] font-bold px-2 py-0.5 rounded-full"
            style={{
              backgroundColor: isOutOfStock ? '#FEE2E2' : '#D1FAE5',
              color:           isOutOfStock ? '#991B1B' : '#065F46',
            }}
          >
            {isOutOfStock ? 'Sold Out' : 'In Stock'}
          </span>
        </div>

        {/* Out of stock overlay */}
        {isOutOfStock && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: 'rgba(0,0,0,0.35)' }}
          >
            <span className="font-body text-xs font-bold text-white px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-sm">
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* ── Product Information ─────────────────────────────────── */}
      <div className="flex flex-col flex-1 p-4">
        {/* Name */}
        <h3
          className="font-heading text-sm sm:text-base font-semibold mb-2 line-clamp-2 leading-snug"
          style={{ color: 'var(--color-text)' }}
        >
          {product.name}
        </h3>

        {/* Category tag */}
        <span
          className="font-body text-[10px] font-semibold uppercase tracking-wider mb-2 inline-block"
          style={{ color: 'var(--color-text-muted)' }}
        >
          {product.category.replace('-', ' ')}
        </span>

        {/* Pricing */}
        <div className="flex items-center gap-2 mt-auto">
          <span
            className="font-heading text-lg font-bold"
            style={{ color: 'var(--color-primary)' }}
          >
            {formatCurrency(product.sellingPrice, 'INR').replace('INR', '₹').replace(/\s/g, '')}
          </span>
          <span
            className="font-body text-xs line-through"
            style={{ color: 'var(--color-text-light)' }}
          >
            {formatCurrency(product.markedPrice, 'INR').replace('INR', '₹').replace(/\s/g, '')}
          </span>
        </div>

        {/* Add to Cart button (future state trigger) */}
        <button
          disabled={isOutOfStock}
          className="mt-3.5 w-full flex items-center justify-center gap-2 py-2 rounded-xl font-body text-xs font-semibold border transition-all duration-200"
          style={{
            borderColor:     isOutOfStock ? 'var(--color-border)' : 'var(--color-primary)',
            color:           isOutOfStock ? 'var(--color-text-muted)' : 'var(--color-primary)',
            cursor:          isOutOfStock ? 'not-allowed' : 'pointer',
            backgroundColor: 'transparent',
          }}
          onMouseEnter={e => {
            if (!isOutOfStock) {
              e.currentTarget.style.backgroundColor = 'var(--color-primary)'
              e.currentTarget.style.color = '#FFFFFF'
            }
          }}
          onMouseLeave={e => {
            if (!isOutOfStock) {
              e.currentTarget.style.backgroundColor = 'transparent'
              e.currentTarget.style.color = 'var(--color-primary)'
            }
          }}
          onClick={(e) => {
            e.stopPropagation()
            // Cart integration placeholder for later phase
          }}
        >
          <ShoppingBag size={14} />
          {isOutOfStock ? 'Sold Out' : 'Add to Cart'}
        </button>
      </div>
    </motion.div>
  )
}
