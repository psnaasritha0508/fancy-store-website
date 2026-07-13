import { Link, NavLink, useLocation } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Sun, Moon, ShoppingBag } from 'lucide-react'
import { useTheme } from '@context/ThemeContext'
import { NAV_LINKS } from '@constants'
import Container from '@components/ui/Container'
import { storageService } from '@services/storageService'

// ─────────────────────────────────────────────────────────────────────────────
// Navbar — Sticky, scroll-aware, mobile-first, with theme toggle
// Loads brand details dynamically from storageService for real-time synchronization.
// ─────────────────────────────────────────────────────────────────────────────

// Mobile menu animation variants
const mobileMenuVariants = {
  closed: {
    opacity: 0,
    x: '100%',
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  },
  open: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
  },
}

const mobileNavItemVariants = {
  closed: { opacity: 0, x: 24 },
  open:   (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.05 + i * 0.06, duration: 0.3, ease: 'easeOut' },
  }),
}

// Theme toggle icon animation
function ThemeToggle({ isDark, onToggle }) {
  return (
    <motion.button
      id="theme-toggle"
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="relative w-9 h-9 rounded-xl flex items-center justify-center overflow-hidden"
      style={{ color: 'var(--color-text-muted)' }}
      whileTap={{ scale: 0.85 }}
      whileHover={{ scale: 1.08 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isDark ? 'sun' : 'moon'}
          initial={{ rotate: -90, opacity: 0, scale: 0.5 }}
          animate={{ rotate: 0, opacity: 1, scale: 1 }}
          exit={{ rotate: 90, opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.22, ease: 'easeInOut' }}
          style={{ display: 'flex' }}
        >
          {isDark
            ? <Sun size={18} style={{ color: 'var(--color-secondary)' }} />
            : <Moon size={18} />
          }
        </motion.span>
      </AnimatePresence>
    </motion.button>
  )
}

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme()
  const [mobileOpen, setMobileOpen]   = useState(false)
  const [scrolled,   setScrolled]     = useState(false)
  const location = useLocation()
  
  // Settings state (loads from storage)
  const [brand, setBrand] = useState({ name: 'Krishna Fancies', logo: '/logo.png' })

  useEffect(() => {
    const loadSettings = () => {
      const settings = storageService.getSettings()
      if (settings && settings.storeInfo) {
        setBrand({
          name: settings.storeInfo.name,
          logo: settings.storeInfo.logo
        })
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

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false) }, [location.pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  // Scroll detection
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 20)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  const closeMobile = () => setMobileOpen(false)

  // Navbar height transitions on scroll
  const navHeight  = scrolled ? '3.75rem' : '4.5rem'
  const navShadow  = scrolled ? 'var(--shadow-md)' : 'var(--shadow-sm)'
  const navBgAlpha = scrolled ? '0.97' : '0.92'

  return (
    <>
      {/* ── Desktop + Mobile header bar ────────────────────────────── */}
      <header
        className="fixed top-0 left-0 right-0 backdrop-blur-md border-b"
        style={{
          height:          navHeight,
          zIndex:          'var(--z-navbar)',
          backgroundColor: isDark
            ? `rgba(26, 17, 24, ${navBgAlpha})`
            : `rgba(253, 250, 245, ${navBgAlpha})`,
          borderColor:     'var(--color-border)',
          boxShadow:       navShadow,
          transition:      'height 0.3s ease, box-shadow 0.3s ease, background-color 0.3s ease',
        }}
      >
        <Container className="h-full flex items-center justify-between">

          {/* ── Logo ─────────────────────────────────────────────── */}
          <Link
            to="/"
            className="flex items-center gap-2.5 shrink-0"
            onClick={closeMobile}
            aria-label={`${brand.name} — Home`}
          >
            <motion.img
              src={brand.logo}
              alt={`${brand.name} logo`}
              className="object-contain"
              style={{ height: scrolled ? '2.2rem' : '2.6rem', transition: 'height 0.3s ease' }}
              draggable={false}
              whileHover={{ scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
            />
            <span
              className="font-heading font-bold hidden xs:block"
              style={{
                fontSize:     scrolled ? '1.1rem' : '1.2rem',
                color:        'var(--color-primary)',
                transition:   'font-size 0.3s ease',
                letterSpacing: '-0.01em',
              }}
            >
              {brand.name}
            </span>
          </Link>

          {/* ── Desktop navigation ──────────────────────────────── */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {NAV_LINKS.map(link => (
              <NavLink
                key={link.href}
                to={link.href}
                end={link.href === '/'}
                className={({ isActive }) => [
                  'relative px-4 py-2 rounded-lg font-body text-sm font-semibold',
                  'transition-colors duration-[var(--transition-fast)]',
                  isActive
                    ? 'text-[var(--color-primary)]'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)]',
                ].join(' ')}
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-pill"
                        className="absolute inset-0 rounded-lg"
                        style={{ backgroundColor: 'var(--color-primary)', opacity: 0.08 }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-underline"
                        className="absolute bottom-0 left-3 right-3 h-0.5 rounded-full"
                        style={{ backgroundColor: 'var(--color-secondary)' }}
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* ── Action buttons ──────────────────────────────────── */}
          <div className="flex items-center gap-1">
            {/* Theme toggle */}
            <ThemeToggle isDark={isDark} onToggle={toggleTheme} />

            {/* Cart (placeholder — will be wired in future phase) */}
            <motion.button
              id="cart-button"
              aria-label="Open cart"
              className="w-9 h-9 rounded-xl flex items-center justify-center hidden sm:flex"
              style={{ color: 'var(--color-text-muted)' }}
              whileTap={{ scale: 0.85 }}
              whileHover={{ scale: 1.08 }}
            >
              <ShoppingBag size={18} />
            </motion.button>

            {/* Hamburger (mobile only) */}
            <motion.button
              id="mobile-menu-toggle"
              onClick={() => setMobileOpen(o => !o)}
              aria-label={mobileOpen ? 'Close menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
              className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center ml-1"
              style={{ color: 'var(--color-text)' }}
              whileTap={{ scale: 0.85 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={mobileOpen ? 'x' : 'menu'}
                  initial={{ rotate: -45, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 45, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                  style={{ display: 'flex' }}
                >
                  {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </Container>
      </header>

      {/* ── Mobile menu overlay ──────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 md:hidden"
              style={{
                zIndex:          'calc(var(--z-navbar) - 1)',
                backgroundColor: 'rgba(0,0,0,0.45)',
                backdropFilter:  'blur(2px)',
              }}
              onClick={closeMobile}
              aria-hidden="true"
            />

            {/* Slide-in drawer */}
            <motion.div
              key="mobile-drawer"
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 bottom-0 w-[min(80vw,320px)] md:hidden flex flex-col"
              style={{
                zIndex:          'var(--z-navbar)',
                backgroundColor: 'var(--color-card)',
                boxShadow:       '-4px 0 32px rgba(0,0,0,0.18)',
              }}
              role="dialog"
              aria-modal="true"
              aria-label="Navigation menu"
            >
              {/* Drawer header */}
              <div
                className="flex items-center justify-between px-6 border-b"
                style={{
                  height:      navHeight,
                  borderColor: 'var(--color-border)',
                  transition:  'height 0.3s ease',
                }}
              >
                <Link to="/" onClick={closeMobile} className="flex items-center gap-2">
                  <img src={brand.logo} alt="logo" className="h-9 w-9 object-contain" draggable={false} />
                  <span className="font-heading font-bold text-base" style={{ color: 'var(--color-primary)' }}>
                    {brand.name}
                  </span>
                </Link>
                <motion.button
                  onClick={closeMobile}
                  aria-label="Close menu"
                  className="w-9 h-9 rounded-xl flex items-center justify-center"
                  style={{ color: 'var(--color-text-muted)' }}
                  whileTap={{ scale: 0.85 }}
                >
                  <X size={20} />
                </motion.button>
              </div>

              {/* Nav links */}
              <nav className="flex flex-col flex-1 px-4 py-6 gap-1" aria-label="Mobile navigation">
                {NAV_LINKS.map((link, i) => (
                  <motion.div
                    key={link.href}
                    custom={i}
                    variants={mobileNavItemVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                  >
                    <NavLink
                      to={link.href}
                      end={link.href === '/'}
                      onClick={closeMobile}
                      className={({ isActive }) => [
                        'flex items-center px-4 py-3.5 rounded-xl font-body font-semibold text-base',
                        'transition-colors duration-[var(--transition-fast)]',
                        isActive
                          ? 'text-[var(--color-primary)] bg-[var(--color-bg-alt)]'
                          : 'text-[var(--color-text)] hover:bg-[var(--color-bg-alt)]',
                      ].join(' ')}
                    >
                      {({ isActive }) => (
                        <span className="flex items-center gap-3 w-full">
                          {isActive && (
                            <span
                              className="w-1 h-5 rounded-full shrink-0"
                              style={{ backgroundColor: 'var(--color-secondary)' }}
                            />
                          )}
                          {link.label}
                        </span>
                      )}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              {/* Drawer footer */}
              <div
                className="px-6 py-5 border-t flex items-center justify-between"
                style={{ borderColor: 'var(--color-border)' }}
              >
                <span className="font-body text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  Toggle theme
                </span>
                <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
