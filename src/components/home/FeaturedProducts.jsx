import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Container from '@components/ui/Container'
import Button from '@components/ui/Button'
import { ProductCard } from '@components/shop'
import { FEATURED_PRODUCTS } from '@data/products'

// ─────────────────────────────────────────────────────────────────────────────
// FeaturedProducts Section
// Displays handpicked items from the products collection on the Home page.
// Uses the shared, reusable ProductCard.
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
