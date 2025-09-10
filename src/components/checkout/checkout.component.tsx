import { FunctionComponent, useContext, useEffect } from 'react'
import {
  CheckoutContainer,
  CheckoutProducts,
  CheckoutTitle,
  CheckoutTotal
} from './checkout.styles'
import { CartContext } from '../../contexts/cart.context'
import CartItem from '../cart-item/cart-item.component'
import CustomButton from '../custom-button/custom-button.component'
import { BsBagCheck } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../../contexts/user.context'

interface CheckoutProps {}

const Checkout: FunctionComponent<CheckoutProps> = () => {
  const { isAuthenticated } = useContext(UserContext)
  const navigate = useNavigate()

  const {
    products,
    incrementProductQuantity,
    decrementProductQuantity,
    removeProductToCart,
    totalCartPrice
  } = useContext(CartContext)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated])

  if (products.length === 0) navigate('/')

  return (
    <CheckoutContainer>
      <CheckoutTitle>Checkout</CheckoutTitle>
      <CheckoutProducts>
        {products.map((product) => (
          <CartItem
            key={product.id}
            cartProduct={product}
            incrementProductQuantity={incrementProductQuantity}
            decrementProductQuantity={decrementProductQuantity}
            removeProductToCart={removeProductToCart}
          />
        ))}
      </CheckoutProducts>
      <CheckoutTotal>
        Total{' '}
        {Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(totalCartPrice)}
      </CheckoutTotal>
      <CustomButton icon={<BsBagCheck size={18} />}>
        Finalizar Compra
      </CustomButton>
    </CheckoutContainer>
  )
}

export default Checkout
