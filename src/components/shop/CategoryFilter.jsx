import { useEffect, useState } from 'react'
import { storageService } from '@services/storageService'

// ─────────────────────────────────────────────────────────────────────────────
// Reusable CategoryFilter Component
// Horizontal scrollable pills with custom active states and counts
// Loads categories dynamically from storageService to reflect admin updates
// ─────────────────────────────────────────────────────────────────────────────

export default function CategoryFilter({ selectedCategory, onSelect, products = [] }) {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    setCategories(storageService.getCategories())

    const handleSync = () => {
      setCategories(storageService.getCategories())
    }
    window.addEventListener('focus', handleSync)
    window.addEventListener('storage', handleSync)
    return () => {
      window.removeEventListener('focus', handleSync)
      window.removeEventListener('storage', handleSync)
    }
  }, [])

  // Count products in each category for display badges
  const getProductCount = (categoryId) => {
    if (!categoryId) return products.length
    return products.filter(p => p.category === categoryId).length
  }

  return (
    <div className="w-full">
      {/* Category header / horizontal scrolling list */}
      <div className="flex items-center justify-between mb-4 px-1">
        <h3 className="font-heading text-base font-bold" style={{ color: 'var(--color-text)' }}>
          Browse by Category
        </h3>
        {selectedCategory && (
          <button
            onClick={() => onSelect(null)}
            className="text-xs font-semibold underline cursor-pointer hover:text-amber-500 transition-colors"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Clear Filter
          </button>
        )}
      </div>

      <div className="flex gap-2 overflow-x-auto pb-3 pt-1 scrollbar-thin scrollbar-thumb-neutral-200 dark:scrollbar-thumb-neutral-800 -mx-4 px-4 sm:mx-0 sm:px-0">
        {/* 'All' option pill */}
        <button
          onClick={() => onSelect(null)}
          className={[
            'px-4 py-2.5 rounded-full text-xs font-semibold shrink-0 transition-all duration-200 border cursor-pointer flex items-center gap-1.5',
            !selectedCategory
              ? 'text-white border-[var(--color-primary)]'
              : 'border-[var(--color-border)] hover:bg-neutral-50 dark:hover:bg-neutral-800',
          ].join(' ')}
          style={{
            backgroundColor: !selectedCategory ? 'var(--color-primary)' : 'var(--color-card)',
            color:           !selectedCategory ? '#FFFFFF' : 'var(--color-text)',
            boxShadow:       !selectedCategory ? 'var(--shadow-sm)' : 'none',
          }}
        >
          <span>✨</span>
          <span>All Products</span>
          <span
            className="text-[10px] px-1.5 py-0.5 rounded-full font-bold ml-0.5"
            style={{
              backgroundColor: !selectedCategory ? 'rgba(255,255,255,0.2)' : 'var(--color-bg-alt)',
              color:           !selectedCategory ? '#FFFFFF' : 'var(--color-text-muted)',
            }}
          >
            {getProductCount(null)}
          </span>
        </button>

        {/* Individual category pills */}
        {categories.map((cat) => {
          const isActive = selectedCategory === cat.id
          const count = getProductCount(cat.id)

          // Fallbacks for custom owner categories
          const color = cat.color || '#7B4B6A'
          const bgLight = cat.bgLight || '#F7F0F4'

          return (
            <button
              key={cat.id || cat.label}
              onClick={() => onSelect(cat.id)}
              className={[
                'px-4 py-2.5 rounded-full text-xs font-semibold shrink-0 transition-all duration-200 border cursor-pointer flex items-center gap-1.5',
                isActive
                  ? 'text-white'
                  : 'border-[var(--color-border)] hover:bg-neutral-50 dark:hover:bg-neutral-800',
              ].join(' ')}
              style={{
                backgroundColor: isActive ? color : 'var(--color-card)',
                borderColor:     isActive ? color : 'var(--color-border)',
                color:           isActive ? '#FFFFFF' : 'var(--color-text)',
                boxShadow:       isActive ? 'var(--shadow-sm)' : 'none',
              }}
            >
              <span>{cat.emoji || '✨'}</span>
              <span>{cat.label}</span>
              <span
                className="text-[10px] px-1.5 py-0.5 rounded-full font-bold ml-0.5"
                style={{
                  backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : bgLight,
                  color:           isActive ? '#FFFFFF' : color,
                }}
              >
                {count}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
