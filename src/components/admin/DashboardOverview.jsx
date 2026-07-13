import { Package, Layers, Star, AlertTriangle } from 'lucide-react'
import { motion } from 'framer-motion'

// ─────────────────────────────────────────────────────────────────────────────
// DashboardOverview Tab Component
// Renders overview KPI cards for the admin home view
// ─────────────────────────────────────────────────────────────────────────────

export default function DashboardOverview({ products = [] }) {
  // Compute metrics
  const totalProducts = products.length

  const categories = useUniqueCategories(products)
  const totalCategories = categories.length

  const totalFeatured = products.filter(p => p.featured || p.isBestseller).length
  const totalOutOfStock = products.filter(p => p.availability === 'out-of-stock' || p.inStock === false).length

  const stats = [
    {
      label: 'Total Products',
      value: totalProducts,
      icon:  Package,
      color: 'var(--color-primary)',
      bg:    'rgba(123, 75, 106, 0.08)',
    },
    {
      label: 'Categories',
      value: totalCategories,
      icon:  Layers,
      color: 'var(--color-secondary)',
      bg:    'rgba(201, 162, 39, 0.08)',
    },
    {
      label: 'Featured Products',
      value: totalFeatured,
      icon:  Star,
      color: '#3B82F6',
      bg:    'rgba(59, 130, 246, 0.08)',
    },
    {
      label: 'Out of Stock',
      value: totalOutOfStock,
      icon:  AlertTriangle,
      color: '#EF4444',
      bg:    'rgba(239, 68, 68, 0.08)',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Welcome header */}
      <div>
        <h2 className="font-heading text-xl font-bold" style={{ color: 'var(--color-text)' }}>
          Welcome back, Store Owner
        </h2>
        <p className="font-body text-xs" style={{ color: 'var(--color-text-muted)' }}>
          Here is what is happening at Krishna Fancies today.
        </p>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, duration: 0.4 }}
              className="p-5 rounded-2xl border flex flex-col justify-between h-32"
              style={{
                backgroundColor: 'var(--color-card)',
                borderColor:     'var(--color-border)',
              }}
            >
              <div className="flex items-center justify-between">
                <span className="font-body text-xs font-semibold" style={{ color: 'var(--color-text-muted)' }}>
                  {stat.label}
                </span>
                <span
                  className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                  style={{ backgroundColor: stat.bg, color: stat.color }}
                >
                  <Icon size={16} />
                </span>
              </div>
              <span className="font-heading text-2xl font-bold" style={{ color: 'var(--color-text)' }}>
                {stat.value}
              </span>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

// Helpers
function useUniqueCategories(products) {
  const cats = products.map(p => p.category)
  return [...new Set(cats)]
}
