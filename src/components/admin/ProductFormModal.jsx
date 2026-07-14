import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Upload, Trash } from 'lucide-react'
import { toast } from 'react-hot-toast'
import Button from '@components/ui/Button'
import { storageService } from '@services/storageService'

// ─────────────────────────────────────────────────────────────────────────────
// ProductFormModal
// Modal dialog containing the create / edit product form.
// Validates: non-empty, non-negative, selling <= marked, duplicate names in same cat.
// Encodes uploaded file to Base64.
// ─────────────────────────────────────────────────────────────────────────────

export default function ProductFormModal({ isOpen, onClose, productToEdit, allProducts = [], onSave }) {
  const [categories, setCategories] = useState([])
  
  // Form States
  const [name, setName] = useState('')
  const [category, setCategory] = useState('')
  const [newCategoryLabel, setNewCategoryLabel] = useState('')
  const [isCreatingCategory, setIsCreatingCategory] = useState(false)
  const [description, setDescription] = useState('')
  const [markedPrice, setMarkedPrice] = useState(0)
  const [sellingPrice, setSellingPrice] = useState(0)
  const [availability, setAvailability] = useState('in-stock')
  const [expiry, setExpiry] = useState('')
  const [featured, setFeatured] = useState(false)
  const [visible, setVisible] = useState(true)
  const [image, setImage] = useState(null) // Base64 string
  const [displayOrder, setDisplayOrder] = useState(0)

  const fileInputRef = useRef(null)

  // Load existing product if editing
  useEffect(() => {
    setCategories(storageService.getCategories())
    
    if (productToEdit) {
      setName(productToEdit.name || '')
      setCategory(productToEdit.category || '')
      setIsCreatingCategory(false)
      setDescription(productToEdit.description || '')
      setMarkedPrice(productToEdit.markedPrice || 0)
      setSellingPrice(productToEdit.sellingPrice || 0)
      setAvailability(productToEdit.availability || 'in-stock')
      setExpiry(productToEdit.expiry || '')
      setFeatured(productToEdit.featured || false)
      setVisible(productToEdit.visible !== false)
      setImage(productToEdit.image || null)
      setDisplayOrder(productToEdit.displayOrder || 0)
    } else {
      // Clear form for Add Product
      setName('')
      setCategory('')
      setIsCreatingCategory(false)
      setNewCategoryLabel('')
      setDescription('')
      setMarkedPrice(0)
      setSellingPrice(0)
      setAvailability('in-stock')
      setExpiry('')
      setFeatured(false)
      setVisible(true)
      setImage(null)
      // Defaults to max displayOrder + 1
      const maxOrder = allProducts.reduce((max, p) => Math.max(max, p.displayOrder || 0), 0)
      setDisplayOrder(maxOrder + 1)
    }
  }, [productToEdit, isOpen, allProducts])

  // Sync category select dropdown if categories are added/removed
  useEffect(() => {
    if (categories.length > 0 && !category && !productToEdit) {
      setCategory(categories[0].id)
    }
  }, [categories, category, productToEdit])

  // Handle Category select change (detect "+ Create New Category")
  const handleCategorySelect = (e) => {
    const val = e.target.value
    if (val === 'CREATE_NEW') {
      setIsCreatingCategory(true)
      setCategory('')
    } else {
      setIsCreatingCategory(false)
      setCategory(val)
    }
  }

  // Handle Image Upload
  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Limit to 1.5MB for Base64 localStorage safety
    if (file.size > 1.5 * 1024 * 1024) {
      toast.error('Image size must be smaller than 1.5MB.')
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      setImage(reader.result)
    }
    reader.readAsDataURL(file)
  }

  const handleClearImage = () => {
    setImage(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  // Auto-calculated discount
  const discount = markedPrice > 0 ? Math.round(((markedPrice - sellingPrice) / markedPrice) * 100) : 0

  // Form Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault()

    // 1. Validations
    if (!name.trim()) {
      toast.error('Product name cannot be empty.')
      return
    }

    // Determine category ID
    let finalCategory = category
    if (isCreatingCategory) {
      if (!newCategoryLabel.trim()) {
        toast.error('Please specify a new category name.')
        return
      }

      const id = newCategoryLabel.trim().toLowerCase().replace(/\s+/g, '-')
      
      // Save new category
      const newCatObj = {
        id,
        label:       newCategoryLabel.trim(),
        emoji:       '✨',
        color:       '#7B4B6A',
        bgLight:     '#F7F0F4',
        description: '',
      }

      try {
        storageService.addCategory(newCatObj)
        finalCategory = id
        toast.success(`Category "${newCategoryLabel}" created.`)
      } catch (err) {
        toast.error(err.message)
        return
      }
    }

    if (!finalCategory) {
      toast.error('Please select or create a category.')
      return
    }

    // Number conversions
    const numMarked = Number(markedPrice)
    const numSelling = Number(sellingPrice)
    const numOrder = Number(displayOrder)

    if (numMarked < 0 || numSelling < 0) {
      toast.error('Prices cannot be negative.')
      return
    }

    if (numSelling > numMarked) {
      toast.error('Selling price cannot exceed the marked price.')
      return
    }

    // Duplicate check in same category (excluding current editing product)
    const isDuplicate = allProducts.some(
      (p) =>
        p.id !== (productToEdit?.id || '') &&
        p.category === finalCategory &&
        p.name.trim().toLowerCase() === name.trim().toLowerCase()
    )

    if (isDuplicate) {
      toast.error(`A product named "${name}" already exists in this category.`)
      return
    }

    // 2. Prepare payload
    const payload = {
      id:           productToEdit?.id || `prod-${Date.now()}`,
      name:         name.trim(),
      category:     finalCategory,
      description:  description.trim(),
      markedPrice:  numMarked,
      sellingPrice: numSelling,
      availability,
      expiry:       expiry.trim() || null,
      featured,
      visible,
      image,
      displayOrder: numOrder,
      emoji:        productToEdit?.emoji || '✨',
      createdDate:  productToEdit?.createdDate || new Date().toISOString().split('T')[0]
    }

    // 3. Save
    onSave(payload)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 sm:p-6 z-50">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="relative w-full max-w-2xl rounded-3xl overflow-hidden border shadow-2xl flex flex-col max-h-[90vh]"
        style={{
          backgroundColor: 'var(--color-card)',
          borderColor:     'var(--color-border)',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b shrink-0" style={{ borderColor: 'var(--color-border)' }}>
          <h3 className="font-heading text-lg font-bold" style={{ color: 'var(--color-text)' }}>
            {productToEdit ? 'Edit Product Details' : 'Add New Product'}
          </h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500">
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Form Body */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Section 1: Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="font-body text-xs font-bold text-neutral-400 uppercase">Product Name *</label>
              <input
                type="text"
                placeholder="e.g. Traditional Bangles"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none"
                style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                required
              />
            </div>

            <div className="space-y-1">
              <label className="font-body text-xs font-bold text-neutral-400 uppercase">Category *</label>
              {!isCreatingCategory ? (
                <select
                  value={category}
                  onChange={handleCategorySelect}
                  className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none cursor-pointer"
                  style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                >
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.emoji || '✨'} {cat.label}
                    </option>
                  ))}
                  <option value="CREATE_NEW">➕ + Create New Category</option>
                </select>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="New Category Label"
                    value={newCategoryLabel}
                    onChange={(e) => setNewCategoryLabel(e.target.value)}
                    className="flex-1 px-4 py-2.5 rounded-xl border text-sm focus:outline-none"
                    style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setIsCreatingCategory(false)
                      if (categories.length > 0) setCategory(categories[0].id)
                    }}
                    className="px-3 rounded-xl border text-xs hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-400"
                    style={{ borderColor: 'var(--color-border)' }}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-1">
            <label className="font-body text-xs font-bold text-neutral-400 uppercase">Description</label>
            <textarea
              placeholder="Provide a detailed description of the materials, sizes, and features..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none resize-none"
              style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
            />
          </div>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="font-body text-xs font-bold text-neutral-400 uppercase">Marked Price (₹) *</label>
              <input
                type="number"
                placeholder="599"
                value={markedPrice}
                onChange={(e) => setMarkedPrice(Number(e.target.value))}
                min="0"
                className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none"
                style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                required
              />
            </div>

            <div className="space-y-1">
              <label className="font-body text-xs font-bold text-neutral-400 uppercase">Selling Price (₹) *</label>
              <input
                type="number"
                placeholder="499"
                value={sellingPrice}
                onChange={(e) => setSellingPrice(Number(e.target.value))}
                min="0"
                className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none"
                style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                required
              />
            </div>

            <div className="space-y-1">
              <label className="font-body text-xs font-bold text-neutral-400 uppercase">Discount (Auto)</label>
              <div
                className="w-full px-4 py-2.5 rounded-xl border text-sm font-semibold flex items-center justify-between"
                style={{ backgroundColor: 'var(--color-bg-alt)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
              >
                <span>{discount}% OFF</span>
              </div>
            </div>
          </div>

          {/* Status, DisplayOrder, Expiry */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="font-body text-xs font-bold text-neutral-400 uppercase">Availability</label>
              <select
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none cursor-pointer"
                style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
              >
                <option value="in-stock">In Stock</option>
                <option value="out-of-stock">Out of Stock</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-body text-xs font-bold text-neutral-400 uppercase">Display Order</label>
              <input
                type="number"
                value={displayOrder}
                onChange={(e) => setDisplayOrder(Number(e.target.value))}
                className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none"
                style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
              />
            </div>

            <div className="space-y-1">
              <label className="font-body text-xs font-bold text-neutral-400 uppercase">Expiry Date (Optional)</label>
              <input
                type="date"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none"
                style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
              />
            </div>
          </div>

          {/* Visibility toggle */}
          <div className="p-4 rounded-2xl border" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-alt)' }}>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="font-heading text-sm font-semibold" style={{ color: 'var(--color-text)' }}>Visibility</p>
                <p className="font-body text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  Hidden products stay in the admin dashboard but are removed from storefront sections.
                </p>
              </div>
              <label className="inline-flex items-center gap-3 cursor-pointer">
                <span className="text-xs font-bold uppercase" style={{ color: visible ? 'var(--color-accent)' : 'var(--color-text-muted)' }}>
                  {visible ? 'Visible' : 'Hidden'}
                </span>
                <input
                  type="checkbox"
                  checked={visible}
                  onChange={(e) => setVisible(e.target.checked)}
                  className="h-4 w-4 rounded border-[var(--color-border)] text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                />
              </label>
            </div>
          </div>

          {/* Image Upload area */}
          <div className="space-y-2">
            <label className="font-body text-xs font-bold text-neutral-400 uppercase">Product Image</label>
            <div className="flex flex-col sm:flex-row gap-4 items-center p-4 border-2 border-dashed rounded-2xl" style={{ borderColor: 'var(--color-border)' }}>
              {image ? (
                <div className="relative w-24 h-24 rounded-xl overflow-hidden shrink-0 border">
                  <img src={image} alt="Preview" className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={handleClearImage}
                    className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full hover:bg-red-700"
                    title="Remove Image"
                  >
                    <X size={10} />
                  </button>
                </div>
              ) : (
                <div className="w-24 h-24 bg-neutral-100 dark:bg-neutral-800 rounded-xl flex flex-col items-center justify-center text-neutral-400 shrink-0">
                  <Upload size={22} />
                  <span className="text-[10px] mt-1 font-semibold">No Image</span>
                </div>
              )}

              <div className="flex-1 text-center sm:text-left space-y-1.5">
                <input
                  type="file"
                  accept="image/*"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  className="hidden"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Choose Image File
                </Button>
                <p className="text-[10px] text-neutral-400">
                  PNG, JPG, or WEBP. Max size 1.5MB. Encoded to local storage.
                </p>
              </div>
            </div>
          </div>

          {/* Toggles */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="featured-toggle"
              checked={featured}
              onChange={(e) => setFeatured(e.target.checked)}
              className="w-4 h-4 rounded border-neutral-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)] cursor-pointer"
            />
            <label htmlFor="featured-toggle" className="font-body text-xs font-bold text-neutral-500 cursor-pointer select-none">
              Featured Product (Spotlight on Home Page banner / carousels)
            </label>
          </div>

          {/* Form Actions Footer */}
          <div className="flex gap-3 pt-4 border-t justify-end" style={{ borderColor: 'var(--color-border)' }}>
            <Button type="submit" variant="primary">
              {productToEdit ? 'Save Changes' : 'Create Product'}
            </Button>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
