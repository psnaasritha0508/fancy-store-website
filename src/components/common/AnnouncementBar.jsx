import { useEffect, useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import { storageService } from '@services/storageService'

export default function AnnouncementBar() {
  const [announcement, setAnnouncement] = useState({
    enabled: true,
    text: '🚚 Free Delivery on Orders Above ₹1000',
    minAmount: 1000,
    icon: '🚚'
  })

  useEffect(() => {
    const loadAnnouncement = () => {
      const settings = storageService.getSettings()
      setAnnouncement(settings.announcement || {
        enabled: true,
        text: '🚚 Free Delivery on Orders Above ₹1000',
        minAmount: 1000,
        icon: '🚚'
      })
    }

    loadAnnouncement()
    window.addEventListener('focus', loadAnnouncement)
    window.addEventListener('storage', loadAnnouncement)
    return () => {
      window.removeEventListener('focus', loadAnnouncement)
      window.removeEventListener('storage', loadAnnouncement)
    }
  }, [])

  const displayText = useMemo(() => {
    const text = announcement.text || '🚚 Free Delivery on Orders Above ₹1000'
    return `${announcement.icon || '📢'} ${text} • Minimum Order ₹${announcement.minAmount || 1000}`
  }, [announcement])

  if (!announcement.enabled) return null

  return (
    <motion.div
      initial={{ y: -48, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed left-0 right-0 top-0 z-[60] border-b backdrop-blur-md"
      style={{
        background: 'linear-gradient(90deg, rgba(123,75,106,0.96), rgba(201,162,39,0.92))',
        borderColor: 'rgba(255,255,255,0.14)',
        color: '#fff',
        height: 'var(--announcement-height, 2.5rem)'
      }}
      aria-label="Announcement bar"
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-center overflow-hidden px-4 text-sm font-semibold tracking-wide sm:text-base">
        <div className="marquee whitespace-nowrap" style={{ animation: displayText.length > 60 ? 'marquee 12s linear infinite' : 'none' }}>
          <span>{displayText}</span>
          {displayText.length > 60 && <span className="ml-8">{displayText}</span>}
        </div>
      </div>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .marquee { display: inline-flex; align-items: center; }
      `}</style>
    </motion.div>
  )
}
