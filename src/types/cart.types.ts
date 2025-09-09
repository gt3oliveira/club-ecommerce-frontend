import { Product } from './product.types'

export interface CartProduct extends Product {
  quantity: number
}
