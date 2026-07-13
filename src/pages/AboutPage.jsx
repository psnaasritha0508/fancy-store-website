import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, MessageCircle, MapPin, Award, ShieldCheck, Heart, Sparkles } from 'lucide-react'
import Container from '@components/ui/Container'
import Button from '@components/ui/Button'
import { storageService } from '@services/storageService'

// ─────────────────────────────────────────────────────────────────────────────
// About Page Component
// Renders Hero, Timeline story, Mission & Vision, and Trust indicators.
// Pulls values dynamically from storageService settings.
// ─────────────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  const [storeInfo, setStoreInfo] = useState(null)
  const [aboutPage, setAboutPage] = useState(null)

  useEffect(() => {
    const loadSettings = () => {
      const settings = storageService.getSettings()
      if (settings) {
        if (settings.storeInfo) setStoreInfo(settings.storeInfo)
        if (settings.aboutPage) setAboutPage(settings.aboutPage)
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

  useEffect(() => {
    if (storeInfo) {
      document.title = `About Us — ${storeInfo.name}`
    }
  }, [storeInfo])

  if (!storeInfo || !aboutPage) return null

  const whatsappUrl = `https://wa.me/${storeInfo.whatsapp}?text=${encodeURIComponent(`Hi ${storeInfo.name}, I was reading your story and wanted to ask a question.`)}`

  return (
    <div className="min-h-screen pb-16" style={{ backgroundColor: 'var(--color-bg)' }}>
      {/* ── 1. Hero Section ─────────────────────────────────────────── */}
      <section
        className="relative py-20 overflow-hidden border-b"
        style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}
      >
        <div
          className="absolute -top-24 -left-24 w-72 h-72 rounded-full opacity-5 pointer-events-none"
          style={{ backgroundColor: 'var(--color-primary)' }}
        />
        <Container className="relative z-10 text-center max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-heading text-4xl sm:text-5xl font-extrabold mb-3 text-[var(--color-primary)]"
          >
            {storeInfo.name}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-body text-base sm:text-lg max-w-lg mx-auto"
            style={{ color: 'var(--color-text-muted)' }}
          >
            Serving with Trust for Over 50 Years
          </motion.p>
          <div className="divider-gold w-20 mx-auto mt-4" />
        </Container>
      </section>

      {/* ── 2. Our Story Timeline ───────────────────────────────────── */}
      <section className="section-padding">
        <Container className="max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold" style={{ color: 'var(--color-text)' }}>
              Our Story
            </h2>
            <p className="font-body text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>
              Spanning over five decades of service excellence
            </p>
          </div>

          {/* Timeline Nodes */}
          <div className="relative border-l-2 ml-4 sm:ml-6 space-y-10" style={{ borderColor: 'var(--color-border)' }}>
            {aboutPage.story.map((milestone, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative pl-8 sm:pl-10"
              >
                {/* Timeline node dot */}
                <span
                  className="absolute -left-[11px] top-1.5 w-5 h-5 rounded-full border-4 flex items-center justify-center bg-white dark:bg-neutral-900"
                  style={{ borderColor: 'var(--color-secondary)' }}
                />

                {/* Milestone Card */}
                <div
                  className="p-5 rounded-2xl border"
                  style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)', boxShadow: 'var(--shadow-sm)' }}
                >
                  <span
                    className="font-heading text-sm font-bold uppercase tracking-widest block mb-1"
                    style={{ color: 'var(--color-secondary)' }}
                  >
                    {milestone.year}
                  </span>
                  <h3 className="font-heading text-base font-bold mb-2" style={{ color: 'var(--color-text)' }}>
                    {milestone.title}
                  </h3>
                  <p className="font-body text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                    {milestone.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      {/* ── 3. Mission & Vision ─────────────────────────────────────── */}
      <section className="section-padding" style={{ backgroundColor: 'var(--color-bg-alt)' }}>
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Mission Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl border flex flex-col items-center text-center space-y-4 shadow-sm"
              style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}
            >
              <span className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center">
                <Award size={22} />
              </span>
              <h3 className="font-heading text-lg font-bold" style={{ color: 'var(--color-text)' }}>
                Our Mission
              </h3>
              <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                {aboutPage.mission}
              </p>
            </motion.div>

            {/* Vision Card */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="p-8 rounded-3xl border flex flex-col items-center text-center space-y-4 shadow-sm"
              style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}
            >
              <span className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-500 flex items-center justify-center">
                <Sparkles size={22} />
              </span>
              <h3 className="font-heading text-lg font-bold" style={{ color: 'var(--color-text)' }}>
                Our Vision
              </h3>
              <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                {aboutPage.vision}
              </p>
            </motion.div>
          </div>
        </Container>
      </section>

      {/* ── 4. Why Customers Trust Us ─────────────────────────────── */}
      <section className="section-padding">
        <Container>
          <div className="text-center mb-12">
            <h2 className="font-heading text-2xl sm:text-3xl font-bold" style={{ color: 'var(--color-text)' }}>
              Why Customers Trust Us
            </h2>
            <p className="font-body text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>
              Quality and relationships built over half a century
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto">
            {[
              { id: '1', title: '50+ Years Experience', text: 'Serving our community with pride since 1970s.', icon: ShieldCheck, color: 'var(--color-secondary)' },
              { id: '2', title: 'Quality Products', text: 'Curated only from premium brands and distributors.', icon: Award, color: 'var(--color-primary)' },
              { id: '3', title: 'Wide Variety', text: 'Everything you need under one friendly roof.', icon: Sparkles, color: 'var(--color-secondary)' },
              { id: '4', title: 'Friendly Service', text: 'Knowledgeable support for a tailored visit.', icon: Heart, color: 'var(--color-primary)' }
            ].map((card, i) => {
              const Icon = card.icon
              return (
                <motion.div
                  key={card.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="p-6 rounded-2xl border text-center flex flex-col items-center space-y-3"
                  style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}
                >
                  <span className="w-10 h-10 rounded-xl flex items-center justify-center bg-neutral-50 dark:bg-neutral-800" style={{ color: card.color }}>
                    <Icon size={18} />
                  </span>
                  <h4 className="font-heading text-sm font-bold" style={{ color: 'var(--color-text)' }}>
                    {card.title}
                  </h4>
                  <p className="font-body text-xs" style={{ color: 'var(--color-text-muted)' }}>
                    {card.text}
                  </p>
                </motion.div>
              )
            })}
          </div>
        </Container>
      </section>

      {/* ── 5. Visit Our Store CTA ──────────────────────────────────── */}
      <section className="section-padding" style={{ backgroundColor: 'var(--color-bg-alt)' }}>
        <Container className="text-center max-w-xl space-y-6">
          <h2 className="font-heading text-2xl sm:text-3xl font-bold" style={{ color: 'var(--color-text)' }}>
            Come Visit Us Today
          </h2>
          <p className="font-body text-sm max-w-md mx-auto leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
            Located in Chilakaluripet, our store is ready to serve you. Check our location or call us directly.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a href={storeInfo.googleMaps} target="_blank" rel="noopener noreferrer">
              <Button id="about-directions" variant="primary" size="md" leftIcon={<MapPin size={16} />}>
                Get Directions
              </Button>
            </a>
            <a href={`tel:${storeInfo.phone}`}>
              <Button id="about-call" variant="outline" size="md" leftIcon={<Phone size={16} />}>
                Call Now
              </Button>
            </a>
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <Button id="about-whatsapp" variant="secondary" size="md" leftIcon={<MessageCircle size={16} />}>
                WhatsApp
              </Button>
            </a>
          </div>
        </Container>
      </section>
    </div>
  )
}
