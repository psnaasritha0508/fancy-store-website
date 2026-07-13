import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import Container from '@components/ui/Container'
import Section from '@components/ui/Section'
import { storageService } from '@services/storageService'

// ─────────────────────────────────────────────────────────────────────────────
// CategoriesSection — Responsive grid of category cards
// Clicking navigates to /shop?category={id}
// Loads categories dynamically from storageService for real-time synchronization.
// ─────────────────────────────────────────────────────────────────────────────

const cardVariants = {
  hidden:  { opacity: 0, y: 28, scale: 0.96 },
  visible: (i) => ({
    opacity:    1,
    y:          0,
    scale:      1,
    transition: { delay: i * 0.04, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  }),
}

function CategoryCard({ category, index }) {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate(`/shop?category=${category.id}`)
  }

  // Set default theme colors if missing from user-created categories
  const color = category.color || '#7B4B6A'
  const bgLight = category.bgLight || '#F7F0F4'

  return (
    <motion.button
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      onClick={handleClick}
      className="group relative flex flex-col items-center gap-3 p-5 rounded-2xl border cursor-pointer text-center w-full"
      style={{
        backgroundColor: 'var(--color-card)',
        borderColor:     'var(--color-border)',
        transition:      'all 0.25s ease',
      }}
      whileHover={{ y: -5, scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      aria-label={`Browse ${category.label}`}
    >
      {/* Color accent top bar */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-0.5 rounded-t-2xl"
        style={{ backgroundColor: color, opacity: 0 }}
        animate={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
      />

      {/* Emoji icon in colored circle */}
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center text-2xl shrink-0 transition-transform duration-200 group-hover:scale-110"
        style={{ backgroundColor: bgLight }}
      >
        {category.emoji || '✨'}
      </div>

      {/* Label */}
      <span
        className="font-body text-sm font-bold leading-tight"
        style={{ color: 'var(--color-text)' }}
      >
        {category.label}
      </span>

      {/* Description */}
      <span
        className="hidden sm:block font-body text-xs leading-relaxed line-clamp-2"
        style={{ color: 'var(--color-text-muted)' }}
      >
        {category.description || 'Browse premium fancy collection items.'}
      </span>

      {/* Hover overlay */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-250"
        style={{
          background: `linear-gradient(135deg, ${color}08, ${color}16)`,
          boxShadow:  `0 8px 24px ${color}22`,
        }}
      />
    </motion.button>
  )
}

export default function CategoriesSection() {
  const [categories, setCategories] = useState([])

  useEffect(() => {
    setCategories(storageService.getCategories())
    
    // Listen for storage events (sync between admin tab/window)
    const handleSync = () => {
      setCategories(storageService.getCategories())
    }
    window.addEventListener('focus', handleSync)
    window.addEventListener('storage', handleSync)
    return () => {
      window.removeEventListener('focus', handleSync)
      window.removeEventListener('storage', handleSync)
    }
  }, [])

  return (
    <Section
      bg="alt"
      withContainer={false}
      aria-label="Shop by categories"
    >
      <Container>
        {/* Heading */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2
            className="font-heading text-3xl sm:text-4xl font-bold mb-3"
            style={{ color: 'var(--color-text)' }}
          >
            Shop by Categories
          </h2>
          <p className="font-body text-base" style={{ color: 'var(--color-text-muted)' }}>
            Explore our wide range of premium products
          </p>
          <div className="divider-gold w-20 mx-auto mt-4" />
        </motion.div>

        {/* Grid — 2 cols on xs, 3 on sm, 4 on md, 5 on lg+ */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
          {categories.map((cat, i) => (
            <CategoryCard key={cat.id || cat.label} category={cat} index={i} />
          ))}
        </div>
      </Container>
    </Section>
  )
}
