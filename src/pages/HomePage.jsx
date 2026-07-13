import { useEffect } from 'react'
import {
  HeroSection,
  CategoriesSection,
  FeaturedProducts,
  WhyChooseUs,
  SeasonalBanner,
  VisitOurStore,
  FinalCTA
} from '@components/home'
import { STORE_NAME, STORE_TAGLINE } from '@constants'

// ─────────────────────────────────────────────────────────────────────────────
// Home Page
// Coordinates the premium, mobile-first homepage structure and sets page SEO
// ─────────────────────────────────────────────────────────────────────────────

export default function HomePage() {
  useEffect(() => {
    // Set Page SEO Metadata dynamically
    document.title = `${STORE_NAME} — ${STORE_TAGLINE}`
    
    const metaDesc = document.querySelector('meta[name="description"]')
    if (metaDesc) {
      metaDesc.setAttribute(
        'content',
        `Welcome to ${STORE_NAME}, Hyderabad's trusted destination for fancy items, bangles, beauty products, cosmetics, skin care, festival specials, and kids accessories since the 1970s.`
      )
    }
  }, [])

  return (
    <div className="relative w-full overflow-hidden">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Categories Section */}
      <CategoriesSection />

      {/* 3. Featured Products */}
      <FeaturedProducts />

      {/* 4. Why Choose Us */}
      <WhyChooseUs />

      {/* 5. Seasonal Banner */}
      <SeasonalBanner />

      {/* 6. Visit Our Store */}
      <VisitOurStore />

      {/* 7. Final CTA */}
      <FinalCTA />
    </div>
  )
}
