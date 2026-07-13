import { ThemeProvider } from '@context/ThemeContext'
import AppRouter from '@routes/AppRouter'

// ─────────────────────────────────────────────────────────────────────────────
// App — Root component
// Wraps the entire application with providers
// ─────────────────────────────────────────────────────────────────────────────

export default function App() {
  return (
    <ThemeProvider>
      <AppRouter />
    </ThemeProvider>
  )
}
