import { useState } from 'react'
import { Lock, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { STORE_NAME, STORE_LOGO } from '@constants'
import Button from '@components/ui/Button'
import { toast } from 'react-hot-toast'
import { storageService } from '@services/storageService'

// ─────────────────────────────────────────────────────────────────────────────
// AdminAuth — Password Screen
// ─────────────────────────────────────────────────────────────────────────────

export default function AdminAuth({ onSuccess }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (storageService.verifyAdminPassword(password)) {
      sessionStorage.setItem('kf_admin_authed', 'true')
      onSuccess()
      toast.success('Access granted! Welcome to your dashboard.')
    } else {
      setError(true)
      toast.error('Incorrect password. Please try again.')
    }
  }

  return (
    <div
      className="flex items-center justify-center min-h-[85vh] px-4"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-md p-8 rounded-3xl border shadow-xl flex flex-col items-center"
        style={{
          backgroundColor: 'var(--color-card)',
          borderColor:     'var(--color-border)',
        }}
      >
        {/* Logo and Brand */}
        <img
          src={STORE_LOGO}
          alt="Krishna Fancies logo"
          className="h-16 w-16 object-contain mb-4"
          draggable={false}
        />
        <h1 className="font-heading text-2xl font-bold mb-1" style={{ color: 'var(--color-text)' }}>
          {STORE_NAME}
        </h1>
        <p className="font-body text-xs mb-8" style={{ color: 'var(--color-text-muted)' }}>
          Store Owner Administration Portal
        </p>

        {/* Password Form */}
        <form onSubmit={handleSubmit} className="w-full space-y-5">
          <div className="space-y-2">
            <label
              htmlFor="admin-password"
              className="font-heading text-xs font-bold uppercase tracking-wider"
              style={{ color: 'var(--color-text-muted)' }}
            >
              Enter Password
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-neutral-400">
                <Lock size={16} />
              </span>
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  if (error) setError(false)
                }}
                placeholder="••••••••"
                className="w-full pl-9 pr-4 py-3 rounded-xl border text-sm focus:outline-none transition-all duration-200"
                style={{
                  backgroundColor: 'var(--color-bg)',
                  borderColor:     error ? 'red' : 'var(--color-border)',
                  color:           'var(--color-text)',
                }}
                required
              />
            </div>
            {error && (
              <span className="text-red-500 text-xs font-semibold flex items-center gap-1 mt-1">
                <AlertCircle size={12} /> Invalid credentials. Please try again.
              </span>
            )}
          </div>

          <Button
            id="admin-auth-submit"
            type="submit"
            variant="primary"
            fullWidth
            size="md"
          >
            Access Dashboard
          </Button>
        </form>
      </motion.div>
    </div>
  )
}
