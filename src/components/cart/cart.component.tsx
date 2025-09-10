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
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../hooks/redux.hooks'
import { toggleCart } from '../../store/reducers/cart/cart.actions'
import { useDispatch } from 'react-redux'
import {
  selectProductsCount,
  selectProductsTotalPrice
} from '../../store/reducers/cart/cart.selectors'

const Cart: FunctionComponent = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { isVisible, products } = useAppSelector(
    (rootReducer) => rootReducer.cartReducer
  )

  const totalCartPrice = useAppSelector(selectProductsTotalPrice)
  const productsCount = useAppSelector(selectProductsCount)

  const {
    incrementProductQuantity,
    decrementProductQuantity,
    removeProductToCart
  } = useContext(CartContext)

  const handleCheckoutClick = () => {
    dispatch(toggleCart())
    navigate('/checkout')
  }

  const handleToggleCart = () => {
    dispatch(toggleCart())
  }

  return (
    <CartContainer isVisible={isVisible}>
      <CartEscapeArea onClick={handleToggleCart} />
      <CartContent>
        <CartTitle>Seu Carrinho</CartTitle>

        {products.map((product) => (
          <CartItem
            key={product.id}
            cartProduct={product}
            incrementProductQuantity={incrementProductQuantity}
            decrementProductQuantity={decrementProductQuantity}
            removeProductToCart={removeProductToCart}
          />
        ))}

        {productsCount > 0 ? (
          <>
            <CartTotal>
              {Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
              }).format(totalCartPrice)}
            </CartTotal>
            <CustomButton
              onClick={handleCheckoutClick}
              icon={<BsCartCheck size={18} />}>
              Ir para o Checkout
            </CustomButton>
          </>
        ) : (
          <p>Seu carrinho está vazio!</p>
        )}
      </CartContent>
    </CartContainer>
  )
}

export default Cart
