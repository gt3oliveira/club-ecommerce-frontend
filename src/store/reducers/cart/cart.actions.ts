import { Product } from '../../../types/product.types'
import { CartActionTypes } from './cart.action-types'

interface ToggleCartAction {
  type: typeof CartActionTypes.TOGGLE_CART
}

export const toggleCart = (): ToggleCartAction => ({
  type: CartActionTypes.TOGGLE_CART
})

interface AddProductToCartAction {
  type: typeof CartActionTypes.ADD_PRODUCT_TO_CART
  payload: Product
}

export const addProductToCart = (payload: Product): AddProductToCartAction => ({
  type: CartActionTypes.ADD_PRODUCT_TO_CART,
  payload
})

export type CartActions = ToggleCartAction | AddProductToCartAction
