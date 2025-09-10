import { FunctionComponent, useEffect, useState } from 'react'
import {
  CheckoutContainer,
  CheckoutProducts,
  CheckoutTitle,
  CheckoutTotal
} from './checkout.styles'
import CartItem from '../cart-item/cart-item.component'
import CustomButton from '../custom-button/custom-button.component'
import { BsBagCheck } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import LoadingPage from '../loading/loading.component'
import { useAppSelector } from '../../hooks/redux.hooks'
import { selectProductsTotalPrice } from '../../store/reducers/cart/cart.selectors'
import { useDispatch } from 'react-redux'
import {
  clearCartProducts,
  decrementCartProductQuantity,
  incrementCartProductQuantity,
  removeProductFromCart
} from '../../store/reducers/cart/cart.actions'

const Checkout: FunctionComponent = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(false)

  const { isAuthenticated } = useAppSelector(
    (rootReducer) => rootReducer.userReducer
  )

  const { products } = useAppSelector((rootReducer) => rootReducer.cartReducer)
  const totalCartPrice = useAppSelector(selectProductsTotalPrice)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated])

  if (products.length === 0) navigate('/')

  const handleFinishPagament = () => {
    setIsLoading(true)
    setTimeout(() => {
      dispatch(clearCartProducts())
      navigate(`/payment-confirmation?success=${true}`)
    }, 5000)
  }

  const incrementProductQuantity = (productId: string) => {
    dispatch(incrementCartProductQuantity(productId))
  }

  const decrementProductQuantity = (productId: string) => {
    dispatch(decrementCartProductQuantity(productId))
  }

  const removeProductToCart = (productId: string) => {
    dispatch(removeProductFromCart(productId))
  }

  return (
    <CheckoutContainer>
      {isLoading && <LoadingPage />}
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
      <CustomButton
        onClick={handleFinishPagament}
        icon={<BsBagCheck size={18} />}>
        Finalizar Compra
      </CustomButton>
    </CheckoutContainer>
  )
}

export default Checkout
