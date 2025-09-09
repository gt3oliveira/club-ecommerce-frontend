import { createContext, FunctionComponent, useState } from 'react'
import { CartProduct } from '../types/cart.types'
import { Product } from '../types/product.types'

interface ICartContext {
  isVisible: boolean
  products: CartProduct[]
  toggleCart: () => void
  addProductCart: (product: Product) => void
}

export const CartContext = createContext<ICartContext>({
  isVisible: false,
  products: [],
  toggleCart: () => {},
  addProductCart: () => {}
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

  return (
    <CartContext.Provider
      value={{
        isVisible,
        products,
        toggleCart,
        addProductCart
      }}>
      {children}
    </CartContext.Provider>
  )
}

export default CartContextProvider
