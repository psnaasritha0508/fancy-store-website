import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useCallback } from 'react'
import { ChevronUp } from 'lucide-react'

// ─────────────────────────────────────────────────────────────────────────────
// ScrollToTop
// Appears after scrolling 300px. Smooth-scrolls back to top on click.
// Positioned above the WhatsApp button.
// ─────────────────────────────────────────────────────────────────────────────

const SHOW_AFTER_PX = 300

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  const handleScroll = useCallback(() => {
    setVisible(window.scrollY > SHOW_AFTER_PX)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="scroll-to-top"
          id="scroll-to-top"
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className="fixed bottom-[5.5rem] right-6 w-11 h-11 rounded-xl flex items-center justify-center border"
          style={{
            zIndex:          'var(--z-floating)',
            backgroundColor: 'var(--color-card)',
            borderColor:     'var(--color-border)',
            color:           'var(--color-primary)',
            boxShadow:       'var(--shadow-md)',
          }}
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ type: 'spring', stiffness: 300, damping: 22 }}
          whileHover={{
            scale:           1.1,
            y:               -2,
            backgroundColor: 'var(--color-primary)',
            color:           '#FFFFFF',
          }}
          whileTap={{ scale: 0.9 }}
        >
          <ChevronUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
