import { useState, useEffect, useRef } from 'react'
import { Search, X } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'

// ─────────────────────────────────────────────────────────────────────────────
// Reusable SearchBar Component with Live Suggestions
// ─────────────────────────────────────────────────────────────────────────────

export default function SearchBar({ value, onChange, products = [] }) {
  const [suggestions, setSuggestions] = useState([])
  const [isOpen, setIsOpen] = useState(false)
  const containerRef = useRef(null)

  // Filter products by name for suggestions
  useEffect(() => {
    if (!value.trim()) {
      setSuggestions([])
      return
    }

    const query = value.toLowerCase()
    const filtered = products
      .filter(p => p.name.toLowerCase().includes(query))
      .slice(0, 5) // limit to 5 suggestions

    setSuggestions(filtered)
  }, [value, products])

  // Handle click outside to close suggestions
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSelectSuggestion = (name) => {
    onChange(name)
    setIsOpen(false)
  }

  const handleClear = () => {
    onChange('')
    setIsOpen(false)
  }

  return (
    <div ref={containerRef} className="relative w-full max-w-lg">
      <div className="relative">
        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-neutral-400">
          <Search size={18} />
        </span>
        <input
          type="text"
          value={value}
          onChange={(e) => {
            onChange(e.target.value)
            setIsOpen(true)
          }}
          onFocus={() => setIsOpen(true)}
          placeholder="Search products by name..."
          className="w-full pl-10 pr-10 py-3 rounded-xl border text-sm focus:outline-none transition-all duration-200"
          style={{
            backgroundColor: 'var(--color-card)',
            borderColor:     'var(--color-border)',
            color:           'var(--color-text)',
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              setIsOpen(false)
            }
          }}
        />
        <AnimatePresence>
          {value && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={handleClear}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-neutral-400 hover:text-neutral-600 dark:hover:text-neutral-200"
              aria-label="Clear search"
            >
              <X size={18} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Suggestions Dropdown */}
      <AnimatePresence>
        {isOpen && suggestions.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.15 }}
            className="absolute left-0 right-0 mt-2 rounded-xl border shadow-lg overflow-hidden z-20"
            style={{
              backgroundColor: 'var(--color-card)',
              borderColor:     'var(--color-border)',
            }}
          >
            <ul className="py-1">
              {suggestions.map((product) => (
                <li key={product.id}>
                  <button
                    onClick={() => handleSelectSuggestion(product.name)}
                    className="w-full text-left px-4 py-2.5 text-sm font-body hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors flex items-center justify-between"
                    style={{ color: 'var(--color-text)' }}
                  >
                    <span className="truncate pr-2 font-medium">{product.name}</span>
                    <span
                      className="text-xs shrink-0 px-2 py-0.5 rounded-full"
                      style={{
                        backgroundColor: 'var(--color-bg-alt)',
                        color:           'var(--color-text-muted)',
                      }}
                    >
                      {product.category.replace('-', ' ')}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
