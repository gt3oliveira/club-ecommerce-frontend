import { createContext, FunctionComponent, useState } from 'react'
import { CartProduct } from '../types/cart.types'
import { Product } from '../types/product.types'

interface ICartContext {
  isVisible: boolean
  products: CartProduct[]
  toggleCart: () => void
  addProductCart: (product: Product) => void
  removeProductToCart: (productId: string) => void
  incrementProductQuantity: (productId: string) => void
  decrementProductQuantity: (productId: string) => void
}

export const CartContext = createContext<ICartContext>({
  isVisible: false,
  products: [],
  toggleCart: () => {},
  addProductCart: () => {},
  removeProductToCart: () => {},
  incrementProductQuantity: () => {},
  decrementProductQuantity: () => {}
})

const CartContextProvider: FunctionComponent = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false)
  const [products, setProducts] = useState<CartProduct[]>([])

  const toggleCart = () => setIsVisible(!isVisible)

  const addProductCart = (product: Product) => {
    const productExists = products.some((p) => p.id === product.id)

    if (productExists) {
      return setProducts((products) =>
        products.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      )
    }

    setProducts((prev) => [...prev, { ...product, quantity: 1 }])
  }

  const removeProductToCart = (productId: string) => {
    setProducts((prev) => prev.filter((product) => product.id !== productId))
  }

  const incrementProductQuantity = (productId: string) => {
    setProducts((products) =>
      products.map((product) =>
        product.id === productId
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    )
  }

  const decrementProductQuantity = (productId: string) => {
    setProducts((products) =>
      products.map((product) =>
        product.id === productId
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    )
  }

  return (
    <CartContext.Provider
      value={{
        isVisible,
        products,
        toggleCart,
        addProductCart,
        removeProductToCart,
        incrementProductQuantity,
        decrementProductQuantity
      }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartContextProvider
