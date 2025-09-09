import { FunctionComponent } from 'react'
import {
  CartItemContainer,
  CartItemImage,
  CartItemInfo,
  CartItemQuantity,
  RemoveButton
} from './cart-item.styles'
import { CartProduct } from '../../types/cart.types'
import { AiOutlinePlus, AiOutlineMinus, AiOutlineClose } from 'react-icons/ai'

interface CartItemProps {
  cartProduct: CartProduct
}

const CartItem: FunctionComponent<CartItemProps> = ({ cartProduct }) => {
  return (
    <CartItemContainer>
      <CartItemImage imageUrl={cartProduct.imageUrl} />
      <CartItemInfo>
        <p>{cartProduct.name}</p>
        <p>
          {Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
          }).format(cartProduct.price)}
        </p>
        <CartItemQuantity>
          <AiOutlineMinus onClick={() => {}} size={20} />
          <p>{cartProduct.quantity}</p>
          <AiOutlinePlus onClick={() => {}} size={20} />
        </CartItemQuantity>
      </CartItemInfo>

      <RemoveButton>
        <AiOutlineClose onClick={() => {}} size={20} />
      </RemoveButton>
    </CartItemContainer>
  )
}

export default CartItem
