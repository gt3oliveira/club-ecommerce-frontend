import { RootState } from '../../store'

export const selectProductsTotalPrice = (state: RootState) => {
  return state.cartReducer.products.reduce(
    (total, product) => total + product.price * product.quantity,
    0
  )
}

export const selectProductsCount = (state: RootState) => {
  return state.cartReducer.products.reduce(
    (total, product) => total + product.quantity,
    0
  )
}
