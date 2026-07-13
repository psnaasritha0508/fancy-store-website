import {
  LayoutDashboard,
  Package,
  Layers,
  Star,
  Sparkles,
  Settings,
  LogOut
} from 'lucide-react'
import { motion } from 'framer-motion'
import Container from '@components/ui/Container'
import { STORE_NAME, STORE_LOGO } from '@constants'

// ─────────────────────────────────────────────────────────────────────────────
// DashboardLayout Component
// Sidebar on desktop, bottom navigation bar on mobile
// ─────────────────────────────────────────────────────────────────────────────

export const SECTIONS = [
  { id: 'dashboard',  label: 'Dashboard',  icon: LayoutDashboard },
  { id: 'products',   label: 'Products',   icon: Package },
  { id: 'categories', label: 'Categories', icon: Layers },
  { id: 'featured',   label: 'Featured',   icon: Star },
  { id: 'content',    label: 'Website Content', icon: Sparkles },
  { id: 'settings',   label: 'Settings',   icon: Settings },
]

export default function DashboardLayout({ activeSection, onSelectSection, onLogout, children }) {
  return (
    <div
      className="min-h-screen flex flex-col md:flex-row pb-20 md:pb-0"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      {/* ── 1. Desktop Left Sidebar ─────────────────────────────────── */}
      <aside
        className="hidden md:flex flex-col w-64 border-r shrink-0 min-h-screen sticky top-0"
        style={{
          backgroundColor: 'var(--color-card)',
          borderColor:     'var(--color-border)',
          height:          '100vh',
        }}
      >
        {/* Sidebar Header */}
        <div
          className="p-6 border-b flex items-center gap-3"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <img src={STORE_LOGO} alt="" className="w-9 h-9 object-contain" draggable={false} />
          <div>
            <h2 className="font-heading text-sm font-bold leading-tight" style={{ color: 'var(--color-text)' }}>
              {STORE_NAME}
            </h2>
            <span className="font-body text-[10px] text-neutral-400 font-semibold tracking-wider uppercase">
              Admin Panel
            </span>
          </div>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex-1 p-4 space-y-1">
          {SECTIONS.map((sec) => {
            const Icon = sec.icon
            const isActive = activeSection === sec.id

            return (
              <button
                key={sec.id}
                onClick={() => onSelectSection(sec.id)}
                className={[
                  'w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 cursor-pointer relative',
                  isActive
                    ? 'text-[var(--color-primary)]'
                    : 'text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-bg-alt)]',
                ].join(' ')}
              >
                {isActive && (
                  <motion.span
                    layoutId="sidebar-active-pill"
                    className="absolute inset-0 rounded-xl"
                    style={{ backgroundColor: 'var(--color-primary)', opacity: 0.08 }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                {isActive && (
                  <motion.span
                    layoutId="sidebar-active-indicator"
                    className="absolute left-0 top-3 bottom-3 w-1 rounded-full"
                    style={{ backgroundColor: 'var(--color-secondary)' }}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <Icon size={16} className="shrink-0" />
                <span>{sec.label}</span>
              </button>
            )
          })}
        </nav>

        {/* Sidebar Footer / Logout */}
        <div
          className="p-4 border-t"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 transition-all duration-200 cursor-pointer"
          >
            <LogOut size={16} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ── 2. Mobile Header ────────────────────────────────────────── */}
      <header
        className="md:hidden w-full border-b flex items-center justify-between px-6 py-4 sticky top-0 z-30"
        style={{
          backgroundColor: 'var(--color-card)',
          borderColor:     'var(--color-border)',
        }}
      >
        <div className="flex items-center gap-2.5">
          <img src={STORE_LOGO} alt="" className="w-8 h-8 object-contain" />
          <span className="font-heading text-sm font-bold" style={{ color: 'var(--color-text)' }}>
            {STORE_NAME} Admin
          </span>
        </div>
        <button
          onClick={onLogout}
          aria-label="Logout"
          className="p-2 rounded-xl hover:bg-red-50 hover:text-red-600 text-neutral-500"
        >
          <LogOut size={18} />
        </button>
      </header>

      {/* ── 3. Main Content Area ───────────────────────────────────── */}
      <main className="flex-1 p-6 md:p-10 overflow-y-auto max-h-screen">
        <Container className="max-w-5xl px-0">
          {children}
        </Container>
      </main>

      {/* ── 4. Mobile Bottom Navigation Bar ────────────────────────── */}
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 border-t flex items-center justify-around py-2 z-30"
        style={{
          backgroundColor: 'var(--color-card)',
          borderColor:     'var(--color-border)',
          boxShadow:       '0 -4px 16px rgba(0,0,0,0.06)',
        }}
      >
        {SECTIONS.map((sec) => {
          const Icon = sec.icon
          const isActive = activeSection === sec.id

          return (
            <button
              key={sec.id}
              onClick={() => onSelectSection(sec.id)}
              className={[
                'flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200 cursor-pointer relative',
                isActive ? 'text-[var(--color-primary)]' : 'text-neutral-400',
              ].join(' ')}
              style={{ width: '16%' }}
            >
              <Icon size={18} />
              <span className="text-[9px] font-bold mt-1 font-body">{sec.label}</span>
              {isActive && (
                <motion.span
                  layoutId="mobile-nav-active-underline"
                  className="absolute bottom-0 w-6 h-0.5 rounded-full"
                  style={{ backgroundColor: 'var(--color-secondary)' }}
                />
              )}
            </button>
          )
        })}
      </nav>
    </div>
  )
}
