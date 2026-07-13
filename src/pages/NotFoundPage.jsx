import { Link } from 'react-router-dom'
import { ArrowLeft, SearchX } from 'lucide-react'
import Button from '@components/ui/Button'

// ─────────────────────────────────────────────────────────────────────────────
// 404 Not Found Page
// ─────────────────────────────────────────────────────────────────────────────

export default function NotFoundPage() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen text-center px-4"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <div className="mb-6 opacity-30">
        <SearchX size={72} style={{ color: 'var(--color-primary)' }} />
      </div>

      <p
        className="font-heading text-7xl sm:text-9xl font-bold mb-2 leading-none"
        style={{ color: 'var(--color-primary)', opacity: 0.15 }}
      >
        404
      </p>

      <h1
        className="font-heading text-3xl sm:text-4xl font-bold mb-3 -mt-4"
        style={{ color: 'var(--color-text)' }}
      >
        Page Not Found
      </h1>

      <p
        className="font-body text-base sm:text-lg max-w-md mb-8"
        style={{ color: 'var(--color-text-muted)' }}
      >
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
      </p>

      <Link to="/" id="back-home-button">
        <Button variant="primary" size="lg" leftIcon={<ArrowLeft size={18} />}>
          Back to Home
        </Button>
      </Link>
    </div>
  )
}
