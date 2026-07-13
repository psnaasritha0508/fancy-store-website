// ─────────────────────────────────────────────────────────────────────────────
// Home Page — Placeholder
// Full implementation in Phase 2.
// ─────────────────────────────────────────────────────────────────────────────

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
      <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-4"
          style={{ color: 'var(--color-primary)' }}>
        Welcome
      </h1>
      <p className="font-body text-lg" style={{ color: 'var(--color-text-muted)' }}>
        Home Page — Coming in Phase 2
      </p>
    </div>
  )
}
