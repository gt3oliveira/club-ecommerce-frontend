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

interface RemoveProductFromCartAction {
  type: typeof CartActionTypes.REMOVE_PRODUCT_FROM_CART
  payload: string
}

export const removeProductFromCart = (
  payload: string
): RemoveProductFromCartAction => ({
  type: CartActionTypes.REMOVE_PRODUCT_FROM_CART,
  payload
})

interface IncrementCartProductQuantityAction {
  type: typeof CartActionTypes.INCREMENT_CART_PRODUCT_QUANTITY
  payload: string
}

export const incrementCartProductQuantity = (
  payload: string
): IncrementCartProductQuantityAction => ({
  type: CartActionTypes.INCREMENT_CART_PRODUCT_QUANTITY,
  payload
})

interface DecrementProductQuantityAction {
  type: typeof CartActionTypes.DECREMENT_CART_PRODUCT_QUANTITY
  payload: string
}

export const decrementCartProductQuantity = (
  payload: string
): DecrementProductQuantityAction => ({
  type: CartActionTypes.DECREMENT_CART_PRODUCT_QUANTITY,
  payload
})

interface ClearCartProductsAction {
  type: typeof CartActionTypes.CLEAR_CART_PRODUCTS
}

export const clearCartProducts = (): ClearCartProductsAction => ({
  type: CartActionTypes.CLEAR_CART_PRODUCTS
})

export type CartActions =
  | ToggleCartAction
  | AddProductToCartAction
  | RemoveProductFromCartAction
  | IncrementCartProductQuantityAction
  | DecrementProductQuantityAction
  | ClearCartProductsAction
