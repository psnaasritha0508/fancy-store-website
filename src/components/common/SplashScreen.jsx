import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { STORE_NAME, STORE_LOGO, SPLASH_DURATION_MS } from '@constants'

// ─────────────────────────────────────────────────────────────────────────────
// SplashScreen
// Shows only on initial page load / browser refresh (not on SPA navigation).
// Tracks via sessionStorage so it only appears once per browser session.
// ─────────────────────────────────────────────────────────────────────────────

const SESSION_KEY = 'kf_splash_shown'

export default function SplashScreen({ onComplete }) {
  const [visible, setVisible] = useState(() => {
    // Only show if not yet shown in this browser session
    return !sessionStorage.getItem(SESSION_KEY)
  })

  useEffect(() => {
    if (!visible) {
      onComplete?.()
      return
    }

    // Mark as shown for this session
    sessionStorage.setItem(SESSION_KEY, '1')

    const timer = setTimeout(() => {
      setVisible(false)
    }, SPLASH_DURATION_MS)

    return () => clearTimeout(timer)
  }, [visible, onComplete])

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {visible && (
        <motion.div
          key="splash"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="fixed inset-0 flex flex-col items-center justify-center"
          style={{
            zIndex:          'var(--z-splash)',
            backgroundColor: '#FAF5EC', // Warm Ivory — matches light theme bg
          }}
          aria-hidden="true"
        >
          {/* Logo + brand card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.82, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -16 }}
            transition={{
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex flex-col items-center gap-4 select-none"
          >
            {/* Logo image */}
            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src={STORE_LOGO}
                alt={`${STORE_NAME} logo`}
                className="w-44 h-44 sm:w-52 sm:h-52 object-contain drop-shadow-md"
                draggable={false}
              />
            </motion.div>

            {/* Store name — positioned below logo, matching brand typography */}
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.6, ease: 'easeOut' }}
              className="font-heading text-3xl sm:text-4xl font-bold tracking-tight"
              style={{ color: '#C9A227' }}
            >
              {STORE_NAME}
            </motion.h1>

            {/* Animated underline */}
            <motion.div
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.5, ease: 'easeOut' }}
              style={{
                height: 2,
                width: '6rem',
                background: 'linear-gradient(90deg, transparent, #C9A227, transparent)',
                borderRadius: 2,
              }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
