import { FunctionComponent, useContext } from 'react'
import {
  CartContainer,
  CartContent,
  CartEscapeArea,
  CartTitle,
  CartTotal
} from './cart.styles'
import CustomButton from '../custom-button/custom-button.component'
import { BsCartCheck } from 'react-icons/bs'
import { CartContext } from '../../contexts/cart.context'
import CartItem from '../cart-item/cart-item.component'

interface CartProps {}

const Cart: FunctionComponent<CartProps> = () => {
  const { isVisible, toggleCart, products } = useContext(CartContext)

  return (
    <CartContainer isVisible={isVisible}>
      <CartEscapeArea onClick={toggleCart} />
      <CartContent>
        <CartTitle>Seu Carrinho</CartTitle>

        {products.map((product) => (
          <CartItem key={product.id} cartProduct={product} />
        ))}

        <CartTotal>R$ 0</CartTotal>
        <CustomButton icon={<BsCartCheck size={18} />}>
          Ir para o Checkout
        </CustomButton>
      </CartContent>
    </CartContainer>
  )
}

export default Cart
