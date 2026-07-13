import { useEffect, useState, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ShoppingBag, RefreshCw } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Container from '@components/ui/Container'
import {
  ProductCard,
  SearchBar,
  CategoryFilter,
  SortDropdown
} from '@components/shop'
import { PRODUCTS } from '@data/products'
import { STORE_NAME } from '@constants'

// ─────────────────────────────────────────────────────────────────────────────
// ShopPage Component
// Handles product search, category filtering, sorting, and query param state.
// ─────────────────────────────────────────────────────────────────────────────

export default function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('featured')

  // Get active category from URL search params
  const activeCategory = searchParams.get('category')

  // Update document title for SEO
  useEffect(() => {
    document.title = `Shop — ${STORE_NAME}`
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        `Browse our premium catalog of fancy items, bangles, jewellery, cosmetics, and everyday essentials at Krishna Fancies. Filter by categories, sort by price, and search products instantly.`
      )
    }
  }, [])

  // Sync state if category changes via URL (or home page CTA)
  const handleSelectCategory = (categoryId) => {
    if (categoryId) {
      setSearchParams({ category: categoryId })
    } else {
      setSearchParams({})
    }
  }

  const handleResetFilters = () => {
    setSearchQuery('')
    handleSelectCategory(null)
    setSortBy('featured')
  }

  // Filter and sort products using useMemo for performance optimization
  const filteredAndSortedProducts = useMemo(() => {
    let result = [...PRODUCTS]

    // 1. Filter by Category
    if (activeCategory) {
      result = result.filter((p) => p.category === activeCategory)
    }

    // 2. Filter by Search Query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim()
      result = result.filter((p) => p.name.toLowerCase().includes(query))
    }

    // 3. Sort Products
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.sellingPrice - b.sellingPrice)
        break
      case 'price-desc':
        result.sort((a, b) => b.sellingPrice - a.sellingPrice)
        break
      case 'newest':
        // Sort by createdDate or just reverse displayOrder as fallback
        result.sort((a, b) => new Date(b.createdDate || '') - new Date(a.createdDate || ''))
        break
      case 'featured':
      default:
        // Sort by featured first, then by displayOrder
        result.sort((a, b) => {
          if (a.featured && !b.featured) return -1
          if (!a.featured && b.featured) return 1
          return a.displayOrder - b.displayOrder
        })
        break
    }

    return result
  }, [activeCategory, searchQuery, sortBy])

  return (
    <div className="min-h-screen pb-16" style={{ backgroundColor: 'var(--color-bg)' }}>
      {/* ── 1. Shop Hero Section ───────────────────────────────────── */}
      <section
        className="py-12 border-b"
        style={{
          backgroundColor: 'var(--color-card)',
          borderColor:     'var(--color-border)',
        }}
      >
        <Container>
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 mb-4 font-body text-xs font-semibold" style={{ color: 'var(--color-text-muted)' }}>
            <Link to="/" className="hover:text-amber-500 transition-colors">Home</Link>
            <span>&gt;</span>
            <span className="text-[var(--color-primary)]">Shop</span>
          </nav>

          <h1
            className="font-heading text-3xl sm:text-4xl font-bold mb-2"
            style={{ color: 'var(--color-text)' }}
          >
            Explore Our Products
          </h1>
          <p className="font-body text-sm sm:text-base" style={{ color: 'var(--color-text-muted)' }}>
            Browse quality products across all categories.
          </p>
        </Container>
      </section>

      {/* ── 2. Filters & Controls ───────────────────────────────────── */}
      <Container className="pt-8">
        <div className="flex flex-col gap-6">
          {/* Search bar and Sort controls row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              products={PRODUCTS}
            />

            <SortDropdown value={sortBy} onChange={setSortBy} />
          </div>

          {/* Category filter pills list */}
          <CategoryFilter
            selectedCategory={activeCategory}
            onSelect={handleSelectCategory}
            products={PRODUCTS}
          />
        </div>

        {/* ── 3. Active Filters Display Info ─────────────────────────── */}
        {(activeCategory || searchQuery) && (
          <div className="flex items-center justify-between border-t pt-5 mt-2" style={{ borderColor: 'var(--color-border)' }}>
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold font-body" style={{ color: 'var(--color-text-muted)' }}>
              <span>Showing {filteredAndSortedProducts.length} results</span>
              {activeCategory && (
                <span className="bg-amber-100/50 dark:bg-amber-950/30 text-amber-600 px-2.5 py-1 rounded-full border border-amber-200/50">
                  Category: {activeCategory.replace('-', ' ')}
                </span>
              )}
              {searchQuery && (
                <span className="bg-neutral-100 dark:bg-neutral-800 text-[var(--color-text)] px-2.5 py-1 rounded-full border">
                  Search: &quot;{searchQuery}&quot;
                </span>
              )}
            </div>
            <button
              onClick={handleResetFilters}
              className="text-xs font-bold text-[var(--color-primary)] hover:underline flex items-center gap-1.5 cursor-pointer"
            >
              Reset All
            </button>
          </div>
        )}

        {/* Divider line if no active tags */}
        {!activeCategory && !searchQuery && (
          <div className="border-t mt-4" style={{ borderColor: 'var(--color-border)' }} />
        )}

        {/* ── 4. Products Grid ────────────────────────────────────────── */}
        <div className="pt-8">
          <AnimatePresence mode="wait">
            {filteredAndSortedProducts.length > 0 ? (
              <motion.div
                key="grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
              >
                {filteredAndSortedProducts.map((product, idx) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={idx}
                  />
                ))}
              </motion.div>
            ) : (
              /* ── 5. Empty State ────────────────────────────────────── */
              <motion.div
                key="empty"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                className="flex flex-col items-center justify-center py-20 text-center max-w-md mx-auto"
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl mb-4 bg-neutral-100 dark:bg-neutral-800">
                  🔍
                </div>
                <h2 className="font-heading text-xl font-bold mb-2" style={{ color: 'var(--color-text)' }}>
                  No products found.
                </h2>
                <p className="font-body text-sm mb-6" style={{ color: 'var(--color-text-muted)' }}>
                  We couldn&apos;t find any products matching your current filters. Try adjusting your search keyword or selecting a different category.
                </p>
                <Button
                  id="reset-filters-button"
                  variant="primary"
                  size="md"
                  leftIcon={<RefreshCw size={15} />}
                  onClick={handleResetFilters}
                >
                  Reset Filters
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Container>
    </div>
  )
}
