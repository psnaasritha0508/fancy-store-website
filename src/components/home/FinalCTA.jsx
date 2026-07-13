import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { MessageCircle, Mail } from 'lucide-react'
import Container from '@components/ui/Container'
import Button from '@components/ui/Button'
import { STORE_NAME, STORE_WHATSAPP } from '@constants'

// ─────────────────────────────────────────────────────────────────────────────
// FinalCTA Section
// Bottom page call-to-action encouraging direct store inquiries
// ─────────────────────────────────────────────────────────────────────────────

export default function FinalCTA() {
  const whatsappUrl = `https://wa.me/${STORE_WHATSAPP}?text=${encodeURIComponent(`Hi ${STORE_NAME}! I would like to order some items. Please share details.`)}`

  return (
    <section
      className="section-padding relative overflow-hidden"
      style={{ backgroundColor: 'var(--color-bg-alt)' }}
      aria-label="Contact actions"
    >
      {/* Background soft ambient accents */}
      <div
        className="absolute -top-24 -left-24 w-72 h-72 rounded-full opacity-5 pointer-events-none"
        style={{ backgroundColor: 'var(--color-primary)' }}
      />
      <div
        className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full opacity-5 pointer-events-none"
        style={{ backgroundColor: 'var(--color-secondary)' }}
      />

      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <motion.h2
            className="font-heading text-3xl sm:text-4xl font-bold"
            style={{ color: 'var(--color-text)' }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
          >
            Looking for Something Special?
          </motion.h2>

          <motion.p
            className="font-body text-base max-w-xl mx-auto leading-relaxed"
            style={{ color: 'var(--color-text-muted)' }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.1 }}
          >
            Can&apos;t find what you are looking for online? Let us know, or contact us directly. We offer customized shopping assistance and can arrange items specifically for you.
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center justify-center gap-4 pt-4"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: 0.2 }}
          >
            <Link to="/contact">
              <Button
                id="final-cta-contact"
                variant="primary"
                size="lg"
                leftIcon={<Mail size={18} />}
              >
                Contact Us
              </Button>
            </Link>

            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              <Button
                id="final-cta-whatsapp"
                variant="secondary"
                size="lg"
                leftIcon={<MessageCircle size={18} />}
              >
                Order on WhatsApp
              </Button>
            </a>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
