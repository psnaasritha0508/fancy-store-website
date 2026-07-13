// ─────────────────────────────────────────────────────────────────────────────
// Placeholder Product Data
// Replace with real products from Admin Dashboard in a future phase.
// ─────────────────────────────────────────────────────────────────────────────

export const FEATURED_PRODUCTS = [
  {
    id:           'prod-001',
    name:         'Kundan Bangle Set',
    category:     'bangles',
    markedPrice:  599,
    sellingPrice: 449,
    image:        null,           // Will be replaced with real image
    color:        '#C9A227',      // placeholder card color
    emoji:        '🪬',
    inStock:      true,
    isNew:        false,
    isBestseller: true,
  },
  {
    id:           'prod-002',
    name:         'Jhumka Earrings – Gold',
    category:     'earrings',
    markedPrice:  399,
    sellingPrice: 279,
    image:        null,
    color:        '#7B4B6A',
    emoji:        '💎',
    inStock:      true,
    isNew:        true,
    isBestseller: false,
  },
  {
    id:           'prod-003',
    name:         'Temple Necklace Set',
    category:     'necklaces',
    markedPrice:  899,
    sellingPrice: 649,
    image:        null,
    color:        '#C9A227',
    emoji:        '📿',
    inStock:      true,
    isNew:        false,
    isBestseller: true,
  },
  {
    id:           'prod-004',
    name:         'Matte Lip Kit',
    category:     'beauty-products',
    markedPrice:  349,
    sellingPrice: 249,
    image:        null,
    color:        '#a83258',
    emoji:        '💄',
    inStock:      true,
    isNew:        true,
    isBestseller: false,
  },
  {
    id:           'prod-005',
    name:         'Aloe Vera Gel – 200ml',
    category:     'skin-care',
    markedPrice:  199,
    sellingPrice: 149,
    image:        null,
    color:        '#2d6b4c',
    emoji:        '🧴',
    inStock:      true,
    isNew:        false,
    isBestseller: false,
  },
  {
    id:           'prod-006',
    name:         'Festive Gift Hamper',
    category:     'gift-items',
    markedPrice:  1299,
    sellingPrice: 999,
    image:        null,
    color:        '#7B4B6A',
    emoji:        '🎁',
    inStock:      false,
    isNew:        false,
    isBestseller: true,
  },
  {
    id:           'prod-007',
    name:         'Silk Hair Scrunchie Set',
    category:     'hair-accessories',
    markedPrice:  149,
    sellingPrice: 99,
    image:        null,
    color:        '#a83258',
    emoji:        '🎀',
    inStock:      true,
    isNew:        true,
    isBestseller: false,
  },
  {
    id:           'prod-008',
    name:         'Fancy Keychain Collection',
    category:     'fancy-items',
    markedPrice:  199,
    sellingPrice: 129,
    image:        null,
    color:        '#C9A227',
    emoji:        '✨',
    inStock:      true,
    isNew:        false,
    isBestseller: false,
  },
]

// ─────────────────────────────────────────────────────────────────────────────
// Seasonal Banner Data
// Configurable from Admin Dashboard in a future phase.
// ─────────────────────────────────────────────────────────────────────────────

export const SEASONAL_BANNER = {
  id:       'banner-001',
  active:   true,
  badge:    '🎊 New Arrivals',
  headline: 'Festival Collection Now Available',
  subtext:  'Visit Krishna Fancies for exciting seasonal arrivals — bangles, jewellery sets, festive wear accessories & more.',
  cta:      'Shop Festival Collection',
  ctaLink:  '/shop?category=festival-items',
  image:    '/banner-bg.png',
}

export default FEATURED_PRODUCTS
