import { PRODUCTS } from '@data/products'
import { CATEGORIES } from '@data/categories'
import {
  STORE_NAME,
  STORE_TAGLINE,
  STORE_PHONE,
  STORE_WHATSAPP,
  STORE_EMAIL,
  STORE_ADDRESS,
  STORE_INSTAGRAM,
  STORE_INSTAGRAM_HANDLE,
  STORE_GOOGLE_MAPS,
  STORE_HOURS,
  STORE_LOGO
} from '@constants'

// ─────────────────────────────────────────────────────────────────────────────
// Reusable Storage Service
// Powered by LocalStorage. Swappable for an API call later.
// Manages: Products, Categories, and Website Settings (Hero, Banner, Store Info, About)
// ─────────────────────────────────────────────────────────────────────────────

const PRODUCTS_KEY = 'kf_products_data'
const CATEGORIES_KEY = 'kf_categories_data'
const SETTINGS_KEY = 'kf_settings_data'

export const storageService = {
  /**
   * Initializes local storage with defaults if empty
   */
  initialize() {
    if (!localStorage.getItem(PRODUCTS_KEY)) {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(PRODUCTS))
    }
    if (!localStorage.getItem(CATEGORIES_KEY)) {
      localStorage.setItem(CATEGORIES_KEY, JSON.stringify(CATEGORIES))
    }
    if (!localStorage.getItem(SETTINGS_KEY)) {
      const defaultSettings = {
        storeInfo: {
          name:            STORE_NAME,
          tagline:         STORE_TAGLINE,
          phone:           STORE_PHONE,
          whatsapp:        STORE_WHATSAPP,
          email:           STORE_EMAIL,
          address:         STORE_ADDRESS,
          instagram:       STORE_INSTAGRAM,
          instagramHandle: STORE_INSTAGRAM_HANDLE,
          googleMaps:      STORE_GOOGLE_MAPS,
          hours:           STORE_HOURS,
          logo:            STORE_LOGO
        },
        hero: {
          title:        '50+ Years of Trusted Service',
          subtitle:     'Your One-Stop Destination for Fancy, Beauty & Everyday Essentials.',
          primaryCta:   'Shop Now',
          secondaryCta: 'Visit Store',
          bgImage:      '/hero-bg.png'
        },
        seasonalBanner: {
          active:   true,
          style:    'Festival', // Festival, Offers, New Arrivals, Announcement
          badge:    'Festival Special',
          headline: 'Festival Collection Now Available',
          subtext:  'Visit Krishna Fancies for exciting seasonal arrivals — bangles, jewellery sets, festive wear accessories & more.',
          cta:      'Shop Festival Collection',
          image:    '/banner-bg.png'
        },
        homepageVisibility: {
          featuredProducts: true,
          categories:       true,
          whyChooseUs:      true,
          seasonalBanner:   true,
          visitStore:       true,
          finalCta:         true
        },
        aboutPage: {
          story: [
            { year: '1970s', title: 'The Humble Beginning', description: 'Krishna Fancies opened its doors as a small neighborhood shop in Chilakaluripet, committed to bringing quality fancy goods and bangles to our local community.' },
            { year: '1990s', title: 'Expansion & Variety', description: 'Over two decades, we expanded our catalog to include premium cosmetics, gift articles, and everyday vanity accessories, becoming a household name.' },
            { year: '2010s', title: 'Generation of Trust', description: 'Generations of families made us their first choice for wedding jewellery collections, festival decorations, and kids novelty items.' },
            { year: 'Present Day', title: 'Digital Era of Trust', description: 'Today, we combine 50+ years of traditional trust with modern convenience, allowing you to browse catalog items online and message us directly.' }
          ],
          mission: 'To curate premium quality beauty, cosmetic, and fancy products that celebrate tradition and everyday styling, offered with friendly service and fair pricing.',
          vision: 'To remain the most trusted one-stop vanity shopping destination for families, bridging generations through service excellence and product variety.'
        }
      }
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(defaultSettings))
    }
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // Settings Methods (Hero, Banner, Store Info, Visibility, About)
  // ─────────────────────────────────────────────────────────────────────────────

  /**
   * Fetch all settings from storage
   * @returns {object} Settings payload
   */
  getSettings() {
    this.initialize()
    try {
      const parsed = JSON.parse(localStorage.getItem(SETTINGS_KEY) || '{}')
      
      // Auto-migrate if aboutPage properties are missing
      if (parsed.storeInfo && !parsed.aboutPage) {
        parsed.aboutPage = {
          story: [
            { year: '1970s', title: 'The Humble Beginning', description: 'Krishna Fancies opened its doors as a small neighborhood shop in Chilakaluripet, committed to bringing quality fancy goods and bangles to our local community.' },
            { year: '1990s', title: 'Expansion & Variety', description: 'Over two decades, we expanded our catalog to include premium cosmetics, gift articles, and everyday vanity accessories, becoming a household name.' },
            { year: '2010s', title: 'Generation of Trust', description: 'Generations of families made us their first choice for wedding jewellery collections, festival decorations, and kids novelty items.' },
            { year: 'Present Day', title: 'Digital Era of Trust', description: 'Today, we combine 50+ years of traditional trust with modern convenience, allowing you to browse catalog items online and message us directly.' }
          ],
          mission: 'To curate premium quality beauty, cosmetic, and fancy products that celebrate tradition and everyday styling, offered with friendly service and fair pricing.',
          vision: 'To remain the most trusted one-stop vanity shopping destination for families, bridging generations through service excellence and product variety.'
        }
        localStorage.setItem(SETTINGS_KEY, JSON.stringify(parsed))
      }

      return parsed
    } catch (e) {
      console.error('Error parsing settings:', e)
      return {}
    }
  },

  /**
   * Saves settings to storage
   * @param {object} settings Settings payload
   */
  saveSettings(settings) {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings))
    window.dispatchEvent(new Event('storage'))
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // Product Methods
  // ─────────────────────────────────────────────────────────────────────────────

  getProducts() {
    this.initialize()
    try {
      const items = JSON.parse(localStorage.getItem(PRODUCTS_KEY) || '[]')
      return items.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))
    } catch (e) {
      console.error('Error parsing products data:', e)
      return PRODUCTS
    }
  },

  saveProducts(products) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products))
    window.dispatchEvent(new Event('storage'))
  },

  deleteProduct(id) {
    const products = this.getProducts()
    const updated = products.filter(p => p.id !== id)
    this.saveProducts(updated)
    return updated
  },

  updateProduct(id, updatedProduct) {
    const products = this.getProducts()
    const index = products.findIndex(p => p.id === id)
    
    let finalProduct = { ...updatedProduct }
    if (index === -1 && !finalProduct.displayOrder) {
      const maxOrder = products.reduce((max, p) => Math.max(max, p.displayOrder || 0), 0)
      finalProduct.displayOrder = maxOrder + 1
    }

    delete finalProduct.isBestseller
    delete finalProduct.color

    if (index !== -1) {
      products[index] = { ...products[index], ...finalProduct }
    } else {
      products.push(finalProduct)
    }
    
    this.saveProducts(products)
    return products
  },

  moveProductUp(id) {
    const products = this.getProducts()
    const index = products.findIndex(p => p.id === id)
    if (index <= 0) return products

    const current = products[index]
    const previous = products[index - 1]

    const tempOrder = current.displayOrder
    current.displayOrder = previous.displayOrder
    previous.displayOrder = tempOrder

    this.saveProducts(products)
    return this.getProducts()
  },

  moveProductDown(id) {
    const products = this.getProducts()
    const index = products.findIndex(p => p.id === id)
    if (index === -1 || index >= products.length - 1) return products

    const current = products[index]
    const next = products[index + 1]

    const tempOrder = current.displayOrder
    current.displayOrder = next.displayOrder
    next.displayOrder = tempOrder

    this.saveProducts(products)
    return this.getProducts()
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // Category Methods
  // ─────────────────────────────────────────────────────────────────────────────

  getCategories() {
    this.initialize()
    try {
      return JSON.parse(localStorage.getItem(CATEGORIES_KEY) || '[]')
    } catch (e) {
      console.error('Error parsing categories data:', e)
      return CATEGORIES
    }
  },

  saveCategories(categories) {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories))
    window.dispatchEvent(new Event('storage'))
  },

  addCategory(category) {
    const categories = this.getCategories()
    const normalizedLabel = category.label.trim().toLowerCase()
    if (categories.some(c => c.label.trim().toLowerCase() === normalizedLabel)) {
      throw new Error('A category with this name already exists.')
    }
    categories.push(category)
    this.saveCategories(categories)
    return categories
  },

  renameCategory(id, newLabel) {
    const categories = this.getCategories()
    const normalizedLabel = newLabel.trim().toLowerCase()
    
    if (categories.some(c => c.id !== id && c.label.trim().toLowerCase() === normalizedLabel)) {
      throw new Error('A category with this name already exists.')
    }

    const index = categories.findIndex(c => c.id === id)
    if (index !== -1) {
      const oldId = categories[index].id
      categories[index].label = newLabel.trim()
      this.saveCategories(categories)
      
      const products = this.getProducts()
      let updatedAny = false
      products.forEach(p => {
        if (p.category === oldId) {
          p.category = oldId
          updatedAny = true
        }
      })
      if (updatedAny) {
        this.saveProducts(products)
      }
    }
    return categories
  },

  deleteCategory(id, migrationCategoryId) {
    const categories = this.getCategories()
    const updatedCategories = categories.filter(c => c.id !== id)
    this.saveCategories(updatedCategories)

    const products = this.getProducts()
    let updatedProducts = [...products]

    if (migrationCategoryId === 'delete') {
      updatedProducts = products.filter(p => p.category !== id)
    } else {
      updatedProducts = products.map(p => {
        if (p.category === id) {
          return { ...p, category: migrationCategoryId || 'uncategorized' }
        }
        return p
      })
    }

    this.saveProducts(updatedProducts)
    return { categories: updatedCategories, products: updatedProducts }
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // General Reset
  // ─────────────────────────────────────────────────────────────────────────────

  resetAll() {
    localStorage.removeItem(SETTINGS_KEY)
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(PRODUCTS))
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(CATEGORIES))
    this.initialize()
    window.dispatchEvent(new Event('storage'))
    return { products: PRODUCTS, categories: CATEGORIES, settings: this.getSettings() }
  }
}

export default storageService
