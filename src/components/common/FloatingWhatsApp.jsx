import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { STORE_NAME, STORE_WHATSAPP } from '@constants'

// ─────────────────────────────────────────────────────────────────────────────
// FloatingWhatsApp
// Sticky bottom-right WhatsApp button with pulse ring and tooltip label.
// ─────────────────────────────────────────────────────────────────────────────

function WhatsAppSVG() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.115 1.532 5.84L.072 23.928 6.292 22.5A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.886 0-3.644-.5-5.162-1.374l-.368-.218-3.818.998 1.017-3.712-.24-.382A9.961 9.961 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
    </svg>
  )
}

const WHATSAPP_MESSAGE = encodeURIComponent(
  `Hi ${STORE_NAME}! I'm interested in your products.`
)

export default function FloatingWhatsApp() {
  const [hovered, setHovered] = useState(false)
  const href = `https://wa.me/${STORE_WHATSAPP}?text=${WHATSAPP_MESSAGE}`

  return (
    <motion.div
      className="fixed bottom-6 right-6 flex items-center gap-3"
      style={{ zIndex: 'var(--z-floating)' }}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay: 1.2, type: 'spring', stiffness: 260, damping: 20 }}
    >
      {/* Tooltip label */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: 12, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 12, scale: 0.9 }}
            transition={{ duration: 0.18 }}
            className="font-body text-xs font-semibold px-3 py-2 rounded-xl whitespace-nowrap pointer-events-none"
            style={{
              backgroundColor: '#25D366',
              color:           '#FFFFFF',
              boxShadow:       '0 4px 14px rgba(37, 211, 102, 0.35)',
            }}
          >
            Chat on WhatsApp
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button */}
      <div className="relative">
        {/* Pulse ring */}
        <motion.span
          className="absolute inset-0 rounded-full"
          style={{ backgroundColor: '#25D366' }}
          animate={{ scale: [1, 1.45, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        />

        <motion.a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          id="floating-whatsapp"
          aria-label="Chat with us on WhatsApp"
          className="relative flex items-center justify-center w-14 h-14 rounded-full text-white"
          style={{
            backgroundColor: '#25D366',
            boxShadow:       '0 4px 20px rgba(37, 211, 102, 0.45)',
          }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 400, damping: 17 }}
          onHoverStart={() => setHovered(true)}
          onHoverEnd={() => setHovered(false)}
        >
          <WhatsAppSVG />
        </motion.a>
      </div>
    </motion.div>
  )
}
