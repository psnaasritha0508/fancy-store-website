import { ROUTES } from '@constants'
import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from '@layouts/MainLayout'

// ─────────────────────────────────────────────────────────────────────────────
// Lazy-loaded page components
// ─────────────────────────────────────────────────────────────────────────────
const HomePage    = lazy(() => import('@pages/HomePage'))
const ShopPage    = lazy(() => import('@pages/ShopPage'))
const AboutPage   = lazy(() => import('@pages/AboutPage'))
const ContactPage = lazy(() => import('@pages/ContactPage'))
const AdminPage   = lazy(() => import('@pages/AdminPage'))
const NotFoundPage = lazy(() => import('@pages/NotFoundPage'))

// ─────────────────────────────────────────────────────────────────────────────
// Page loading fallback
// ─────────────────────────────────────────────────────────────────────────────
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="text-center">
        <div
          className="w-10 h-10 rounded-full border-2 border-t-transparent mx-auto mb-4"
          style={{ borderColor: 'var(--color-primary)', borderTopColor: 'transparent', animation: 'spin 0.8s linear infinite' }}
        />
        <p className="font-body text-sm" style={{ color: 'var(--color-text-muted)' }}>Loading…</p>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Router configuration
// ─────────────────────────────────────────────────────────────────────────────
const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      {
        path: ROUTES.HOME,
        element: (
          <Suspense fallback={<PageLoader />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: ROUTES.SHOP,
        element: (
          <Suspense fallback={<PageLoader />}>
            <ShopPage />
          </Suspense>
        ),
      },
      {
        path: ROUTES.ABOUT,
        element: (
          <Suspense fallback={<PageLoader />}>
            <AboutPage />
          </Suspense>
        ),
      },
      {
        path: ROUTES.CONTACT,
        element: (
          <Suspense fallback={<PageLoader />}>
            <ContactPage />
          </Suspense>
        ),
      },
      {
        path: ROUTES.ADMIN,
        element: (
          <Suspense fallback={<PageLoader />}>
            <AdminPage />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '*',
    element: (
      <Suspense fallback={<PageLoader />}>
        <NotFoundPage />
      </Suspense>
    ),
  },
])

export default function AppRouter() {
  return <RouterProvider router={router} />
}
