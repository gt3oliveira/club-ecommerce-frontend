import { CartProduct } from '../../../types/cart.types'
import { CartActionTypes } from './cart.action-types'
import { CartActions } from './cart.actions'

interface InitialState {
  isVisible: boolean
  products: CartProduct[]
  productsCount: number
  totalCartPrice: number
}

const initialState: InitialState = {
  isVisible: false,
  products: [],
  productsCount: 0,
  totalCartPrice: 0
}

export const cartReducer = (
  state = initialState,
  action: CartActions
): InitialState => {
  switch (action.type) {
    case CartActionTypes.TOGGLE_CART:
      return {
        ...state,
        isVisible: !state.isVisible
      }
    case CartActionTypes.ADD_PRODUCT_TO_CART: {
      const product = action.payload
      const products = state.products

      const productExists = products.some((item) => item.id === product.id)

      if (productExists) {
        return {
          ...state,
          products: products.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        }
      }

      return {
        ...state,
        products: [...products, { ...product, quantity: 1 }]
      }
    }
    default:
      return {
        ...state
      }
  }
}
