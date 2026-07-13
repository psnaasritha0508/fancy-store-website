import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Plus, Trash, Edit, AlertTriangle } from 'lucide-react'
import { toast } from 'react-hot-toast'
import Button from '@components/ui/Button'
import { storageService } from '@services/storageService'

// ─────────────────────────────────────────────────────────────────────────────
// CategoryManager Tab Component
// Add, rename, and delete store categories with reassignment logic.
// ─────────────────────────────────────────────────────────────────────────────

const PRESET_COLORS = [
  { hex: '#7B4B6A', bgLight: '#F7F0F4', name: 'Plum' },
  { hex: '#C9A227', bgLight: '#FDF8EC', name: 'Gold' },
  { hex: '#2d6b4c', bgLight: '#EEF4F0', name: 'Green' },
  { hex: '#a83258', bgLight: '#FDF0F4', name: 'Rose' },
]

export default function CategoryManager({ onSyncRequired }) {
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [newLabel, setNewLabel] = useState('')
  const [newEmoji, setNewEmoji] = useState('✨')
  const [newDesc, setNewDesc] = useState('')
  const [newColor, setNewColor] = useState(PRESET_COLORS[0])
  
  // Edit state
  const [editingCategory, setEditingCategory] = useState(null)
  const [editLabel, setEditLabel] = useState('')

  // Delete modal state
  const [deletingCategory, setDeletingCategory] = useState(null)
  const [migrationOption, setMigrationOption] = useState('uncategorized')

  useEffect(() => {
    setCategories(storageService.getCategories())
    setProducts(storageService.getProducts())
  }, [])

  const handleRefresh = () => {
    setCategories(storageService.getCategories())
    setProducts(storageService.getProducts())
    onSyncRequired?.()
  }

  // Create Category
  const handleCreate = (e) => {
    e.preventDefault()
    if (!newLabel.trim()) {
      toast.error('Category name cannot be empty.')
      return
    }

    const id = newLabel.trim().toLowerCase().replace(/\s+/g, '-')
    
    const newCat = {
      id,
      label:       newLabel.trim(),
      emoji:       newEmoji.trim() || '✨',
      color:       newColor.hex,
      bgLight:     newColor.bgLight,
      description: newDesc.trim(),
    }

    try {
      storageService.addCategory(newCat)
      toast.success(`Category "${newLabel}" created successfully!`)
      setNewLabel('')
      setNewEmoji('✨')
      setNewDesc('')
      handleRefresh()
    } catch (err) {
      toast.error(err.message)
    }
  }

  // Rename Category
  const handleRenameSubmit = (e) => {
    e.preventDefault()
    if (!editLabel.trim()) {
      toast.error('Name cannot be empty.')
      return
    }

    try {
      storageService.renameCategory(editingCategory.id, editLabel)
      toast.success(`Category renamed to "${editLabel}"`)
      setEditingCategory(null)
      handleRefresh()
    } catch (err) {
      toast.error(err.message)
    }
  }

  // Start Category Deletion
  const handleStartDelete = (cat) => {
    const matchingProducts = products.filter(p => p.category === cat.id)
    
    if (matchingProducts.length === 0) {
      // Direct deletion if no products present
      const confirmDelete = window.confirm(`Are you sure you want to delete the empty category "${cat.label}"?`)
      if (confirmDelete) {
        storageService.deleteCategory(cat.id, 'uncategorized')
        toast.success(`Category "${cat.label}" deleted.`)
        handleRefresh()
      }
    } else {
      // Show migration options
      setDeletingCategory(cat)
    }
  }

  // Confirm Category Deletion and Migrate Products
  const handleConfirmDelete = () => {
    if (!deletingCategory) return

    storageService.deleteCategory(deletingCategory.id, migrationOption)
    toast.success(`Category deleted. Products moved/reassigned.`)
    setDeletingCategory(null)
    handleRefresh()
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
      {/* ── Left Side: Create / Edit Category ────────────────────── */}
      <div className="lg:col-span-5 space-y-6">
        {editingCategory ? (
          /* Edit Form */
          <form
            onSubmit={handleRenameSubmit}
            className="p-6 rounded-3xl border space-y-4"
            style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}
          >
            <h3 className="font-heading text-lg font-bold" style={{ color: 'var(--color-text)' }}>
              Rename Category
            </h3>
            
            <div className="space-y-1.5">
              <label className="font-body text-xs font-bold text-neutral-400 uppercase">Category Name</label>
              <input
                type="text"
                value={editLabel}
                onChange={(e) => setEditLabel(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none"
                style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                required
              />
            </div>

            <div className="flex gap-2">
              <Button type="submit" variant="primary" size="sm">Save Changes</Button>
              <Button variant="ghost" size="sm" onClick={() => setEditingCategory(null)}>Cancel</Button>
            </div>
          </form>
        ) : (
          /* Create Form */
          <form
            onSubmit={handleCreate}
            className="p-6 rounded-3xl border space-y-4"
            style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}
          >
            <h3 className="font-heading text-lg font-bold" style={{ color: 'var(--color-text)' }}>
              Create New Category
            </h3>

            <div className="grid grid-cols-4 gap-3">
              <div className="col-span-3 space-y-1">
                <label className="font-body text-[10px] font-bold text-neutral-400 uppercase">Name *</label>
                <input
                  type="text"
                  placeholder="e.g. Bangles"
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none"
                  style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                  required
                />
              </div>
              <div className="col-span-1 space-y-1">
                <label className="font-body text-[10px] font-bold text-neutral-400 uppercase text-center block">Emoji</label>
                <input
                  type="text"
                  placeholder="✨"
                  value={newEmoji}
                  onChange={(e) => setNewEmoji(e.target.value)}
                  className="w-full px-2 py-2.5 rounded-xl border text-center text-sm focus:outline-none"
                  style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-body text-[10px] font-bold text-neutral-400 uppercase">Description</label>
              <textarea
                placeholder="Short description for display..."
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                rows={2}
                className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none resize-none"
                style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
              />
            </div>

            {/* Presets color selector */}
            <div className="space-y-2">
              <label className="font-body text-[10px] font-bold text-neutral-400 uppercase">Color Accents</label>
              <div className="flex gap-2">
                {PRESET_COLORS.map((preset) => (
                  <button
                    key={preset.hex}
                    type="button"
                    onClick={() => setNewColor(preset)}
                    className="w-7 h-7 rounded-full border-2 transition-transform duration-200"
                    style={{
                      backgroundColor: preset.hex,
                      borderColor:     newColor.hex === preset.hex ? '#000000' : 'transparent',
                      transform:       newColor.hex === preset.hex ? 'scale(1.12)' : 'none',
                    }}
                    title={preset.name}
                  />
                ))}
              </div>
            </div>

            <Button
              id="category-create-button"
              type="submit"
              variant="primary"
              size="md"
              fullWidth
              leftIcon={<Plus size={16} />}
            >
              Add Category
            </Button>
          </form>
        )}
      </div>

      {/* ── Right Side: List of Categories ───────────────────────── */}
      <div className="lg:col-span-7 space-y-4">
        <h3 className="font-heading text-lg font-bold" style={{ color: 'var(--color-text)' }}>
          Existing Categories
        </h3>

        <div
          className="rounded-3xl border overflow-hidden"
          style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}
        >
          <div className="divide-y" style={{ divideColor: 'var(--color-border)' }}>
            {categories.map((cat) => {
              const categoryProductCount = products.filter(p => p.category === cat.id).length
              return (
                <div key={cat.id || cat.label} className="p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0"
                      style={{ backgroundColor: cat.bgLight || '#FDF8EC' }}
                    >
                      {cat.emoji || '✨'}
                    </span>
                    <div>
                      <h4 className="font-heading text-sm font-bold" style={{ color: 'var(--color-text)' }}>
                        {cat.label}
                      </h4>
                      <p className="font-body text-xs" style={{ color: 'var(--color-text-muted)' }}>
                        {categoryProductCount} {categoryProductCount === 1 ? 'product' : 'products'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setEditingCategory(cat)
                        setEditLabel(cat.label)
                      }}
                      aria-label="Rename category"
                      className="p-2 rounded-xl border hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-500"
                      style={{ borderColor: 'var(--color-border)' }}
                    >
                      <Edit size={13} />
                    </button>
                    <button
                      onClick={() => handleStartDelete(cat)}
                      aria-label="Delete category"
                      className="p-2 rounded-xl border hover:bg-red-50 hover:text-red-600 text-neutral-500"
                      style={{ borderColor: 'var(--color-border)' }}
                    >
                      <Trash size={13} />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* ── Reassignment Overlay Dialog (when deleting used category) ── */}
      {deletingCategory && (
        <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setDeletingCategory(null)} />

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="relative w-full max-w-md p-6 rounded-3xl border shadow-2xl space-y-4"
            style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}
          >
            <div className="flex items-start gap-3">
              <span className="p-2 bg-amber-50 text-amber-500 rounded-xl mt-0.5">
                <AlertTriangle size={20} />
              </span>
              <div>
                <h4 className="font-heading text-base font-bold" style={{ color: 'var(--color-text)' }}>
                  Migrate Products?
                </h4>
                <p className="font-body text-xs leading-relaxed mt-1" style={{ color: 'var(--color-text-muted)' }}>
                  Category <strong>&quot;{deletingCategory.label}&quot;</strong> has products inside it. What would you like to do with them?
                </p>
              </div>
            </div>

            <div className="space-y-2">
              {[
                { value: 'uncategorized', label: 'Keep them but set category to "Uncategorized"' },
                { value: 'delete',        label: 'Delete all products inside this category' },
                ...categories
                  .filter(c => c.id !== deletingCategory.id)
                  .map(c => ({ value: c.id, label: `Move them to "${c.label}" category` }))
              ].map(opt => (
                <label key={opt.value} className="flex items-center gap-2 p-2.5 border rounded-xl cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800 text-xs font-semibold">
                  <input
                    type="radio"
                    name="migration"
                    value={opt.value}
                    checked={migrationOption === opt.value}
                    onChange={(e) => setMigrationOption(e.target.value)}
                  />
                  <span style={{ color: 'var(--color-text)' }}>{opt.label}</span>
                </label>
              ))}
            </div>

            <div className="flex gap-2 justify-end pt-2">
              <Button variant="danger" size="sm" onClick={handleConfirmDelete}>Confirm Delete</Button>
              <Button variant="ghost" size="sm" onClick={() => setDeletingCategory(null)}>Cancel</Button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
