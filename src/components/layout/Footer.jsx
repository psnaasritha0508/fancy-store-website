import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail } from 'lucide-react'

// Inline Instagram icon (lucide-react version may not include social icons)
function InstagramIcon({ size = 16 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
    </svg>
  )
}

import {
  STORE_NAME,
  STORE_TAGLINE,
  STORE_PHONE,
  STORE_EMAIL,
  STORE_ADDRESS,
  STORE_INSTAGRAM,
  STORE_INSTAGRAM_HANDLE,
  STORE_GOOGLE_MAPS,
  NAV_LINKS,
} from '@constants'
import Container from '@components/ui/Container'

// ─────────────────────────────────────────────────────────────────────────────
// Footer Placeholder
// Full design to be implemented in a later phase.
// ─────────────────────────────────────────────────────────────────────────────

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      className="border-t mt-auto"
      style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}
    >
      <Container className="py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">

          {/* Brand column */}
          <div className="lg:col-span-2">
            <h3
              className="font-heading text-2xl font-bold mb-2"
              style={{ color: 'var(--color-primary)' }}
            >
              {STORE_NAME}
            </h3>
            <p className="font-body text-sm mb-5 max-w-xs" style={{ color: 'var(--color-text-muted)' }}>
              {STORE_TAGLINE}
            </p>
            {/* Social */}
            <a
              href={STORE_INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              id="footer-instagram"
              className="inline-flex items-center gap-2 text-sm font-semibold transition-colors duration-[var(--transition-fast)]"
              style={{ color: 'var(--color-text-muted)' }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-primary)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-muted)')}
            >
              <InstagramIcon size={16} />
              {STORE_INSTAGRAM_HANDLE}
            </a>
          </div>

          {/* Navigation column */}
          <div>
            <h4
              className="font-heading text-sm font-bold uppercase tracking-widest mb-4"
              style={{ color: 'var(--color-text)' }}
            >
              Navigation
            </h4>
            <ul className="space-y-2">
              {NAV_LINKS.map(link => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="font-body text-sm transition-colors duration-[var(--transition-fast)]"
                    style={{ color: 'var(--color-text-muted)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-primary)')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-muted)')}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact column */}
          <div>
            <h4
              className="font-heading text-sm font-bold uppercase tracking-widest mb-4"
              style={{ color: 'var(--color-text)' }}
            >
              Contact
            </h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={`tel:${STORE_PHONE}`}
                  id="footer-phone"
                  className="flex items-start gap-2 text-sm transition-colors duration-[var(--transition-fast)]"
                  style={{ color: 'var(--color-text-muted)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-primary)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-muted)')}
                >
                  <Phone size={14} className="mt-0.5 shrink-0" />
                  {STORE_PHONE}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${STORE_EMAIL}`}
                  id="footer-email"
                  className="flex items-start gap-2 text-sm transition-colors duration-[var(--transition-fast)]"
                  style={{ color: 'var(--color-text-muted)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-primary)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-muted)')}
                >
                  <Mail size={14} className="mt-0.5 shrink-0" />
                  {STORE_EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={STORE_GOOGLE_MAPS}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="footer-address"
                  className="flex items-start gap-2 text-sm transition-colors duration-[var(--transition-fast)]"
                  style={{ color: 'var(--color-text-muted)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'var(--color-primary)')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'var(--color-text-muted)')}
                >
                  <MapPin size={14} className="mt-0.5 shrink-0" />
                  {STORE_ADDRESS.full}
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <p className="font-body text-xs" style={{ color: 'var(--color-text-light)' }}>
            © {year} {STORE_NAME}. All rights reserved.
          </p>
          <p className="font-body text-xs" style={{ color: 'var(--color-text-light)' }}>
            Crafted with care ✦
          </p>
        </div>
      </Container>
    </footer>
  )
}
