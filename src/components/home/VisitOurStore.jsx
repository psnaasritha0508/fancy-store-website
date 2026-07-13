import { motion } from 'framer-motion'
import { Phone, MapPin, MessageCircle, Navigation, Clock } from 'lucide-react'
import Container from '@components/ui/Container'
import Button from '@components/ui/Button'
import {
  STORE_NAME,
  STORE_PHONE,
  STORE_ADDRESS,
  STORE_GOOGLE_MAPS,
  STORE_HOURS,
  STORE_WHATSAPP
} from '@constants'

// ─────────────────────────────────────────────────────────────────────────────
// VisitOurStore Section
// Displays full store contact details, map button, and direct action triggers
// ─────────────────────────────────────────────────────────────────────────────

export default function VisitOurStore() {
  const whatsappUrl = `https://wa.me/${STORE_WHATSAPP}?text=${encodeURIComponent(`Hi ${STORE_NAME}, I'd like to ask a question.`)}`

  return (
    <section
      className="section-padding"
      style={{ backgroundColor: 'var(--color-bg)' }}
      aria-label="Visit our store"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Contact Info card */}
          <motion.div
            className="lg:col-span-6 space-y-6"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <div>
              <span
                className="font-body text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3 inline-block"
                style={{ backgroundColor: 'var(--color-secondary)', color: '#2C2C2C' }}
              >
                Find Us
              </span>
              <h2
                className="font-heading text-3xl sm:text-4xl font-bold mb-3"
                style={{ color: 'var(--color-text)' }}
              >
                Visit Our Store
              </h2>
              <p className="font-body text-base" style={{ color: 'var(--color-text-muted)' }}>
                Experience the beauty and quality of our products in person.
              </p>
              <div className="divider-gold w-20 mt-3" />
            </div>

            <div className="space-y-4">
              {/* Address card */}
              <div className="flex gap-4 p-4 rounded-xl border" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-card)' }}>
                <MapPin size={22} className="shrink-0 mt-1" style={{ color: 'var(--color-primary)' }} />
                <div>
                  <h3 className="font-heading font-semibold text-base mb-1" style={{ color: 'var(--color-text)' }}>Address</h3>
                  <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                    {STORE_ADDRESS.full}
                  </p>
                </div>
              </div>

              {/* Hours card */}
              <div className="flex gap-4 p-4 rounded-xl border" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-card)' }}>
                <Clock size={22} className="shrink-0 mt-1" style={{ color: 'var(--color-primary)' }} />
                <div>
                  <h3 className="font-heading font-semibold text-base mb-1" style={{ color: 'var(--color-text)' }}>Store Hours</h3>
                  <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                    {STORE_HOURS.weekdays} <br />
                    {STORE_HOURS.sunday}
                  </p>
                </div>
              </div>

              {/* Phone card */}
              <div className="flex gap-4 p-4 rounded-xl border" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-card)' }}>
                <Phone size={22} className="shrink-0 mt-1" style={{ color: 'var(--color-primary)' }} />
                <div>
                  <h3 className="font-heading font-semibold text-base mb-1" style={{ color: 'var(--color-text)' }}>Phone</h3>
                  <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                    {STORE_PHONE}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a href={STORE_GOOGLE_MAPS} target="_blank" rel="noopener noreferrer">
                <Button
                  id="visit-google-maps"
                  variant="primary"
                  size="md"
                  leftIcon={<Navigation size={18} />}
                >
                  Google Maps
                </Button>
              </a>

              <a href={`tel:${STORE_PHONE}`}>
                <Button
                  id="visit-call-now"
                  variant="outline"
                  size="md"
                  leftIcon={<Phone size={18} />}
                >
                  Call Now
                </Button>
              </a>

              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <Button
                  id="visit-whatsapp"
                  variant="secondary"
                  size="md"
                  leftIcon={<MessageCircle size={18} />}
                >
                  WhatsApp
                </Button>
              </a>
            </div>
          </motion.div>

          {/* Right: Embedded Interactive Map or Beautiful Placeholder Map Graphic */}
          <motion.div
            className="lg:col-span-6 h-[350px] sm:h-[400px] rounded-2xl overflow-hidden border relative"
            style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-card)' }}
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
          >
            {/* Soft backdrop */}
            <div className="absolute inset-0 bg-neutral-100 dark:bg-neutral-800 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl mb-4 bg-amber-100 dark:bg-amber-900/30">
                📍
              </div>
              <h3 className="font-heading text-lg font-bold mb-2" style={{ color: 'var(--color-text)' }}>
                {STORE_NAME} Location
              </h3>
              <p className="font-body text-sm max-w-sm mb-6" style={{ color: 'var(--color-text-muted)' }}>
                Located at {STORE_ADDRESS.street}, {STORE_ADDRESS.city}. Feel free to drop by or contact us if you need help finding directions.
              </p>
              <a href={STORE_GOOGLE_MAPS} target="_blank" rel="noopener noreferrer">
                <Button
                  id="map-get-directions"
                  variant="outline"
                  size="sm"
                  leftIcon={<Navigation size={15} />}
                >
                  Get Directions
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
