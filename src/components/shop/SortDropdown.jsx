import { ArrowUpDown } from 'lucide-react'

// ─────────────────────────────────────────────────────────────────────────────
// Reusable SortDropdown Component
// Premium select element with custom border and leading icon
// ─────────────────────────────────────────────────────────────────────────────

export const SORT_OPTIONS = [
  { value: 'featured',     label: 'Featured' },
  { value: 'price-asc',    label: 'Price: Low to High' },
  { value: 'price-desc',   label: 'Price: High to Low' },
  { value: 'newest',       label: 'Newest Arrivals' },
]

export default function SortDropdown({ value, onChange }) {
  return (
    <div className="flex items-center gap-2 shrink-0">
      <span
        className="text-neutral-400 flex items-center justify-center w-9 h-9 rounded-xl border shrink-0"
        style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-card)' }}
      >
        <ArrowUpDown size={15} />
      </span>

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="py-2 pl-3 pr-8 rounded-xl border text-xs font-semibold focus:outline-none transition-all duration-200 cursor-pointer appearance-none bg-no-repeat"
        style={{
          backgroundColor: 'var(--color-card)',
          borderColor:     'var(--color-border)',
          color:           'var(--color-text)',
          // Simple custom chevron background to avoid browser defaults style issues
          backgroundImage: `url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
          backgroundPosition: 'right 0.5rem center',
          backgroundSize: '1rem',
        }}
        aria-label="Sort products"
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  )
}
