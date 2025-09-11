import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { CartProduct } from '../../../types/cart.types'
import { Product } from '../../../types/product.types'

interface InitialState {
  isVisible: boolean
  products: CartProduct[]
}

const initialState: InitialState = {
  isVisible: false,
  products: []
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    toggleCart: (state) => ({
      ...state,
      isVisible: !state.isVisible
    }),
    addProductToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload
      const products = state.products

      const productExists = products.some((item) => item.id === product.id)

      if (productExists) {
        state.products = products.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
        return
      }

      state.products = [...products, { ...product, quantity: 1 }]
    },
    removeProductFromCart: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      )
    },
    incrementCartProductQuantity: (state, action: PayloadAction<string>) => {
      state.products = state.products.map((product) =>
        product.id === action.payload
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    },
    decrementCartProductQuantity: (state, action: PayloadAction<string>) => {
      state.products = state.products.map((product) =>
        product.id === action.payload
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    },
    clearCartProducts: (state) => {
      state.products = []
    }
  }
})

export const {
  toggleCart,
  addProductToCart,
  removeProductFromCart,
  incrementCartProductQuantity,
  decrementCartProductQuantity,
  clearCartProducts
} = cartSlice.actions

export default cartSlice.reducer
