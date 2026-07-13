import { motion } from 'framer-motion'
import { Eye } from 'lucide-react'
import { useProductModal } from '@context/ProductModalContext'
import AvailabilityBadge from './AvailabilityBadge'
import ProductPrice from './ProductPrice'

// ─────────────────────────────────────────────────────────────────────────────
// Reusable ProductCard Component
// Removes "Add to Cart" button, clicking card opens ProductModal
// ─────────────────────────────────────────────────────────────────────────────

export default function ProductCard({ product, index = 0 }) {
  const { openModal } = useProductModal()

  const discount = Math.round(
    ((product.markedPrice - product.sellingPrice) / product.markedPrice) * 100,
  )

  const isOutOfStock = product.availability === 'out-of-stock' || product.inStock === false

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: (index % 8) * 0.05, duration: 0.45, ease: 'easeOut' }}
      className="group relative flex flex-col rounded-2xl border overflow-hidden cursor-pointer"
      style={{
        backgroundColor: 'var(--color-card)',
        borderColor:     'var(--color-border)',
        boxShadow:       'var(--shadow-sm)',
        transition:      'box-shadow 0.25s ease, transform 0.25s ease',
      }}
      whileHover={{ y: -4, boxShadow: 'var(--shadow-md)' }}
      onClick={() => openModal(product)}
      role="button"
      tabIndex={0}
      aria-label={`View details of ${product.name}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          openModal(product)
        }
      }}
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
          <AvailabilityBadge
            availability={product.availability}
            inStock={product.inStock}
          />
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

        {/* Hover View Details overlay */}
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <div className="bg-white/95 dark:bg-neutral-900/95 shadow-md px-4 py-2 rounded-xl flex items-center gap-1.5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
            <Eye size={14} className="text-[var(--color-primary)]" />
            <span className="font-body text-[11px] font-bold uppercase tracking-wider text-[var(--color-text)]">
              View Details
            </span>
          </div>
        </div>
      </div>

      {/* ── Product Information ─────────────────────────────────── */}
      <div className="flex flex-col flex-1 p-4">
        {/* Name */}
        <h3
          className="font-heading text-sm sm:text-base font-semibold mb-1 line-clamp-2 leading-snug group-hover:text-[var(--color-primary)] transition-colors duration-200"
          style={{ color: 'var(--color-text)' }}
        >
          {product.name}
        </h3>

        {/* Category tag */}
        <span
          className="font-body text-[10px] font-semibold uppercase tracking-wider mb-2.5 inline-block"
          style={{ color: 'var(--color-text-muted)' }}
        >
          {product.category.replace('-', ' ')}
        </span>

        {/* Pricing */}
        <ProductPrice
          markedPrice={product.markedPrice}
          sellingPrice={product.sellingPrice}
          className="mt-auto"
        />
      </div>
    </motion.div>
  )
}
