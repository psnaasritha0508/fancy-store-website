import { Link, NavLink } from 'react-router-dom'
import { useState } from 'react'
import { Menu, X, ShoppingBag, Sun, Moon } from 'lucide-react'
import { useTheme } from '@context/ThemeContext'
import { NAV_LINKS, STORE_NAME } from '@constants'
import Container from '@components/ui/Container'

// ─────────────────────────────────────────────────────────────────────────────
// Navbar Placeholder
// Full implementation coming in a future phase.
// ─────────────────────────────────────────────────────────────────────────────

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)

  const closeMobile = () => setMobileOpen(false)

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 border-b"
      style={{
        height:          'var(--navbar-height)',
        backgroundColor: 'var(--color-card)',
        borderColor:     'var(--color-border)',
        boxShadow:       'var(--shadow-sm)',
      }}
    >
      <Container className="h-full flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="font-heading text-xl font-bold tracking-tight"
          style={{ color: 'var(--color-primary)' }}
          onClick={closeMobile}
        >
          {STORE_NAME}
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {NAV_LINKS.map(link => (
            <NavLink
              key={link.href}
              to={link.href}
              end={link.href === '/'}
              className={({ isActive }) => [
                'font-body text-sm font-semibold transition-colors duration-[var(--transition-fast)]',
                'pb-0.5 border-b-2',
                isActive
                  ? 'border-[var(--color-primary)] text-[var(--color-primary)]'
                  : 'border-transparent hover:text-[var(--color-primary)]',
              ].join(' ')}
              style={({ isActive }) => ({
                color: isActive ? 'var(--color-primary)' : 'var(--color-text)',
              })}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-3">
          {/* Theme toggle */}
          <button
            id="theme-toggle"
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors duration-[var(--transition-fast)]"
            style={{ color: 'var(--color-text-muted)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-primary)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-muted)')}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Cart placeholder */}
          <button
            id="cart-button"
            aria-label="Open cart"
            className="w-9 h-9 rounded-xl flex items-center justify-center transition-colors duration-[var(--transition-fast)]"
            style={{ color: 'var(--color-text-muted)' }}
            onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-primary)')}
            onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-muted)')}
          >
            <ShoppingBag size={18} />
          </button>

          {/* Mobile hamburger */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setMobileOpen(o => !o)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            className="md:hidden w-9 h-9 rounded-xl flex items-center justify-center transition-colors duration-[var(--transition-fast)]"
            style={{ color: 'var(--color-text)' }}
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="md:hidden border-t"
          style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}
        >
          <nav className="flex flex-col py-3">
            {NAV_LINKS.map(link => (
              <NavLink
                key={link.href}
                to={link.href}
                end={link.href === '/'}
                onClick={closeMobile}
                className={({ isActive }) => [
                  'font-body font-semibold px-6 py-3 text-sm transition-colors duration-[var(--transition-fast)]',
                  isActive
                    ? 'text-[var(--color-primary)] bg-[var(--color-bg-alt)]'
                    : 'hover:bg-[var(--color-bg-alt)]',
                ].join(' ')}
                style={({ isActive }) => ({
                  color: isActive ? 'var(--color-primary)' : 'var(--color-text)',
                })}
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      )}
    </header>
  )
}
