import { CartProduct } from '../../../types/cart.types'
import { CartActionTypes } from './cart.action-types'
import { CartActions } from './cart.actions'

interface InitialState {
  isVisible: boolean
  products: CartProduct[]
}

const initialState: InitialState = {
  isVisible: false,
  products: []
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

    case CartActionTypes.REMOVE_PRODUCT_FROM_CART: {
      return {
        ...state,
        products: state.products.filter(
          (product) => product.id !== action.payload
        )
      }
    }

    case CartActionTypes.INCREMENT_CART_PRODUCT_QUANTITY: {
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload
            ? { ...product, quantity: product.quantity + 1 }
            : product
        )
      }
    }

    case CartActionTypes.DECREMENT_CART_PRODUCT_QUANTITY: {
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload
            ? { ...product, quantity: product.quantity - 1 }
            : product
        )
      }
    }

    case CartActionTypes.CLEAR_CART_PRODUCTS: {
      return {
        ...state,
        products: []
      }
    }

    default:
      return state
  }
}
