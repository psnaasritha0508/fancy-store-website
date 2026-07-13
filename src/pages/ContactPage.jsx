import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Phone, MessageCircle, MapPin, Clock, Send, Navigation } from 'lucide-react'
import { toast } from 'react-hot-toast'
import Container from '@components/ui/Container'
import Button from '@components/ui/Button'
import { storageService } from '@services/storageService'

// ─────────────────────────────────────────────────────────────────────────────
// Custom Instagram Icon SVG
// ─────────────────────────────────────────────────────────────────────────────
function InstagramIcon({ size = 20, className }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Contact Page Component
// Renders Hero, Contacts Cards, Google Maps Link, and WhatsApp Contact Form.
// Pulls values dynamically from storageService settings.
// ─────────────────────────────────────────────────────────────────────────────

export default function ContactPage() {
  const [storeInfo, setStoreInfo] = useState(null)
  
  // Form states
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [message, setMessage] = useState('')

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

  useEffect(() => {
    if (storeInfo) {
      document.title = `Contact Us — ${storeInfo.name}`
    }
  }, [storeInfo])

  if (!storeInfo) return null

  const whatsappDirectUrl = `https://wa.me/${storeInfo.whatsapp}`

  // Handle Form Submit (Pre-fill message and redirect to WhatsApp)
  const handleSubmit = (e) => {
    e.preventDefault()

    if (!name.trim() || !phone.trim() || !message.trim()) {
      toast.error('Please fill in all form fields.')
      return
    }

    // Build pre-filled WhatsApp text
    const textMessage = `Hi ${storeInfo.name}! My name is *${name.trim()}* (Phone: ${phone.trim()}).\n\n*Inquiry Message:*\n${message.trim()}`
    const finalWhatsAppUrl = `https://wa.me/${storeInfo.whatsapp}?text=${encodeURIComponent(textMessage)}`

    toast.success('Form validated! Redirecting you to WhatsApp...')
    
    // Redirect after brief delay for UX toast feedback
    setTimeout(() => {
      window.open(finalWhatsAppUrl, '_blank')
    }, 800)
  }

  return (
    <div className="min-h-screen pb-16" style={{ backgroundColor: 'var(--color-bg)' }}>
      {/* ── 1. Hero Section ─────────────────────────────────────────── */}
      <section
        className="py-12 border-b"
        style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}
      >
        <Container>
          <h1
            className="font-heading text-3xl sm:text-4xl font-bold mb-2"
            style={{ color: 'var(--color-text)' }}
          >
            Contact Us
          </h1>
          <p className="font-body text-sm sm:text-base" style={{ color: 'var(--color-text-muted)' }}>
            We&apos;re here to help. Reach out to us via any channel below or visit our store.
          </p>
        </Container>
      </section>

      <Container className="pt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ── 2. Left side: Contact Cards & Map Graphic ──────────────── */}
          <div className="lg:col-span-5 space-y-6">
            <h2 className="font-heading text-lg font-bold" style={{ color: 'var(--color-text)' }}>
              Get In Touch
            </h2>

            {/* Cards wrapper */}
            <div className="space-y-4">
              {/* Phone card */}
              <div className="flex gap-4 p-4 rounded-2xl border" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-card)' }}>
                <Phone className="shrink-0 mt-1" style={{ color: 'var(--color-primary)' }} />
                <div>
                  <h3 className="font-heading font-semibold text-sm mb-0.5" style={{ color: 'var(--color-text)' }}>Phone Number</h3>
                  <a href={`tel:${storeInfo.phone}`} className="font-body text-sm hover:underline" style={{ color: 'var(--color-text-muted)' }}>
                    {storeInfo.phone}
                  </a>
                </div>
              </div>

              {/* WhatsApp card */}
              <div className="flex gap-4 p-4 rounded-2xl border" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-card)' }}>
                <MessageCircle className="shrink-0 mt-1" style={{ color: 'var(--color-secondary)' }} />
                <div>
                  <h3 className="font-heading font-semibold text-sm mb-0.5" style={{ color: 'var(--color-text)' }}>WhatsApp Business</h3>
                  <a href={whatsappDirectUrl} target="_blank" rel="noopener noreferrer" className="font-body text-sm hover:underline" style={{ color: 'var(--color-text-muted)' }}>
                    +{storeInfo.whatsapp}
                  </a>
                </div>
              </div>

              {/* Instagram card */}
              <div className="flex gap-4 p-4 rounded-2xl border" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-card)' }}>
                <InstagramIcon className="shrink-0 mt-1" style={{ color: 'var(--color-primary)' }} />
                <div>
                  <h3 className="font-heading font-semibold text-sm mb-0.5" style={{ color: 'var(--color-text)' }}>Instagram</h3>
                  <a href={storeInfo.instagram} target="_blank" rel="noopener noreferrer" className="font-body text-sm hover:underline" style={{ color: 'var(--color-text-muted)' }}>
                    {storeInfo.instagramHandle || '@krishnafancies'}
                  </a>
                </div>
              </div>

              {/* Address card */}
              <div className="flex gap-4 p-4 rounded-2xl border" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-card)' }}>
                <MapPin className="shrink-0 mt-1" style={{ color: 'var(--color-primary)' }} />
                <div>
                  <h3 className="font-heading font-semibold text-sm mb-0.5" style={{ color: 'var(--color-text)' }}>Store Address</h3>
                  <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                    {storeInfo.address.full}
                  </p>
                </div>
              </div>

              {/* Business hours card */}
              <div className="flex gap-4 p-4 rounded-2xl border" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-card)' }}>
                <Clock className="shrink-0 mt-1" style={{ color: 'var(--color-secondary)' }} />
                <div>
                  <h3 className="font-heading font-semibold text-sm mb-0.5" style={{ color: 'var(--color-text)' }}>Business Hours</h3>
                  <p className="font-body text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                    {storeInfo.hours.weekdays} <br />
                    {storeInfo.hours.sunday}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Actions buttons */}
            <div className="flex flex-wrap gap-2 pt-2">
              <a href={`tel:${storeInfo.phone}`}>
                <Button id="contact-call" variant="outline" size="sm" leftIcon={<Phone size={14} />}>Call Now</Button>
              </a>
              <a href={whatsappDirectUrl} target="_blank" rel="noopener noreferrer">
                <Button id="contact-whatsapp" variant="secondary" size="sm" leftIcon={<MessageCircle size={14} />}>WhatsApp</Button>
              </a>
              <a href={storeInfo.instagram} target="_blank" rel="noopener noreferrer">
                <Button id="contact-instagram" variant="outline" size="sm" leftIcon={<InstagramIcon size={14} />}>Instagram</Button>
              </a>
              <a href={storeInfo.googleMaps} target="_blank" rel="noopener noreferrer">
                <Button id="contact-directions" variant="primary" size="sm" leftIcon={<Navigation size={14} />}>Directions</Button>
              </a>
            </div>
          </div>

          {/* ── 3. Right side: Interactive Form & Maps Area ─────────────── */}
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-heading text-lg font-bold" style={{ color: 'var(--color-text)' }}>
              Send Inquiry
            </h2>

            {/* Form card */}
            <form
              onSubmit={handleSubmit}
              className="p-6 rounded-3xl border space-y-4"
              style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)', boxShadow: 'var(--shadow-sm)' }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-body text-xs font-bold text-neutral-400 uppercase">Your Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Ramesh"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none"
                    style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-body text-xs font-bold text-neutral-400 uppercase">Your Phone</label>
                  <input
                    type="tel"
                    placeholder="e.g. 9876543210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none"
                    style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-body text-xs font-bold text-neutral-400 uppercase">Message Inquiry</label>
                <textarea
                  placeholder="Tell us what you are looking for (e.g. Kundan bangles sizes, cosmetic brands, wedding gifts...)"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none resize-none"
                  style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                  required
                />
              </div>

              <Button
                id="contact-form-submit"
                type="submit"
                variant="primary"
                size="md"
                fullWidth
                leftIcon={<Send size={15} />}
              >
                Send via WhatsApp
              </Button>
            </form>

            {/* Google Map Card */}
            <div
              className="p-4 rounded-3xl border space-y-4"
              style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}
            >
              <h3 className="font-heading text-sm font-bold flex items-center gap-2" style={{ color: 'var(--color-text)' }}>
                🗺️ Google Maps Location
              </h3>
              
              <div
                className="w-full h-56 rounded-2xl overflow-hidden border relative flex flex-col items-center justify-center text-center p-6 bg-neutral-50 dark:bg-neutral-900"
                style={{ borderColor: 'var(--color-border)' }}
              >
                <div className="w-12 h-12 rounded-full flex items-center justify-center text-2xl mb-3 bg-amber-100 dark:bg-amber-900/30">
                  📍
                </div>
                <h4 className="font-heading text-sm font-bold mb-1" style={{ color: 'var(--color-text)' }}>
                  {storeInfo.name} Directions
                </h4>
                <p className="font-body text-xs text-neutral-400 max-w-sm mb-4">
                  Directions link configured at {storeInfo.address.street}, {storeInfo.address.city}. Click to open in Google Maps app.
                </p>
                <a href={storeInfo.googleMaps} target="_blank" rel="noopener noreferrer">
                  <Button id="contact-maps-btn" variant="outline" size="xs" leftIcon={<Navigation size={12} />}>
                    Open in Google Maps
                  </Button>
                </a>
              </div>
            </div>

          </div>

        </div>
      </Container>
    </div>
  )
}
