import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, ShoppingBag } from 'lucide-react'
import Container from '@components/ui/Container'
import Button from '@components/ui/Button'
import { FEATURED_PRODUCTS } from '@data/products'
import { formatCurrency } from '@utils'

// ─────────────────────────────────────────────────────────────────────────────
// ProductCard — Single product card with pricing and badges
// ─────────────────────────────────────────────────────────────────────────────

function ProductCard({ product, index }) {
  const discount = Math.round(
    ((product.markedPrice - product.sellingPrice) / product.markedPrice) * 100,
  )

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.07, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col rounded-2xl border overflow-hidden"
      style={{
        backgroundColor: 'var(--color-card)',
        borderColor:     'var(--color-border)',
        boxShadow:       'var(--shadow-sm)',
        transition:      'box-shadow 0.25s ease, transform 0.25s ease',
      }}
      whileHover={{ y: -4 }}
    >
      {/* ── Product image / placeholder ─────────────────────────── */}
      <div
        className="relative aspect-square overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${product.color}18, ${product.color}35)`,
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
          /* Elegant placeholder when no image is set */
          <div className="w-full h-full flex flex-col items-center justify-center gap-3">
            <span
              className="text-5xl sm:text-6xl"
              role="img"
              aria-label={product.name}
            >
              {product.emoji}
            </span>
            <span
              className="font-body text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full"
              style={{
                backgroundColor: `${product.color}22`,
                color:           product.color,
              }}
            >
              Image coming soon
            </span>
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1.5">
          {product.isNew && (
            <span
              className="font-body text-xs font-bold px-2 py-0.5 rounded-full text-white"
              style={{ backgroundColor: '#2d6b4c' }}
            >
              New
            </span>
          )}
          {product.isBestseller && (
            <span
              className="font-body text-xs font-bold px-2 py-0.5 rounded-full text-white"
              style={{ backgroundColor: 'var(--color-secondary)', color: '#2C2C2C' }}
            >
              Bestseller
            </span>
          )}
          {discount > 0 && (
            <span
              className="font-body text-xs font-bold px-2 py-0.5 rounded-full text-white"
              style={{ backgroundColor: 'var(--color-primary)' }}
            >
              {discount}% off
            </span>
          )}
        </div>

        {/* Out of stock overlay */}
        {!product.inStock && (
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ backgroundColor: 'rgba(0,0,0,0.42)' }}
          >
            <span className="font-body text-sm font-bold text-white px-4 py-1.5 rounded-full"
                  style={{ backgroundColor: 'rgba(0,0,0,0.55)' }}>
              Out of Stock
            </span>
          </div>
        )}
      </div>

      {/* ── Product info ─────────────────────────────────────────── */}
      <div className="flex flex-col flex-1 p-4">
        {/* Name */}
        <h3
          className="font-heading text-sm sm:text-base font-semibold mb-2 line-clamp-2 leading-snug"
          style={{ color: 'var(--color-text)' }}
        >
          {product.name}
        </h3>

        {/* Pricing row */}
        <div className="flex items-center gap-2 flex-wrap mt-auto">
          <span
            className="font-heading text-lg font-bold"
            style={{ color: 'var(--color-primary)' }}
          >
            {formatCurrency(product.sellingPrice, 'INR').replace('INR', '₹').replace(/\s/g, '')}
          </span>
          <span
            className="font-body text-sm line-through"
            style={{ color: 'var(--color-text-light)' }}
          >
            {formatCurrency(product.markedPrice, 'INR').replace('INR', '₹').replace(/\s/g, '')}
          </span>
        </div>

        {/* Availability */}
        <div className="flex items-center gap-1.5 mt-2">
          <span
            className="w-1.5 h-1.5 rounded-full shrink-0"
            style={{ backgroundColor: product.inStock ? '#2d6b4c' : '#DC2626' }}
          />
          <span
            className="font-body text-xs"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {product.inStock ? 'In Stock' : 'Out of Stock'}
          </span>
        </div>

        {/* Add to cart (placeholder) */}
        <motion.button
          className="mt-3 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl font-body text-sm font-semibold border transition-colors duration-200"
          style={{
            borderColor:     product.inStock ? 'var(--color-primary)' : 'var(--color-border)',
            color:           product.inStock ? 'var(--color-primary)' : 'var(--color-text-muted)',
            cursor:          product.inStock ? 'pointer' : 'not-allowed',
          }}
          whileHover={product.inStock ? {
            backgroundColor: 'var(--color-primary)',
            color:           '#FFFFFF',
          } : {}}
          whileTap={product.inStock ? { scale: 0.97 } : {}}
          disabled={!product.inStock}
          aria-label={`Add ${product.name} to cart`}
        >
          <ShoppingBag size={15} />
          {product.inStock ? 'Add to Cart' : 'Unavailable'}
        </motion.button>
      </div>
    </motion.div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// FeaturedProducts Section
// ─────────────────────────────────────────────────────────────────────────────

export default function FeaturedProducts() {
  return (
    <section
      className="section-padding"
      style={{ backgroundColor: 'var(--color-bg)' }}
      aria-label="Featured products"
    >
      <Container>
        {/* Heading */}
        <motion.div
          className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <div>
            <h2
              className="font-heading text-3xl sm:text-4xl font-bold mb-2"
              style={{ color: 'var(--color-text)' }}
            >
              Featured Products
            </h2>
            <p className="font-body text-base" style={{ color: 'var(--color-text-muted)' }}>
              Handpicked favourites from our collection
            </p>
            <div className="divider-gold w-20 mt-3" />
          </div>

          <Link to="/shop" className="shrink-0">
            <Button
              id="featured-view-all"
              variant="outline"
              size="sm"
              rightIcon={<ArrowRight size={16} />}
            >
              View All Products
            </Button>
          </Link>
        </motion.div>

        {/* Products grid — 2 cols mobile, 3 sm, 4 lg */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5">
          {FEATURED_PRODUCTS.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Link to="/shop">
            <Button
              id="featured-bottom-cta"
              variant="primary"
              size="lg"
              rightIcon={<ArrowRight size={18} />}
            >
              View All Products
            </Button>
          </Link>
        </motion.div>
      </Container>
    </section>
  )
}
