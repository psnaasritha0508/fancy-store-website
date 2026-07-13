import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Phone, MapPin, Mail, ExternalLink, Heart } from 'lucide-react'
import { motion } from 'framer-motion'
import { NAV_LINKS } from '@constants'
import Container from '@components/ui/Container'
import { storageService } from '@services/storageService'

// ─────────────────────────────────────────────────────────────────────────────
// Inline SVG Icons for social platforms
// ─────────────────────────────────────────────────────────────────────────────

function InstagramIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

function WhatsAppIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.124.558 4.115 1.532 5.84L.072 23.928 6.292 22.5A11.943 11.943 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.886 0-3.644-.5-5.162-1.374l-.368-.218-3.818.998 1.017-3.712-.24-.382A9.961 9.961 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z"/>
    </svg>
  )
}

function GoogleMapsIcon({ size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Footer
// Loads brand details dynamically from storageService for real-time synchronization.
// ─────────────────────────────────────────────────────────────────────────────

const linkHoverStyle = {
  onMouseEnter: e => (e.currentTarget.style.color = 'var(--color-secondary)'),
  onMouseLeave: e => (e.currentTarget.style.color = 'var(--color-text-muted)'),
}

export default function Footer() {
  const year = new Date().getFullYear()
  const [storeInfo, setStoreInfo] = useState(null)

  useEffect(() => {
    const loadSettings = () => {
      const settings = storageService.getSettings()
      if (settings && settings.storeInfo) {
        setStoreInfo(settings.storeInfo)
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

  if (!storeInfo) return null

  return (
    <footer
      className="border-t mt-auto"
      style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}
    >
      <Container className="pt-14 pb-10">
        <div className="divider-gold mb-10 w-full" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Column 1 — Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="inline-flex items-center gap-3 mb-4 group">
              <img
                src={storeInfo.logo}
                alt={`${storeInfo.name} logo`}
                className="h-14 w-14 object-contain group-hover:scale-105 transition-transform duration-300"
                draggable={false}
              />
              <div>
                <h2
                  className="font-heading text-xl font-bold leading-tight"
                  style={{ color: 'var(--color-primary)' }}
                >
                  {storeInfo.name}
                </h2>
                <p className="font-body text-xs font-semibold mt-0.5"
                   style={{ color: 'var(--color-secondary)' }}>
                  {storeInfo.tagline}
                </p>
              </div>
            </Link>

            <p className="font-body text-sm leading-relaxed mb-5 max-w-xs"
               style={{ color: 'var(--color-text-muted)' }}>
              A legacy of trust and quality spanning over five decades, serving generations of families with premium fancy goods.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-3">
              <SocialLink
                href={storeInfo.instagram}
                label="Instagram"
                id="footer-instagram"
              >
                <InstagramIcon size={17} />
              </SocialLink>

              <SocialLink
                href={`https://wa.me/${storeInfo.whatsapp}`}
                label="WhatsApp"
                id="footer-whatsapp"
              >
                <WhatsAppIcon size={17} />
              </SocialLink>

              <SocialLink
                href={storeInfo.googleMaps}
                label="Google Maps"
                id="footer-maps"
              >
                <GoogleMapsIcon size={17} />
              </SocialLink>
            </div>
          </div>

          {/* Column 2 — Quick Links */}
          <div>
            <FooterHeading>Quick Links</FooterHeading>
            <ul className="space-y-2.5">
              {NAV_LINKS.map(link => (
                <li key={link.href}>
                  <Link
                    to={link.href}
                    className="font-body text-sm flex items-center gap-2 transition-colors duration-[var(--transition-fast)]"
                    style={{ color: 'var(--color-text-muted)' }}
                    {...linkHoverStyle}
                  >
                    <span
                      className="w-1 h-1 rounded-full shrink-0"
                      style={{ backgroundColor: 'var(--color-secondary)' }}
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 — Contact */}
          <div>
            <FooterHeading>Contact Us</FooterHeading>
            <ul className="space-y-4">
              <li>
                <a
                  href={`tel:${storeInfo.phone}`}
                  id="footer-phone"
                  className="flex items-start gap-2.5 text-sm transition-colors duration-[var(--transition-fast)]"
                  style={{ color: 'var(--color-text-muted)' }}
                  {...linkHoverStyle}
                >
                  <Phone size={15} className="mt-0.5 shrink-0" style={{ color: 'var(--color-secondary)' }} />
                  <span>{storeInfo.phone}</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${storeInfo.email}`}
                  id="footer-email"
                  className="flex items-start gap-2.5 text-sm transition-colors duration-[var(--transition-fast)]"
                  style={{ color: 'var(--color-text-muted)' }}
                  {...linkHoverStyle}
                >
                  <Mail size={15} className="mt-0.5 shrink-0" style={{ color: 'var(--color-secondary)' }} />
                  <span>{storeInfo.email}</span>
                </a>
              </li>
              <li>
                <a
                  href={storeInfo.googleMaps}
                  target="_blank"
                  rel="noopener noreferrer"
                  id="footer-address"
                  className="flex items-start gap-2.5 text-sm transition-colors duration-[var(--transition-fast)]"
                  style={{ color: 'var(--color-text-muted)' }}
                  {...linkHoverStyle}
                >
                  <MapPin size={15} className="mt-0.5 shrink-0" style={{ color: 'var(--color-secondary)' }} />
                  <span>{storeInfo.address.full}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 — Instagram / Social */}
          <div>
            <FooterHeading>Follow Us</FooterHeading>
            <a
              href={storeInfo.instagram}
              target="_blank"
              rel="noopener noreferrer"
              id="footer-instagram-handle"
              className="inline-flex items-center gap-2 text-sm font-semibold mb-4 transition-colors duration-[var(--transition-fast)]"
              style={{ color: 'var(--color-text-muted)' }}
              {...linkHoverStyle}
            >
              <InstagramIcon size={16} />
              {storeInfo.instagramHandle}
              <ExternalLink size={12} />
            </a>

            <p className="font-body text-xs leading-relaxed mt-4"
               style={{ color: 'var(--color-text-light)' }}>
              ⚠️ <strong>Image Disclaimer:</strong> Product images on this website are for illustrative purposes only. Actual colors and designs may vary slightly due to screen calibration and photography conditions.
            </p>
          </div>
        </div>

        <div className="divider-gold w-full mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
          <p className="font-body text-xs" style={{ color: 'var(--color-text-light)' }}>
            © {year} {storeInfo.name}. All rights reserved.
          </p>
          <p className="font-body text-xs flex items-center gap-1" style={{ color: 'var(--color-text-light)' }}>
            Designed with{' '}
            <Heart size={11} fill="currentColor" style={{ color: 'var(--color-primary)' }} />
            {' '}for {storeInfo.name}
          </p>
        </div>
      </Container>
    </footer>
  )
}

function FooterHeading({ children }) {
  return (
    <h3
      className="font-heading text-sm font-bold uppercase tracking-widest mb-5"
      style={{ color: 'var(--color-text)' }}
    >
      {children}
    </h3>
  )
}

function SocialLink({ href, label, id, children }) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      id={id}
      aria-label={label}
      className="w-9 h-9 rounded-xl border flex items-center justify-center transition-colors duration-[var(--transition-fast)]"
      style={{
        borderColor: 'var(--color-border)',
        color:       'var(--color-text-muted)',
      }}
      whileHover={{ scale: 1.1, y: -2 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      onMouseEnter={e => {
        e.currentTarget.style.color       = 'var(--color-secondary)'
        e.currentTarget.style.borderColor = 'var(--color-secondary)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.color       = 'var(--color-text-muted)'
        e.currentTarget.style.borderColor = 'var(--color-border)'
      }}
    >
      {children}
    </motion.a>
  )
}
