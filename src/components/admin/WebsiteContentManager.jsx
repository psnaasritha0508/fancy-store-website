import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Save, Upload, Eye, EyeOff, Info } from 'lucide-react'
import { toast } from 'react-hot-toast'
import Button from '@components/ui/Button'
import { storageService } from '@services/storageService'

// ─────────────────────────────────────────────────────────────────────────────
// WebsiteContentManager Tab Component
// Edit Hero, Seasonal Banner, Store Info, and section visibilities.
// ─────────────────────────────────────────────────────────────────────────────

const BANNER_STYLES = ['Festival', 'Offers', 'New Arrivals', 'Announcement']

export default function WebsiteContentManager() {
  const [settings, setSettings] = useState(null)
  
  // File refs
  const heroFileRef = useRef(null)
  const bannerFileRef = useRef(null)

  // Local Form States
  const [storeInfo, setStoreInfo] = useState({
    name:            '',
    tagline:         '',
    phone:           '',
    whatsapp:        '',
    email:           '',
    address:         { street: '', city: '', state: '', zip: '', country: '', full: '' },
    instagram:       '',
    instagramHandle: '',
    googleMaps:      '',
    hours:           { weekdays: '', sunday: '' }
  })

  const [hero, setHero] = useState({
    title:        '',
    subtitle:     '',
    primaryCta:   '',
    secondaryCta: '',
    bgImage:      ''
  })

  const [seasonalBanner, setSeasonalBanner] = useState({
    active:   true,
    style:    'Festival',
    badge:    '',
    headline: '',
    subtext:  '',
    cta:      '',
    image:    ''
  })

  const [homepageVisibility, setHomepageVisibility] = useState({
    featuredProducts: true,
    categories:       true,
    whyChooseUs:      true,
    seasonalBanner:   true,
    visitStore:       true,
    finalCta:         true
  })

  useEffect(() => {
    const loaded = storageService.getSettings()
    if (loaded && loaded.storeInfo) {
      setSettings(loaded)
      setStoreInfo(loaded.storeInfo)
      setHero(loaded.hero)
      setSeasonalBanner(loaded.seasonalBanner)
      setHomepageVisibility(loaded.homepageVisibility)
    }
  }, [])

  // File Upload Handlers (Hero Background)
  const handleHeroBgChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (file.size > 1.5 * 1024 * 1024) {
      toast.error('Image size must be smaller than 1.5MB.')
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      setHero(prev => ({ ...prev, bgImage: reader.result }))
      toast.success('Hero background loaded. Save changes to apply.')
    }
    reader.readAsDataURL(file)
  }

  // File Upload Handlers (Banner Background)
  const handleBannerBgChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    if (file.size > 1.5 * 1024 * 1024) {
      toast.error('Image size must be smaller than 1.5MB.')
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      setSeasonalBanner(prev => ({ ...prev, image: reader.result }))
      toast.success('Banner background image loaded. Save changes to apply.')
    }
    reader.readAsDataURL(file)
  }

  // Save Settings Submit Handler
  const handleSaveAll = (e) => {
    e.preventDefault()

    const newSettings = {
      storeInfo,
      hero,
      seasonalBanner: {
        ...seasonalBanner,
        // Auto-assign style name to badge
        badge: `${seasonalBanner.style} Special`
      },
      homepageVisibility
    }

    storageService.saveSettings(newSettings)
    setSettings(newSettings)
    toast.success('Website configuration saved successfully! Frontpage is updated.')
  }

  if (!settings) return null

  return (
    <form onSubmit={handleSaveAll} className="space-y-8 pb-10">
      {/* Page Header */}
      <div className="flex items-center justify-between gap-4 flex-wrap border-b pb-5" style={{ borderColor: 'var(--color-border)' }}>
        <div>
          <h2 className="font-heading text-xl font-bold" style={{ color: 'var(--color-text)' }}>
            Website Content & Settings
          </h2>
          <p className="font-body text-xs" style={{ color: 'var(--color-text-muted)' }}>
            Customize headings, store contacts, banner campaigns, and section visibilities dynamically.
          </p>
        </div>
        <Button
          id="admin-save-settings"
          type="submit"
          variant="primary"
          size="md"
          leftIcon={<Save size={16} />}
        >
          Save All Changes
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Side Column: Sections Editor */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* 1. HERO SECTION CONFIG */}
          <div
            className="p-6 rounded-3xl border space-y-4"
            style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}
          >
            <h3 className="font-heading text-lg font-bold border-b pb-2 flex items-center gap-2" style={{ color: 'var(--color-text)', borderColor: 'var(--color-border)' }}>
              <span>🌅</span> Hero Section Content
            </h3>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="font-body text-xs font-bold text-neutral-400 uppercase">Hero Headline</label>
                <input
                  type="text"
                  value={hero.title}
                  onChange={(e) => setHero({ ...hero, title: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none"
                  style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-body text-xs font-bold text-neutral-400 uppercase">Hero Subheading</label>
                <textarea
                  value={hero.subtitle}
                  onChange={(e) => setHero({ ...hero, subtitle: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none resize-none"
                  style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-body text-xs font-bold text-neutral-400 uppercase">Primary Button Text</label>
                  <input
                    type="text"
                    value={hero.primaryCta}
                    onChange={(e) => setHero({ ...hero, primaryCta: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none"
                    style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-body text-xs font-bold text-neutral-400 uppercase">Secondary Button Text</label>
                  <input
                    type="text"
                    value={hero.secondaryCta}
                    onChange={(e) => setHero({ ...hero, secondaryCta: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none"
                    style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                    required
                  />
                </div>
              </div>

              {/* Hero Image Management */}
              <div className="space-y-2 pt-2">
                <label className="font-body text-xs font-bold text-neutral-400 uppercase">Hero Background Image</label>
                <div className="flex gap-4 items-center p-3 border rounded-xl" style={{ borderColor: 'var(--color-border)' }}>
                  <div className="w-16 h-12 rounded-lg overflow-hidden shrink-0 border relative">
                    <img src={hero.bgImage || '/hero-bg.png'} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      ref={heroFileRef}
                      onChange={handleHeroBgChange}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="xs"
                      onClick={() => heroFileRef.current?.click()}
                    >
                      Upload New BG Image
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. SEASONAL BANNER CONFIG */}
          <div
            className="p-6 rounded-3xl border space-y-4"
            style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}
          >
            <div className="flex items-center justify-between border-b pb-2" style={{ borderColor: 'var(--color-border)' }}>
              <h3 className="font-heading text-lg font-bold flex items-center gap-2" style={{ color: 'var(--color-text)' }}>
                <span>🎊</span> Seasonal Banner Settings
              </h3>
              {/* Active Toggle Switch */}
              <label className="flex items-center gap-2 cursor-pointer">
                <span className="font-body text-xs font-bold uppercase text-neutral-400">Banner Enabled</span>
                <input
                  type="checkbox"
                  checked={seasonalBanner.active}
                  onChange={(e) => setSeasonalBanner({ ...seasonalBanner, active: e.target.checked })}
                  className="w-4 h-4 rounded cursor-pointer text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                />
              </label>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-body text-xs font-bold text-neutral-400 uppercase">Banner Style / Campaign</label>
                  <select
                    value={seasonalBanner.style}
                    onChange={(e) => setSeasonalBanner({ ...seasonalBanner, style: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none cursor-pointer"
                    style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                  >
                    {BANNER_STYLES.map(style => (
                      <option key={style} value={style}>{style}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="font-body text-xs font-bold text-neutral-400 uppercase">CTA Button Text</label>
                  <input
                    type="text"
                    value={seasonalBanner.cta}
                    onChange={(e) => setSeasonalBanner({ ...seasonalBanner, cta: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none"
                    style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-body text-xs font-bold text-neutral-400 uppercase">Banner Title</label>
                <input
                  type="text"
                  value={seasonalBanner.headline}
                  onChange={(e) => setSeasonalBanner({ ...seasonalBanner, headline: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none"
                  style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-body text-xs font-bold text-neutral-400 uppercase">Banner Subtext</label>
                <textarea
                  value={seasonalBanner.subtext}
                  onChange={(e) => setSeasonalBanner({ ...seasonalBanner, subtext: e.target.value })}
                  rows={2}
                  className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none resize-none"
                  style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                  required
                />
              </div>

              {/* Banner background image upload */}
              <div className="space-y-2 pt-2">
                <label className="font-body text-xs font-bold text-neutral-400 uppercase">Banner Campaign Background Image</label>
                <div className="flex gap-4 items-center p-3 border rounded-xl" style={{ borderColor: 'var(--color-border)' }}>
                  <div className="w-16 h-12 rounded-lg overflow-hidden shrink-0 border relative">
                    <img src={seasonalBanner.image || '/banner-bg.png'} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <input
                      type="file"
                      accept="image/*"
                      ref={bannerFileRef}
                      onChange={handleBannerBgChange}
                      className="hidden"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="xs"
                      onClick={() => bannerFileRef.current?.click()}
                    >
                      Upload New Banner Image
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 3. STORE INFORMATION CONFIG */}
          <div
            className="p-6 rounded-3xl border space-y-4"
            style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}
          >
            <h3 className="font-heading text-lg font-bold border-b pb-2 flex items-center gap-2" style={{ color: 'var(--color-text)', borderColor: 'var(--color-border)' }}>
              <span>📞</span> Store Contact & Information
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-body text-xs font-bold text-neutral-400 uppercase">Store Name</label>
                <input
                  type="text"
                  value={storeInfo.name}
                  onChange={(e) => setStoreInfo({ ...storeInfo, name: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none"
                  style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="font-body text-xs font-bold text-neutral-400 uppercase">Tagline / Motto</label>
                <input
                  type="text"
                  value={storeInfo.tagline}
                  onChange={(e) => setStoreInfo({ ...storeInfo, tagline: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none"
                  style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="font-body text-xs font-bold text-neutral-400 uppercase">Phone Number</label>
                <input
                  type="text"
                  value={storeInfo.phone}
                  onChange={(e) => setStoreInfo({ ...storeInfo, phone: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none"
                  style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="font-body text-xs font-bold text-neutral-400 uppercase">WhatsApp Number (No +, spaces)</label>
                <input
                  type="text"
                  value={storeInfo.whatsapp}
                  onChange={(e) => setStoreInfo({ ...storeInfo, whatsapp: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none"
                  style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="font-body text-xs font-bold text-neutral-400 uppercase">Email Address</label>
                <input
                  type="email"
                  value={storeInfo.email}
                  onChange={(e) => setStoreInfo({ ...storeInfo, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none"
                  style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="font-body text-xs font-bold text-neutral-400 uppercase">Instagram URL</label>
                <input
                  type="url"
                  value={storeInfo.instagram}
                  onChange={(e) => setStoreInfo({ ...storeInfo, instagram: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none"
                  style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="font-body text-xs font-bold text-neutral-400 uppercase">Google Maps Share Link</label>
              <input
                type="url"
                value={storeInfo.googleMaps}
                onChange={(e) => setStoreInfo({ ...storeInfo, googleMaps: e.target.value })}
                className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none"
                style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
              />
            </div>

            {/* Address fields */}
            <div className="space-y-3 pt-2">
              <h4 className="font-heading text-xs font-bold text-neutral-400 uppercase">Store Location Address</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-body text-[10px] text-neutral-400 uppercase font-semibold">Street Address</label>
                  <input
                    type="text"
                    value={storeInfo.address.street}
                    onChange={(e) => setStoreInfo({ ...storeInfo, address: { ...storeInfo.address, street: e.target.value } })}
                    className="w-full px-4 py-2 rounded-xl border text-sm focus:outline-none"
                    style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-body text-[10px] text-neutral-400 uppercase font-semibold">City</label>
                  <input
                    type="text"
                    value={storeInfo.address.city}
                    onChange={(e) => setStoreInfo({ ...storeInfo, address: { ...storeInfo.address, city: e.target.value } })}
                    className="w-full px-4 py-2 rounded-xl border text-sm focus:outline-none"
                    style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="font-body text-[10px] text-neutral-400 uppercase font-semibold">Full Address Text (Single Line)</label>
                <input
                  type="text"
                  value={storeInfo.address.full}
                  onChange={(e) => setStoreInfo({ ...storeInfo, address: { ...storeInfo.address, full: e.target.value } })}
                  className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none"
                  style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                  required
                />
              </div>
            </div>

            {/* Business Hours */}
            <div className="space-y-3 pt-2">
              <h4 className="font-heading text-xs font-bold text-neutral-400 uppercase">Business Timings</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-body text-[10px] text-neutral-400 uppercase font-semibold">Weekdays (e.g. Mon – Sat)</label>
                  <input
                    type="text"
                    value={storeInfo.hours.weekdays}
                    onChange={(e) => setStoreInfo({ ...storeInfo, hours: { ...storeInfo.hours, weekdays: e.target.value } })}
                    className="w-full px-4 py-2 rounded-xl border text-sm focus:outline-none"
                    style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-body text-[10px] text-neutral-400 uppercase font-semibold">Sunday</label>
                  <input
                    type="text"
                    value={storeInfo.hours.sunday}
                    onChange={(e) => setStoreInfo({ ...storeInfo, hours: { ...storeInfo.hours, sunday: e.target.value } })}
                    className="w-full px-4 py-2 rounded-xl border text-sm focus:outline-none"
                    style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                    required
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side Column: Visibility Sidebar Controls */}
        <div className="lg:col-span-4 space-y-6">
          <div
            className="p-6 rounded-3xl border space-y-4 sticky top-6"
            style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}
          >
            <h3 className="font-heading text-lg font-bold border-b pb-2 flex items-center gap-2" style={{ color: 'var(--color-text)', borderColor: 'var(--color-border)' }}>
              <span>👁️</span> Section Visibility
            </h3>
            
            <p className="font-body text-[11px] leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
              Show or hide specific homepage sections directly. Hidden components will be safely removed from layout rendering.
            </p>

            <div className="space-y-3 pt-2">
              {[
                { key: 'featuredProducts', label: 'Featured Products Section' },
                { key: 'categories',       label: 'Categories Section' },
                { key: 'whyChooseUs',      label: 'Why Choose Us Banner' },
                { key: 'seasonalBanner',   label: 'Seasonal Campaign Banner' },
                { key: 'visitStore',       label: 'Visit Our Store Section' },
                { key: 'finalCta',         label: 'Final WhatsApp CTA Card' },
              ].map(sec => (
                <label
                  key={sec.key}
                  className="flex items-center justify-between p-3 border rounded-xl cursor-pointer hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors font-body text-xs font-semibold"
                  style={{ borderColor: 'var(--color-border)' }}
                >
                  <span style={{ color: 'var(--color-text)' }}>{sec.label}</span>
                  <div className="flex items-center gap-1.5 text-neutral-400">
                    {homepageVisibility[sec.key] ? (
                      <span className="text-emerald-600 flex items-center gap-1">
                        <Eye size={14} /> Visible
                      </span>
                    ) : (
                      <span className="text-neutral-400 flex items-center gap-1">
                        <EyeOff size={14} /> Hidden
                      </span>
                    )}
                    <input
                      type="checkbox"
                      checked={homepageVisibility[sec.key]}
                      onChange={(e) => setHomepageVisibility({ ...homepageVisibility, [sec.key]: e.target.checked })}
                      className="ml-2 w-4 h-4 rounded cursor-pointer text-[var(--color-primary)] focus:ring-[var(--color-primary)]"
                    />
                  </div>
                </label>
              ))}
            </div>
            
            <div className="pt-2">
              <Button
                id="visibility-save-button"
                type="submit"
                variant="primary"
                size="md"
                fullWidth
                leftIcon={<Save size={16} />}
              >
                Save All Changes
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}
