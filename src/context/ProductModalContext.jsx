import { createContext, useContext, useState, useCallback, useEffect } from 'react'

const ProductModalContext = createContext(null)

export function ProductModalProvider({ children }) {
  const [selectedProduct, setSelectedProduct] = useState(null)

  const openModal = useCallback((product) => {
    setSelectedProduct(product)
  }, [])

  const closeModal = useCallback(() => {
    setSelectedProduct(null)
  }, [])

  // Disable background scrolling when modal is open
  useEffect(() => {
    if (selectedProduct) {
      const scrollY = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollY}px`
      document.body.style.width = '100%'
      document.body.style.overflowY = 'scroll'
    } else {
      const scrollY = document.body.style.top
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflowY = ''
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0', 10) * -1)
      }
    }
    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflowY = ''
    }
  }, [selectedProduct])

  return (
    <ProductModalContext.Provider value={{ selectedProduct, openModal, closeModal }}>
      {children}
    </ProductModalContext.Provider>
  )
}

export function useProductModal() {
  const context = useContext(ProductModalContext)
  if (!context) {
    throw new Error('useProductModal must be used within a ProductModalProvider')
  }
  return context
}
