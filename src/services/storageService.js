import { PRODUCTS } from '@data/products'

// ─────────────────────────────────────────────────────────────────────────────
// Reusable Storage Service
// Powered by LocalStorage. Easily swap this file out for an API call later.
// ─────────────────────────────────────────────────────────────────────────────

const PRODUCTS_KEY = 'kf_products_data'

export const storageService = {
  /**
   * Initializes local storage with default mock products if empty
   */
  initialize() {
    if (!localStorage.getItem(PRODUCTS_KEY)) {
      localStorage.setItem(PRODUCTS_KEY, JSON.stringify(PRODUCTS))
    }
  },

  /**
   * Fetch all products from storage
   * @returns {Array} List of products
   */
  getProducts() {
    this.initialize()
    try {
      return JSON.parse(localStorage.getItem(PRODUCTS_KEY) || '[]')
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
    
    if (index !== -1) {
      products[index] = { ...products[index], ...updatedProduct }
    } else {
      products.push(updatedProduct)
    }
    
    this.saveProducts(products)
    return products
  },

  /**
   * Resets local storage back to default products array
   * @returns {Array} Default products list
   */
  resetProducts() {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(PRODUCTS))
    return PRODUCTS
  }
}

export default storageService
