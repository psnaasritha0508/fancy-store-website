import { motion } from 'framer-motion'
import Container from '@components/ui/Container'

// ─────────────────────────────────────────────────────────────────────────────
// WhyChooseUs — 4 feature cards with icons, hover animations
// ─────────────────────────────────────────────────────────────────────────────

const FEATURES = [
  {
    id:      'trust',
    emoji:   '⭐',
    title:   '50+ Years of Trust',
    text:    'Serving Hyderabad since the 1970s. Generations of families have made us their first choice for fancy and beauty products.',
    color:   '#C9A227',
    bgColor: '#FDF8EC',
  },
  {
    id:      'quality',
    emoji:   '💎',
    title:   'Quality Products',
    text:    'Every product on our shelves is carefully curated for quality, durability, and value — from premium brands to budget essentials.',
    color:   '#7B4B6A',
    bgColor: '#F7F0F4',
  },
  {
    id:      'variety',
    emoji:   '🎁',
    title:   'Wide Variety',
    text:    'From bangles and jewellery to beauty, skin care, home essentials and festive items — find everything under one roof.',
    color:   '#2d6b4c',
    bgColor: '#EEF4F0',
  },
  {
    id:      'service',
    emoji:   '😊',
    title:   'Friendly Service',
    text:    'Our warm, knowledgeable staff is always ready to help you find exactly what you need, with a personal touch.',
    color:   '#a83258',
    bgColor: '#FDF0F4',
  },
]

function FeatureCard({ feature, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay: index * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex flex-col p-6 sm:p-7 rounded-2xl border overflow-hidden cursor-default"
      style={{
        backgroundColor: 'var(--color-card)',
        borderColor:     'var(--color-border)',
        transition:      'box-shadow 0.25s ease, transform 0.25s ease, border-color 0.25s ease',
      }}
      whileHover={{
        y:           -6,
        boxShadow:   `0 12px 40px ${feature.color}22`,
        borderColor: feature.color,
      }}
    >
      {/* Background gradient on hover */}
      <motion.div
        className="absolute inset-0 pointer-events-none rounded-2xl"
        style={{
          background: `linear-gradient(135deg, ${feature.color}06, ${feature.color}12)`,
          opacity:    0,
        }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
      />

      {/* Icon circle */}
      <motion.div
        className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-5 shrink-0"
        style={{ backgroundColor: feature.bgColor }}
        whileHover={{ scale: 1.1, rotate: 3 }}
        transition={{ type: 'spring', stiffness: 300, damping: 18 }}
      >
        {feature.emoji}
      </motion.div>

      {/* Content */}
      <h3
        className="font-heading text-xl font-bold mb-3"
        style={{ color: 'var(--color-text)' }}
      >
        {feature.title}
      </h3>
      <p
        className="font-body text-sm leading-relaxed"
        style={{ color: 'var(--color-text-muted)' }}
      >
        {feature.text}
      </p>

      {/* Color accent bottom bar */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-0.5"
        style={{ backgroundColor: feature.color, scaleX: 0, originX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  )
}

export default function WhyChooseUs() {
  return (
    <section
      className="section-padding"
      style={{ backgroundColor: 'var(--color-bg-alt)' }}
      aria-label="Why choose Krishna Fancies"
    >
      <Container>
        {/* Heading */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="font-heading text-3xl sm:text-4xl font-bold mb-3"
            style={{ color: 'var(--color-text)' }}
          >
            Why Choose Krishna Fancies?
          </h2>
          <p className="font-body text-base max-w-lg mx-auto" style={{ color: 'var(--color-text-muted)' }}>
            We&apos;ve been earning your trust for over five decades
          </p>
          <div className="divider-gold w-20 mx-auto mt-4" />
        </motion.div>

        {/* Feature cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {FEATURES.map((feature, i) => (
            <FeatureCard key={feature.id} feature={feature} index={i} />
          ))}
        </div>
      </Container>
    </section>
  )
}
