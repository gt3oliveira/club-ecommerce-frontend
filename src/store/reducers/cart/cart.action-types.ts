export const CartActionTypes = {
  TOGGLE_CART: 'cart/toggle' as const,
  ADD_PRODUCT_TO_CART: 'cart/addProduct' as const,
  REMOVE_PRODUCT_FROM_CART: 'cart/removeProduct' as const,
  INCREMENT_CART_PRODUCT_QUANTITY: 'cart/incrementProductQuantity' as const,
  DECREMENT_CART_PRODUCT_QUANTITY: 'cart/decrementProductQuantity' as const,
  CLEAR_CART_PRODUCTS: 'cart/clearCartProducts' as const
}
