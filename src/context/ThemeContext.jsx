import { createContext, useContext, useEffect, useState } from 'react'

// ─────────────────────────────────────────────────────────────────────────────
// Theme Context — Light / Dark Mode
// ─────────────────────────────────────────────────────────────────────────────

const ThemeContext = createContext(undefined)

export const THEMES = {
  LIGHT: 'light',
  DARK:  'dark',
}

/**
 * ThemeProvider — wraps the app and provides theme state + toggle.
 * Persists preference to localStorage and applies 'dark' class to <html>.
 */
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    // 1. Check localStorage
    const saved = localStorage.getItem('fancy-store-theme')
    if (saved === THEMES.LIGHT || saved === THEMES.DARK) return saved

    // 2. Respect system preference
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return THEMES.DARK
    }

    return THEMES.LIGHT
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === THEMES.DARK) {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
    localStorage.setItem('fancy-store-theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => (prev === THEMES.LIGHT ? THEMES.DARK : THEMES.LIGHT))
  }

  const setLightTheme = () => setTheme(THEMES.LIGHT)
  const setDarkTheme  = () => setTheme(THEMES.DARK)

  const value = {
    theme,
    isDark:       theme === THEMES.DARK,
    isLight:      theme === THEMES.LIGHT,
    toggleTheme,
    setLightTheme,
    setDarkTheme,
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

/**
 * useTheme — consume the theme context in any component.
 */
export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (ctx === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return ctx
}

export default ThemeContext
