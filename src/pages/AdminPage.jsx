import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-hot-toast'
import {
  AdminAuth,
  DashboardLayout,
  DashboardOverview,
  ProductList,
  CategoryManager,
  ProductFormModal
} from '@components/admin'
import { storageService } from '@services/storageService'
import { STORE_NAME } from '@constants'

// ─────────────────────────────────────────────────────────────────────────────
// AdminPage Component
// Integrates authentication and dashboard tab panels with full CRUD operations.
// ─────────────────────────────────────────────────────────────────────────────

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [activeSection, setActiveSection] = useState('dashboard')
  const [products, setProducts] = useState([])

  // Modal form states
  const [isFormOpen, setIsFormOpen] = useState(false)
  const [editingProduct, setEditingProduct] = useState(null)

  // Set document title for SEO
  useEffect(() => {
    document.title = `Admin Dashboard — ${STORE_NAME}`
  }, [])

  // Check authentication status on mount
  useEffect(() => {
    const authStatus = sessionStorage.getItem('kf_admin_authed')
    if (authStatus === 'true') {
      setIsAuthenticated(true)
      setProducts(storageService.getProducts())
    }
  }, [])

  const handleAuthSuccess = () => {
    setIsAuthenticated(true)
    setProducts(storageService.getProducts())
  }

  const handleLogout = () => {
    sessionStorage.removeItem('kf_admin_authed')
    setIsAuthenticated(false)
    toast.success('Successfully logged out.')
  }

  // Deletion handler
  const handleDeleteProduct = (id, name) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete "${name}"?`)
    if (confirmDelete) {
      const updated = storageService.deleteProduct(id)
      setProducts(updated)
      toast.success(`"${name}" deleted successfully.`)
    }
  }

  // Reset defaults handler
  const handleResetDefaults = () => {
    const confirmReset = window.confirm('Restore all default products? This will overwrite your current list.')
    if (confirmReset) {
      const res = storageService.resetAll()
      setProducts(res.products)
      toast.success('Database restored to default product catalog.')
    }
  }

  // Save / Update handler from Product Form Modal
  const handleSaveProduct = (payload) => {
    const updatedList = storageService.updateProduct(payload.id, payload)
    setProducts(updatedList)
    setIsFormOpen(false)
    setEditingProduct(null)
    toast.success(`"${payload.name}" saved successfully.`)
  }

  // Manual list ordering handlers
  const handleMoveUp = (id) => {
    const updated = storageService.moveProductUp(id)
    setProducts(updated)
  }

  const handleMoveDown = (id) => {
    const updated = storageService.moveProductDown(id)
    setProducts(updated)
  }

  // If not authenticated, show password gate screen
  if (!isAuthenticated) {
    return <AdminAuth onSuccess={handleAuthSuccess} />
  }

  return (
    <DashboardLayout
      activeSection={activeSection}
      onSelectSection={setActiveSection}
      onLogout={handleLogout}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {/* Dashboard Tab */}
          {activeSection === 'dashboard' && (
            <DashboardOverview products={products} />
          )}

          {/* Products Tab */}
          {activeSection === 'products' && (
            <ProductList
              products={products}
              onAddProduct={() => {
                setEditingProduct(null)
                setIsFormOpen(true)
              }}
              onEditProduct={(prod) => {
                setEditingProduct(prod)
                setIsFormOpen(true)
              }}
              onDeleteProduct={handleDeleteProduct}
              onResetDefaults={handleResetDefaults}
              onMoveUp={handleMoveUp}
              onMoveDown={handleMoveDown}
            />
          )}

          {/* Categories Tab */}
          {activeSection === 'categories' && (
            <CategoryManager onSyncRequired={() => setProducts(storageService.getProducts())} />
          )}

          {/* Featured Products Tab Placeholder */}
          {activeSection === 'featured' && (
            <div className="py-12 text-center border rounded-2xl p-8 bg-[var(--color-card)] border-[var(--color-border)]">
              <span className="text-4xl block mb-3">⭐</span>
              <h3 className="font-heading text-lg font-bold mb-1" style={{ color: 'var(--color-text)' }}>
                Featured Products Settings
              </h3>
              <p className="font-body text-xs mb-4" style={{ color: 'var(--color-text-muted)' }}>
                Mark bestsellers and featured spotlight banners. Features are fully integrated with the products list toggle.
              </p>
              <span className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-400">
                To feature a product, toggle "Featured Product" inside edit forms.
              </span>
            </div>
          )}

          {/* Seasonal Banner Tab Placeholder */}
          {activeSection === 'banner' && (
            <div className="py-12 text-center border rounded-2xl p-8 bg-[var(--color-card)] border-[var(--color-border)]">
              <span className="text-4xl block mb-3">🎊</span>
              <h3 className="font-heading text-lg font-bold mb-1" style={{ color: 'var(--color-text)' }}>
                Seasonal Banner Settings
              </h3>
              <p className="font-body text-xs mb-4" style={{ color: 'var(--color-text-muted)' }}>
                Change banner headlines, active state, badges, and CTA links.
              </p>
              <span className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-400">
                Placeholder — Features coming soon
              </span>
            </div>
          )}

          {/* Settings Tab Placeholder */}
          {activeSection === 'settings' && (
            <div className="py-12 text-center border rounded-2xl p-8 bg-[var(--color-card)] border-[var(--color-border)]">
              <span className="text-4xl block mb-3">⚙️</span>
              <h3 className="font-heading text-lg font-bold mb-1" style={{ color: 'var(--color-text)' }}>
                Admin Portal Settings
              </h3>
              <p className="font-body text-xs mb-4" style={{ color: 'var(--color-text-muted)' }}>
                Configure password, Google Maps embed, phone, and store timings.
              </p>
              <span className="text-[10px] uppercase font-bold tracking-wider px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-800 text-neutral-400">
                Placeholder — Features coming soon
              </span>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Global Product Add/Edit Form Modal */}
      <ProductFormModal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false)
          setEditingProduct(null)
        }}
        productToEdit={editingProduct}
        allProducts={products}
        onSave={handleSaveProduct}
      />
    </DashboardLayout>
  )
}
