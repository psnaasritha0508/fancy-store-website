import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, MessageCircle } from 'lucide-react'
import { useProductModal } from '@context/ProductModalContext'
import Button from '@components/ui/Button'
import AvailabilityBadge from './AvailabilityBadge'
import ProductPrice from './ProductPrice'
import { storageService } from '@services/storageService'

// ─────────────────────────────────────────────────────────────────────────────
// Reusable ProductModal Component (Focus trapped, accessible modal)
// Loads store whatsapp dynamically from storageService for real-time synchronization.
// ─────────────────────────────────────────────────────────────────────────────

export default function ProductModal() {
  const { selectedProduct, closeModal } = useProductModal()
  const modalRef = useRef(null)
  const closeBtnRef = useRef(null)
  
  // WhatsApp settings state
  const [whatsapp, setWhatsapp] = useState('919876543210')
  const [imageError, setImageError] = useState(false)

  // Reset image error state whenever product switches
  useEffect(() => {
    setImageError(false)
  }, [selectedProduct])

  useEffect(() => {
    const loadSettings = () => {
      const settings = storageService.getSettings()
      if (settings && settings.storeInfo) {
        setWhatsapp(settings.storeInfo.whatsapp)
      }
    }
    loadSettings()
    window.addEventListener('focus', loadSettings)
    window.addEventListener('storage', loadSettings)
    return () => {
      window.removeEventListener('focus', loadSettings)
      window.removeEventListener('storage', loadSettings)
    }
  }, [])

  // Listen for keyboard ESC and handle focus trapping
  useEffect(() => {
    if (!selectedProduct) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        closeModal()
        return
      }

      if (e.key === 'Tab') {
        if (!modalRef.current) return
        const focusableElements = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex="0"]'
        )
        const firstElement = focusableElements[0]
        const lastElement = focusableElements[focusableElements.length - 1]

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            lastElement.focus()
            e.preventDefault()
          }
        } else {
          if (document.activeElement === lastElement) {
            firstElement.focus()
            e.preventDefault()
          }
        }
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    setTimeout(() => {
      closeBtnRef.current?.focus()
    }, 50)

    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedProduct, closeModal])

  if (!selectedProduct) return null

  // WhatsApp order link (empty message template per requirement)
  const whatsappUrl = `https://wa.me/${whatsapp}`

  const hasExpiry = selectedProduct.expiry && selectedProduct.expiry.trim() !== ''
  const isOutOfStock = selectedProduct.availability === 'out-of-stock' || selectedProduct.inStock === false

  return (
    <AnimatePresence>
      {selectedProduct && (
        <div
          className="fixed inset-0 flex items-center justify-center p-4 sm:p-6"
          style={{ zIndex: 'calc(var(--z-splash) - 2)' }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Backdrop overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ type: 'spring', stiffness: 300, damping: 24 }}
            className="relative w-full max-w-3xl rounded-3xl overflow-hidden border shadow-2xl flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh]"
            style={{
              backgroundColor: 'var(--color-card)',
              borderColor:     'var(--color-border)',
            }}
          >
            {/* Close Button Top-Right */}
            <button
              ref={closeBtnRef}
              onClick={closeModal}
              aria-label="Close modal"
              className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full border flex items-center justify-center bg-white/80 dark:bg-black/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              style={{ borderColor: 'var(--color-border)' }}
            >
              <X size={18} style={{ color: 'var(--color-text)' }} />
            </button>

            {/* Left side: Large Product Image with Hover Zoom */}
            <div
              className="w-full md:w-1/2 aspect-square md:aspect-auto md:h-full relative overflow-hidden select-none bg-neutral-50 dark:bg-neutral-900 flex items-center justify-center shrink-0 border-b md:border-b-0 md:border-r"
              style={{ borderColor: 'var(--color-border)' }}
            >
              {selectedProduct.image && !imageError ? (
                <motion.img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-full object-cover origin-center"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.35, ease: 'easeOut' }}
                  onError={() => setImageError(true)}
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-3 py-12">
                  <span className="text-7xl" role="img" aria-label={selectedProduct.name}>
                    {selectedProduct.emoji || '✨'}
                  </span>
                  <span
                    className="font-body text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full"
                    style={{
                      backgroundColor: `${selectedProduct.color || '#C9A227'}18`,
                      color:           selectedProduct.color || '#C9A227',
                    }}
                  >
                    Image Coming Soon
                  </span>
                </div>
              )}

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5 pointer-events-none">
                {selectedProduct.isNew && (
                  <span
                    className="font-body text-[10px] font-bold px-2.5 py-1 rounded-full text-white uppercase tracking-wider"
                    style={{ backgroundColor: '#2d6b4c' }}
                  >
                    New
                  </span>
                )}
                {selectedProduct.featured && (
                  <span
                    className="font-body text-[10px] font-bold px-2.5 py-1 rounded-full text-white uppercase tracking-wider"
                    style={{ backgroundColor: 'var(--color-secondary)', color: '#2C2C2C' }}
                  >
                    Featured
                  </span>
                )}
              </div>
            </div>

            {/* Right side: Product Details */}
            <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col overflow-y-auto justify-between">
              <div className="space-y-4">
                {/* Category tag & availability */}
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <span
                    className="font-body text-[10px] font-extrabold uppercase tracking-widest"
                    style={{ color: 'var(--color-secondary)' }}
                  >
                    {selectedProduct.category.replace('-', ' ')}
                  </span>
                  <AvailabilityBadge
                    availability={selectedProduct.availability}
                    inStock={selectedProduct.inStock}
                  />
                </div>

                {/* Name */}
                <h2
                  id="modal-title"
                  className="font-heading text-2xl font-bold leading-tight"
                  style={{ color: 'var(--color-text)' }}
                >
                  {selectedProduct.name}
                </h2>

                {/* Pricing component */}
                <ProductPrice
                  markedPrice={selectedProduct.markedPrice}
                  sellingPrice={selectedProduct.sellingPrice}
                  size="lg"
                />

                {/* Description */}
                <div className="space-y-1">
                  <h4 className="font-heading text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                    Description
                  </h4>
                  <p
                    className="font-body text-sm leading-relaxed"
                    style={{ color: 'var(--color-text-muted)' }}
                  >
                    {selectedProduct.description || 'Premium quality product curated by Krishna Fancies. Visit us or message on WhatsApp to purchase or inquire.'}
                  </p>
                </div>

                {/* Expiry Date (only if available) */}
                {hasExpiry && (
                  <div className="pt-2">
                    <span className="font-heading text-xs font-bold uppercase tracking-wider block mb-1" style={{ color: 'var(--color-text-muted)' }}>
                      Expiry Date
                    </span>
                    <span
                      className="font-body text-xs px-2.5 py-1 rounded-lg border inline-block"
                      style={{
                        backgroundColor: 'var(--color-bg-alt)',
                        borderColor:     'var(--color-border)',
                        color:           'var(--color-text)',
                      }}
                    >
                      📅 {selectedProduct.expiry}
                    </span>
                  </div>
                )}
              </div>

              {/* Actions Footer */}
              <div className="flex flex-col sm:flex-row gap-3 pt-8 mt-auto">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1"
                >
                  <Button
                    id="modal-whatsapp-order"
                    variant="primary"
                    fullWidth
                    leftIcon={<MessageCircle size={18} />}
                    disabled={isOutOfStock}
                  >
                    Order on WhatsApp
                  </Button>
                </a>

                <Button
                  id="modal-close"
                  variant="outline"
                  onClick={closeModal}
                  className="sm:w-28"
                >
                  Close
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
