import { PRODUCTS } from '@data/products'
import { CATEGORIES } from '@data/categories'

// ─────────────────────────────────────────────────────────────────────────────
// Reusable Storage Service
// Powered by LocalStorage. Swappable for an API call later.
// ─────────────────────────────────────────────────────────────────────────────

const PRODUCTS_KEY = 'kf_products_data'
const CATEGORIES_KEY = 'kf_categories_data'

export const storageService = {
  /**
   * Initializes local storage with default mock products and categories if empty
   */
  initialize() {
    if (!localStorage.getItem(PRODUCTS_KEY)) {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(PRODUCTS))
    }
    if (!localStorage.getItem(CATEGORIES_KEY)) {
      localStorage.setItem(CATEGORIES_KEY, JSON.stringify(CATEGORIES))
    }
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // Product Methods
  // ─────────────────────────────────────────────────────────────────────────────

  /**
   * Fetch all products from storage, sorted by displayOrder ascending
   * @returns {Array} List of products
   */
  getProducts() {
    this.initialize()
    try {
      const items = JSON.parse(localStorage.getItem(PRODUCTS_KEY) || '[]')
      // Sort primarily by displayOrder ascending
      return items.sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0))
    } catch (e) {
      console.error('Error parsing products data:', e)
      return PRODUCTS
    }
  },

  /**
   * Saves the entire product array to storage
   * @param {Array} products List of products
   */
  saveProducts(products) {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products))
    // Trigger storage event to update other tabs immediately
    window.dispatchEvent(new Event('storage'))
  },

  /**
   * Delete a single product by ID
   * @param {string} id Product ID
   * @returns {Array} Updated product list
   */
  deleteProduct(id) {
    const products = this.getProducts()
    const updated = products.filter(p => p.id !== id)
    this.saveProducts(updated)
    return updated
  },

  /**
   * Update or add a product by ID
   * @param {string} id Product ID
   * @param {object} updatedProduct Product payload
   * @returns {Array} Updated product list
   */
  updateProduct(id, updatedProduct) {
    const products = this.getProducts()
    const index = products.findIndex(p => p.id === id)
    
    // Auto-calculate displayOrder if adding a new product
    let finalProduct = { ...updatedProduct }
    if (index === -1 && !finalProduct.displayOrder) {
      const maxOrder = products.reduce((max, p) => Math.max(max, p.displayOrder || 0), 0)
      finalProduct.displayOrder = maxOrder + 1
    }

    // Clean up fields (ensure isBestseller or other custom flags are not present)
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

  /**
   * Swaps displayOrder values to move product UP in the list (towards index 0)
   * @param {string} id Product ID
   * @returns {Array} Updated product list
   */
  moveProductUp(id) {
    const products = this.getProducts()
    const index = products.findIndex(p => p.id === id)
    if (index <= 0) return products // Already at top

    // Swap items in array and their displayOrder
    const current = products[index]
    const previous = products[index - 1]

    const tempOrder = current.displayOrder
    current.displayOrder = previous.displayOrder
    previous.displayOrder = tempOrder

    this.saveProducts(products)
    return this.getProducts() // returns sorted list
  },

  /**
   * Swaps displayOrder values to move product DOWN in the list
   * @param {string} id Product ID
   * @returns {Array} Updated product list
   */
  moveProductDown(id) {
    const products = this.getProducts()
    const index = products.findIndex(p => p.id === id)
    if (index === -1 || index >= products.length - 1) return products // Already at bottom

    // Swap items in array and their displayOrder
    const current = products[index]
    const next = products[index + 1]

    const tempOrder = current.displayOrder
    current.displayOrder = next.displayOrder
    next.displayOrder = tempOrder

    this.saveProducts(products)
    return this.getProducts() // returns sorted list
  },

  // ─────────────────────────────────────────────────────────────────────────────
  // Category Methods
  // ─────────────────────────────────────────────────────────────────────────────

  /**
   * Fetch all categories
   * @returns {Array} List of categories
   */
  getCategories() {
    this.initialize()
    try {
      return JSON.parse(localStorage.getItem(CATEGORIES_KEY) || '[]')
    } catch (e) {
      console.error('Error parsing categories data:', e)
      return CATEGORIES
    }
  },

  /**
   * Saves categories array
   * @param {Array} categories List of categories
   */
  saveCategories(categories) {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories))
    window.dispatchEvent(new Event('storage'))
  },

  /**
   * Add a new category
   * @param {object} category Category details
   */
  addCategory(category) {
    const categories = this.getCategories()
    // Avoid duplicates
    const normalizedLabel = category.label.trim().toLowerCase()
    if (categories.some(c => c.label.trim().toLowerCase() === normalizedLabel)) {
      throw new Error('A category with this name already exists.')
    }
    categories.push(category)
    this.saveCategories(categories)
    return categories
  },

  /**
   * Rename an existing category
   */
  renameCategory(id, newLabel) {
    const categories = this.getCategories()
    const normalizedLabel = newLabel.trim().toLowerCase()
    
    // Check duplicates excluding the current category
    if (categories.some(c => c.id !== id && c.label.trim().toLowerCase() === normalizedLabel)) {
      throw new Error('A category with this name already exists.')
    }

    const index = categories.findIndex(c => c.id === id)
    if (index !== -1) {
      const oldId = categories[index].id
      categories[index].label = newLabel.trim()
      
      // If label changes, we also update its ID / path reference if they are derived.
      // But keeping old ID matches previous relationships. We rename the label.
      this.saveCategories(categories)
      
      // Update all products holding the old category ID to keep integrity
      const products = this.getProducts()
      let updatedAny = false
      products.forEach(p => {
        if (p.category === oldId) {
          p.category = oldId // keeping ID identical is safest, we renamed label!
          updatedAny = true
        }
      })
      if (updatedAny) {
        this.saveProducts(products)
      }
    }
    return categories
  },

  /**
   * Delete a category
   * @param {string} id Category ID
   * @param {string} migrationCategoryId Target category to move products to, or 'delete' to remove products, or 'uncategorized'
   */
  deleteCategory(id, migrationCategoryId) {
    const categories = this.getCategories()
    const updatedCategories = categories.filter(c => c.id !== id)
    this.saveCategories(updatedCategories)

    // Handle product migration
    const products = this.getProducts()
    let updatedProducts = [...products]

    if (migrationCategoryId === 'delete') {
      // Delete products in this category
      updatedProducts = products.filter(p => p.category !== id)
    } else {
      // Reassign products to the target category
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
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(PRODUCTS))
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(CATEGORIES))
    window.dispatchEvent(new Event('storage'))
    return { products: PRODUCTS, categories: CATEGORIES }
  }
}

export default storageService
