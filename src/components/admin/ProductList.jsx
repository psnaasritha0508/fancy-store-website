import { Edit, Trash, Plus, ArrowUp, ArrowDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Button from '@components/ui/Button'
import { formatCurrency } from '@utils'

// ─────────────────────────────────────────────────────────────────────────────
// ProductList Component
// Renders the responsive table/grid of products, handles CRUD triggers and Move controls.
// ─────────────────────────────────────────────────────────────────────────────

export default function ProductList({
  products = [],
  onAddProduct,
  onEditProduct,
  onDeleteProduct,
  onResetDefaults,
  onMoveUp,
  onMoveDown
}) {

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center max-w-md mx-auto space-y-6">
        <div className="w-16 h-16 rounded-full flex items-center justify-center text-2xl bg-neutral-100 dark:bg-neutral-800">
          📦
        </div>
        <div>
          <h3 className="font-heading text-lg font-bold mb-1" style={{ color: 'var(--color-text)' }}>
            No products exist.
          </h3>
          <p className="font-body text-xs" style={{ color: 'var(--color-text-muted)' }}>
            You have deleted all products, or none are currently loaded. Add a product or reset the database back to defaults.
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button
            id="empty-add-product"
            variant="primary"
            size="md"
            leftIcon={<Plus size={16} />}
            onClick={onAddProduct}
          >
            Add Product
          </Button>

          <Button
            id="empty-reset-db"
            variant="outline"
            size="md"
            onClick={onResetDefaults}
          >
            Restore Default Products
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Header and Quick Add */}
      <div className="flex items-center justify-between gap-4">
        <div>
          <h2 className="font-heading text-lg font-bold" style={{ color: 'var(--color-text)' }}>
            Product Directory
          </h2>
          <p className="font-body text-xs" style={{ color: 'var(--color-text-muted)' }}>
            Manage details, pricing, and availability for {products.length} products.
          </p>
        </div>
        <Button
          id="admin-add-product"
          variant="primary"
          size="sm"
          leftIcon={<Plus size={16} />}
          onClick={onAddProduct}
        >
          Add Product
        </Button>
      </div>

      {/* Responsive Grid/Table container */}
      <div
        className="w-full rounded-2xl border overflow-hidden"
        style={{
          backgroundColor: 'var(--color-card)',
          borderColor:     'var(--color-border)',
        }}
      >
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr
                className="border-b font-heading text-xs font-bold uppercase tracking-wider"
                style={{
                  borderColor:     'var(--color-border)',
                  backgroundColor: 'var(--color-bg-alt)',
                  color:           'var(--color-text-muted)',
                }}
              >
                <th className="px-6 py-4">Order</th>
                <th className="px-6 py-4">Image</th>
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4 text-right">Selling Price</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Featured</th>
                <th className="px-6 py-4 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence>
                {products.map((product, index) => {
                  const isOutOfStock = product.availability === 'out-of-stock' || product.inStock === false
                  return (
                    <motion.tr
                      key={product.id}
                      exit={{ opacity: 0, x: -10 }}
                      className="border-b hover:bg-neutral-50 dark:hover:bg-neutral-800/40 font-body text-sm transition-colors"
                      style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                    >
                      {/* Move Order Controls */}
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-0.5 items-center justify-center">
                          <button
                            onClick={() => onMoveUp(product.id)}
                            disabled={index === 0}
                            className="p-0.5 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400 disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed"
                            title="Move Up"
                          >
                            <ArrowUp size={12} />
                          </button>
                          <button
                            onClick={() => onMoveDown(product.id)}
                            disabled={index === products.length - 1}
                            className="p-0.5 rounded hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-400 disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed"
                            title="Move Down"
                          >
                            <ArrowDown size={12} />
                          </button>
                        </div>
                      </td>

                      {/* Image */}
                      <td className="px-6 py-4">
                        <div
                          className="w-10 h-10 rounded-lg flex items-center justify-center text-xl shrink-0 select-none overflow-hidden border"
                          style={{
                            background: `linear-gradient(135deg, ${product.color || '#C9A227'}12, ${product.color || '#C9A227'}24)`,
                            borderColor: 'var(--color-border)'
                          }}
                        >
                          {product.image ? (
                            <img src={product.image} alt="" className="w-full h-full object-cover rounded-lg" />
                          ) : (
                            product.emoji || '✨'
                          )}
                        </div>
                      </td>

                      {/* Name */}
                      <td className="px-6 py-4 font-semibold max-w-[200px] truncate">
                        {product.name}
                      </td>

                      {/* Category */}
                      <td className="px-6 py-4 text-xs font-semibold uppercase tracking-wider text-neutral-400">
                        {product.category.replace('-', ' ')}
                      </td>

                      {/* Price */}
                      <td className="px-6 py-4 font-semibold text-right" style={{ color: 'var(--color-primary)' }}>
                        {formatCurrency(product.sellingPrice, 'INR').replace('INR', '₹').replace(/\s/g, '')}
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4">
                        <span
                          className="text-[10px] font-bold px-2 py-0.5 rounded-full animate-fade"
                          style={{
                            backgroundColor: isOutOfStock ? '#FEE2E2' : '#D1FAE5',
                            color:           isOutOfStock ? '#991B1B' : '#065F46',
                          }}
                        >
                          {isOutOfStock ? 'Sold Out' : 'Active'}
                        </span>
                      </td>

                      {/* Featured */}
                      <td className="px-6 py-4">
                        {product.featured ? (
                          <span className="text-amber-500 text-base">★</span>
                        ) : (
                          <span className="text-neutral-300 dark:text-neutral-700">—</span>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => onEditProduct(product)}
                            className="p-1.5 rounded-lg border hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-600 dark:text-neutral-400 cursor-pointer"
                            style={{ borderColor: 'var(--color-border)' }}
                            title="Edit Product"
                          >
                            <Edit size={14} />
                          </button>
                          <button
                            onClick={() => onDeleteProduct(product.id, product.name)}
                            className="p-1.5 rounded-lg border hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/20 text-neutral-600 dark:text-neutral-400 cursor-pointer"
                            style={{ borderColor: 'var(--color-border)' }}
                            title="Delete Product"
                          >
                            <Trash size={14} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  )
                })}
              </AnimatePresence>
            </tbody>
          </table>
        </div>

        {/* Mobile List View (Cards instead of Table) */}
        <div className="block md:hidden divide-y" style={{ divideColor: 'var(--color-border)' }}>
          {products.map((product, index) => {
            const isOutOfStock = product.availability === 'out-of-stock' || product.inStock === false
            return (
              <div key={product.id} className="p-4 flex gap-3 items-center">
                {/* Mobile Up/Down controls */}
                <div className="flex flex-col gap-1 items-center shrink-0 pr-1">
                  <button
                    onClick={() => onMoveUp(product.id)}
                    disabled={index === 0}
                    className="p-1 rounded border hover:bg-neutral-50 disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed"
                    style={{ borderColor: 'var(--color-border)' }}
                  >
                    <ArrowUp size={10} />
                  </button>
                  <button
                    onClick={() => onMoveDown(product.id)}
                    disabled={index === products.length - 1}
                    className="p-1 rounded border hover:bg-neutral-50 disabled:opacity-20 cursor-pointer disabled:cursor-not-allowed"
                    style={{ borderColor: 'var(--color-border)' }}
                  >
                    <ArrowDown size={10} />
                  </button>
                </div>

                {/* Image */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shrink-0 select-none overflow-hidden border"
                  style={{
                    background: `linear-gradient(135deg, ${product.color || '#C9A227'}12, ${product.color || '#C9A227'}24)`,
                    borderColor: 'var(--color-border)'
                  }}
                >
                  {product.image ? (
                    <img src={product.image} alt="" className="w-full h-full object-cover rounded-xl" />
                  ) : (
                    product.emoji || '✨'
                  )}
                </div>

                {/* Details */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-heading text-sm font-bold truncate" style={{ color: 'var(--color-text)' }}>
                    {product.name}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="font-body text-xs font-semibold" style={{ color: 'var(--color-primary)' }}>
                      {formatCurrency(product.sellingPrice, 'INR').replace('INR', '₹').replace(/\s/g, '')}
                    </span>
                    <span className="text-neutral-300">•</span>
                    <span className="font-body text-[10px] uppercase text-neutral-400">
                      {product.category.replace('-', ' ')}
                    </span>
                  </div>
                </div>

                {/* Status and Action Buttons */}
                <div className="flex flex-col items-end gap-2 shrink-0">
                  <span
                    className="text-[9px] font-bold px-1.5 py-0.5 rounded-full"
                    style={{
                      backgroundColor: isOutOfStock ? '#FEE2E2' : '#D1FAE5',
                      color:           isOutOfStock ? '#991B1B' : '#065F46',
                    }}
                  >
                    {isOutOfStock ? 'Sold Out' : 'Active'}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onEditProduct(product)}
                      className="p-1 rounded-lg border hover:bg-neutral-100 text-neutral-500 cursor-pointer"
                      style={{ borderColor: 'var(--color-border)' }}
                    >
                      <Edit size={12} />
                    </button>
                    <button
                      onClick={() => onDeleteProduct(product.id, product.name)}
                      className="p-1 rounded-lg border hover:bg-red-50 hover:text-red-600 text-neutral-500 cursor-pointer"
                      style={{ borderColor: 'var(--color-border)' }}
                    >
                      <Trash size={12} />
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
