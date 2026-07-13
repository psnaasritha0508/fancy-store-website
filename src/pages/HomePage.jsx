import { useEffect, useState } from 'react'
import {
  HeroSection,
  CategoriesSection,
  FeaturedProducts,
  WhyChooseUs,
  SeasonalBanner,
  VisitOurStore,
  FinalCTA
} from '@components/home'
import { storageService } from '@services/storageService'

// ─────────────────────────────────────────────────────────────────────────────
// Home Page
// Coordinates the sections conditionally based on homepageVisibility controls.
// Loads values dynamically from storageService to reflect content edits.
// ─────────────────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [visibility, setVisibility] = useState({
    featuredProducts: true,
    categories:       true,
    whyChooseUs:      true,
    seasonalBanner:   true,
    visitStore:       true,
    finalCta:         true
  })

  useEffect(() => {
    const loadSettings = () => {
      const settings = storageService.getSettings()
      if (settings) {
        if (settings.homepageVisibility) {
          setVisibility(settings.homepageVisibility)
        }
        
        // Dynamic SEO Title and Metadata updates
        if (settings.storeInfo) {
          document.title = `${settings.storeInfo.name} — ${settings.storeInfo.tagline}`
          
          const metaDesc = document.querySelector('meta[name="description"]')
          if (metaDesc) {
            metaDesc.setAttribute(
              'content',
              `Welcome to ${settings.storeInfo.name}, Hyderabad's trusted destination for fancy items, bangles, beauty products, cosmetics, skin care, festival specials, and kids accessories since the 1970s.`
            )
          }
        }
      }
    }

    loadSettings()
    window.addEventListener('focus', loadSettings)
    window.addEventListener('storage', loadSettings)
    return () => {
      window.removeEventListener('focus', loadSettings)
      window.removeEventListener('storage', loadSettings)
    }
  }, [])

  return (
    <div className="relative w-full overflow-hidden">
      {/* 1. Hero Section (Always visible) */}
      <HeroSection />

      {/* 2. Categories Section */}
      {visibility.categories && <CategoriesSection />}

      {/* 3. Featured Products */}
      {visibility.featuredProducts && <FeaturedProducts />}

      {/* 4. Why Choose Us */}
      {visibility.whyChooseUs && <WhyChooseUs />}

      {/* 5. Seasonal Banner */}
      {visibility.seasonalBanner && <SeasonalBanner />}

      {/* 6. Visit Our Store */}
      {visibility.visitStore && <VisitOurStore />}

      {/* 7. Final CTA */}
      {visibility.finalCta && <FinalCTA />}
    </div>
  )
}
