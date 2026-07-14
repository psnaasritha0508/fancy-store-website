import { useEffect, useState } from 'react'
import { Lock, Eye, EyeOff, Save } from 'lucide-react'
import { toast } from 'react-hot-toast'
import Button from '@components/ui/Button'
import { storageService } from '@services/storageService'

export default function SecuritySettingsManager() {
  const [form, setForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [showCurrent, setShowCurrent] = useState(false)
  const [showNew, setShowNew] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [storedPassword, setStoredPassword] = useState('')

  useEffect(() => {
    setStoredPassword(storageService.getAdminPassword())
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      storageService.updateAdminPassword(form)
      toast.success('Admin password updated successfully.')
      setForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
      setStoredPassword(storageService.getAdminPassword())
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between gap-4 border-b pb-4" style={{ borderColor: 'var(--color-border)' }}>
        <div>
          <h2 className="font-heading text-lg font-bold" style={{ color: 'var(--color-text)' }}>
            Security Settings
          </h2>
          <p className="font-body text-xs" style={{ color: 'var(--color-text-muted)' }}>
            Update the dashboard access password without editing source code.
          </p>
        </div>
        <Button type="submit" variant="primary" size="sm" leftIcon={<Save size={14} />}>
          Save Password
        </Button>
      </div>

      <div className="rounded-3xl border p-6 space-y-5" style={{ backgroundColor: 'var(--color-card)', borderColor: 'var(--color-border)' }}>
        <div className="rounded-2xl border p-4" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-alt)' }}>
          <p className="font-body text-xs uppercase tracking-wide" style={{ color: 'var(--color-text-muted)' }}>Current Password</p>
          <p className="font-mono text-sm mt-1" style={{ color: 'var(--color-text)' }}>
            {storedPassword.replace(/./g, '•')}
          </p>
        </div>

        <div className="space-y-1">
          <label className="font-body text-xs font-bold text-neutral-400 uppercase">Current Password</label>
          <div className="relative">
            <input
              type={showCurrent ? 'text' : 'password'}
              value={form.currentPassword}
              onChange={(e) => setForm({ ...form, currentPassword: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none pr-10"
              style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
              required
            />
            <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400" onClick={() => setShowCurrent(!showCurrent)}>
              {showCurrent ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div className="space-y-1">
          <label className="font-body text-xs font-bold text-neutral-400 uppercase">New Password</label>
          <div className="relative">
            <input
              type={showNew ? 'text' : 'password'}
              value={form.newPassword}
              onChange={(e) => setForm({ ...form, newPassword: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none pr-10"
              style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
              required
            />
            <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400" onClick={() => setShowNew(!showNew)}>
              {showNew ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div className="space-y-1">
          <label className="font-body text-xs font-bold text-neutral-400 uppercase">Confirm New Password</label>
          <div className="relative">
            <input
              type={showConfirm ? 'text' : 'password'}
              value={form.confirmPassword}
              onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border text-sm focus:outline-none pr-10"
              style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
              required
            />
            <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400" onClick={() => setShowConfirm(!showConfirm)}>
              {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>

        <div className="rounded-2xl border p-3" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg-alt)' }}>
          <p className="font-body text-xs" style={{ color: 'var(--color-text-muted)' }}>
            <Lock size={14} className="inline mr-1" /> Passwords are stored securely in browser storage and applied immediately for the admin dashboard.
          </p>
        </div>
      </div>
    </form>
  )
}
