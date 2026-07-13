import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import Button from '@components/ui/Button'
import Container from '@components/ui/Container'
import { storageService } from '@services/storageService'

// ─────────────────────────────────────────────────────────────────────────────
// SeasonalBanner — Configurable promotional banner
// Loads details dynamically from storageService for real-time synchronization.
// ─────────────────────────────────────────────────────────────────────────────

export default function SeasonalBanner() {
  const [banner, setBanner] = useState(null)

  useEffect(() => {
    const loadSettings = () => {
      const settings = storageService.getSettings()
      if (settings && settings.seasonalBanner) {
        setBanner(settings.seasonalBanner)
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

  if (!banner || !banner.active) return null

  // Link for the CTA button (defaults to filter category matching the style if possible)
  const ctaLink = `/shop?category=${banner.style.toLowerCase().replace(/\s+/g, '-')}`

  return (
    <section
      className="relative overflow-hidden animate-fade"
      aria-label="Seasonal promotion"
    >
      {/* ── Background image with gradient overlay ────────────────── */}
      <div className="absolute inset-0">
        <img
          src={banner.image || '/banner-bg.png'}
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
        />
        {/* Dark overlay so text is readable over any image */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(135deg, rgba(44, 17, 36, 0.88) 0%, rgba(123, 75, 106, 0.75) 50%, rgba(44, 17, 36, 0.65) 100%)',
          }}
        />
      </div>

      {/* ── Content ─────────────────────────────────────────────────── */}
      <Container className="relative z-10 py-16 sm:py-20">
        <div className="max-w-2xl mx-auto text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span
              className="inline-block font-body text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full mb-5"
              style={{ backgroundColor: 'var(--color-secondary)', color: '#2C2C2C' }}
            >
              {banner.badge}
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.6 }}
          >
            {banner.headline}
          </motion.h2>

          {/* Subtext */}
          <motion.p
            className="font-body text-base sm:text-lg leading-relaxed mb-8"
            style={{ color: 'rgba(255,255,255,0.82)' }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            {banner.subtext}
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5, type: 'spring', stiffness: 200 }}
          >
            <Link to={ctaLink}>
              <Button
                id="seasonal-banner-cta"
                variant="secondary"
                size="lg"
                rightIcon={<ArrowRight size={18} />}
              >
                {banner.cta}
              </Button>
            </Link>
          </motion.div>
        </div>
      </Container>

      {/* Decorative sparkles */}
      {['top-6 left-8', 'top-10 right-12', 'bottom-8 left-16', 'bottom-6 right-8'].map((pos, i) => (
        <motion.div
          key={i}
          className={`absolute ${pos} pointer-events-none text-lg`}
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2 + i * 0.4, repeat: Infinity, delay: i * 0.5 }}
          aria-hidden="true"
          style={{ color: 'var(--color-secondary)' }}
        >
          ✦
        </motion.div>
      ))}
    </section>
  )
}
