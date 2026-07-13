import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight, MapPin } from 'lucide-react'
import Button from '@components/ui/Button'
import Container from '@components/ui/Container'
import { STORE_NAME, STORE_TAGLINE } from '@constants'

// ─────────────────────────────────────────────────────────────────────────────
// HeroSection — Premium split layout with decorative right panel
// ─────────────────────────────────────────────────────────────────────────────

// Stagger container for text animations
const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const fadeUp = {
  hidden:  { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
}

const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } },
}

export default function HeroSection() {
  return (
    <section
      className="relative min-h-[92vh] flex items-center overflow-hidden"
      style={{ backgroundColor: 'var(--color-bg)' }}
      aria-label="Hero"
    >
      {/* ── Right-side decorative hero image ───────────────────────── */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        variants={fadeIn}
        initial="hidden"
        animate="visible"
      >
        <img
          src="/hero-bg.png"
          alt=""
          aria-hidden="true"
          className="w-full h-full object-cover"
          style={{ opacity: 0.55 }}
        />
        {/* Gradient overlay — left side readable, right side image */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(105deg, var(--color-bg) 42%, transparent 75%)',
          }}
        />
        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32"
          style={{
            background: 'linear-gradient(to top, var(--color-bg), transparent)',
          }}
        />
      </motion.div>

      {/* ── Decorative corner ornaments ─────────────────────────────── */}
      <div
        className="absolute top-10 left-4 w-20 h-20 rounded-full opacity-10 pointer-events-none"
        style={{ backgroundColor: 'var(--color-secondary)' }}
      />
      <div
        className="absolute bottom-20 left-8 w-10 h-10 rounded-full opacity-10 pointer-events-none"
        style={{ backgroundColor: 'var(--color-primary)' }}
      />

      {/* ── Main content ─────────────────────────────────────────────── */}
      <Container className="relative z-10 py-20 sm:py-28">
        <motion.div
          className="max-w-xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div variants={fadeUp}>
            <span
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6"
              style={{
                backgroundColor: 'var(--color-secondary)',
                color:           '#2C2C2C',
              }}
            >
              <span>⭐</span>
              Hyderabad's Most Trusted Since 1970s
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            variants={fadeUp}
            className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.15] mb-5"
            style={{ color: 'var(--color-text)' }}
          >
            {STORE_TAGLINE.split(' ').slice(0, 3).join(' ')}{' '}
            <span style={{ color: 'var(--color-primary)' }}>
              of Trusted{' '}
            </span>
            <span
              className="italic"
              style={{ color: 'var(--color-secondary)' }}
            >
              Service
            </span>
          </motion.h1>

          {/* Sub-heading */}
          <motion.p
            variants={fadeUp}
            className="font-body text-base sm:text-lg leading-relaxed mb-8 max-w-md"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Your One-Stop Destination for Fancy, Beauty &amp; Everyday Essentials.
            Generations of families trust Krishna Fancies for quality and variety.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap gap-3 mb-10"
          >
            <Link to="/shop">
              <Button
                id="hero-shop-now"
                variant="primary"
                size="lg"
                rightIcon={<ArrowRight size={18} />}
              >
                Shop Now
              </Button>
            </Link>

            <Link to="/contact">
              <Button
                id="hero-visit-store"
                variant="outline"
                size="lg"
                leftIcon={<MapPin size={18} />}
              >
                Visit Store
              </Button>
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            variants={fadeUp}
            className="flex flex-wrap gap-5"
          >
            {[
              { value: '50+', label: 'Years of Service' },
              { value: '10K+', label: 'Happy Customers' },
              { value: '5000+', label: 'Products' },
            ].map(stat => (
              <div key={stat.label}>
                <p
                  className="font-heading text-2xl font-bold"
                  style={{ color: 'var(--color-primary)' }}
                >
                  {stat.value}
                </p>
                <p
                  className="font-body text-xs"
                  style={{ color: 'var(--color-text-muted)' }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </Container>

      {/* ── Scroll indicator ─────────────────────────────────────────── */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <span
          className="font-body text-xs uppercase tracking-widest"
          style={{ color: 'var(--color-text-light)' }}
        >
          Scroll to explore
        </span>
        <motion.div
          className="w-5 h-8 rounded-full border-2 flex items-start justify-center pt-1.5"
          style={{ borderColor: 'var(--color-text-light)' }}
        >
          <motion.div
            className="w-1 h-2 rounded-full"
            style={{ backgroundColor: 'var(--color-secondary)' }}
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
