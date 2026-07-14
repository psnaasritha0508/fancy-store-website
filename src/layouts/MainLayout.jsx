import { Outlet, ScrollRestoration } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import Navbar             from '@components/layout/Navbar'
import Footer             from '@components/layout/Footer'
import SplashScreen       from '@components/common/SplashScreen'
import FloatingWhatsApp   from '@components/common/FloatingWhatsApp'
import ScrollToTop        from '@components/common/ScrollToTop'
import AnnouncementBar    from '@components/common/AnnouncementBar'
import { ProductModal }   from '@components/shop'
import { ProductModalProvider } from '@context/ProductModalContext'

// ─────────────────────────────────────────────────────────────────────────────
// Main Layout — wraps all primary routes
// Integrates: ProductModalProvider, SplashScreen, Navbar, Page, Footer, modal
// ─────────────────────────────────────────────────────────────────────────────

export default function MainLayout() {
  // Track whether splash has finished so we reveal the app beneath
  const [splashDone, setSplashDone] = useState(false)
  const handleSplashComplete = useCallback(() => setSplashDone(true), [])

  return (
    <ProductModalProvider>
      {/* ── Splash Screen (only on initial load) ────────────────── */}
      <SplashScreen onComplete={handleSplashComplete} />

      {/* ── Application shell ────────────────────────────────────── */}
      <motion.div
        className="flex flex-col min-h-screen"
        style={{ backgroundColor: 'var(--color-bg)', color: 'var(--color-text)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: splashDone ? 1 : 0 }}
        transition={{ duration: 0.45, ease: 'easeIn' }}
      >
        {/* Global toast notifications */}
        <Toaster
          position="top-center"
          gutter={12}
          toastOptions={{
            duration: 4000,
            style: {
              fontFamily:   "'Lato', sans-serif",
              fontSize:     '0.875rem',
              background:   'var(--color-card)',
              color:        'var(--color-text)',
              border:       '1px solid var(--color-border)',
              boxShadow:    'var(--shadow-md)',
              borderRadius: '0.75rem',
              padding:      '0.75rem 1rem',
            },
            success: {
              iconTheme: { primary: '#2d6b4c', secondary: '#FFFFFF' },
            },
            error: {
              iconTheme: { primary: '#DC2626', secondary: '#FFFFFF' },
            },
          }}
        />

        <AnnouncementBar />

        {/* Sticky navbar */}
        <Navbar />

        {/* Main content — offset by navbar height */}
        <main
          className="flex-1 w-full"
          style={{ paddingTop: 'calc(var(--navbar-height) + var(--announcement-height, 0px))' }}
        >
          <Outlet />
        </main>

        {/* Footer */}
        <Footer />

        {/* Single global product details modal instance */}
        <ProductModal />

        {/* Floating action buttons */}
        <FloatingWhatsApp />
        <ScrollToTop />

        {/* Restore scroll position on route change */}
        <ScrollRestoration />
      </motion.div>
    </ProductModalProvider>
  )
}
