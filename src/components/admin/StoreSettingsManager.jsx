import { useState, useEffect } from 'react'
import { Save } from 'lucide-react'
import { toast } from 'react-hot-toast'
import Button from '@components/ui/Button'
import { storageService } from '@services/storageService'

// ─────────────────────────────────────────────────────────────────────────────
// StoreSettingsManager Tab Component
// Manage store address, hours, maps links, socials, phone and email.
// ─────────────────────────────────────────────────────────────────────────────

export default function StoreSettingsManager() {
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

  useEffect(() => {
    const loaded = storageService.getSettings()
    if (loaded && loaded.storeInfo) {
      setStoreInfo(loaded.storeInfo)
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const settings = storageService.getSettings()
    const updated = {
      ...settings,
      storeInfo
    }
    storageService.saveSettings(updated)
    toast.success('Store Information updated successfully!')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between gap-4 border-b pb-4" style={{ borderColor: 'var(--color-border)' }}>
        <div>
          <h2 className="font-heading text-lg font-bold" style={{ color: 'var(--color-text)' }}>
            Store Information & Timings
          </h2>
          <p className="font-body text-xs" style={{ color: 'var(--color-text-muted)' }}>
            Update contacts, physical address, and hours shown across the site.
          </p>
        </div>
        <Button
          id="settings-save-button"
          type="submit"
          variant="primary"
          size="sm"
          leftIcon={<Save size={14} />}
        >
          Save Details
        </Button>
      </div>

      <div
        className="p-6 rounded-3xl border space-y-6"
        style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}
      >
        {/* Core details */}
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
            <label className="font-body text-xs font-bold text-neutral-400 uppercase">Tagline / Tag Phrase</label>
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
            <label className="font-body text-xs font-bold text-neutral-400 uppercase">Store Email</label>
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

        {/* Address card */}
        <div className="space-y-3 pt-2">
          <h4 className="font-heading text-xs font-bold text-neutral-400 uppercase border-b pb-1" style={{ borderColor: 'var(--color-border)' }}>
            Store Location Address
          </h4>
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

        {/* Timings */}
        <div className="space-y-3 pt-2">
          <h4 className="font-heading text-xs font-bold text-neutral-400 uppercase border-b pb-1" style={{ borderColor: 'var(--color-border)' }}>
            Timings / Hours
          </h4>
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
    </form>
  )
}
