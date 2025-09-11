/* eslint-disable multiline-ternary */
import { BsCart3 } from 'react-icons/bs'

import {
  HeaderContainer,
  HeaderItem,
  HeaderItems,
  HeaderTitle
} from './header.styles'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signOut } from 'firebase/auth'
import { auth } from '../../config/firebase.config'
import { logoutUser } from '../../store/toolkit/user/user.slice'
import { useAppSelector } from '../../hooks/redux.hooks'
import { toggleCart } from '../../store/reducers/cart/cart.actions'
import { selectProductsCount } from '../../store/reducers/cart/cart.selectors'
const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { isAuthenticated } = useAppSelector(
    (rootReducer) => rootReducer.userReducer
  )
  const productsCount = useAppSelector(selectProductsCount)

  const handleLoginClick = () => {
    navigate('/login')
  }

  const handleSignUpClick = () => {
    navigate('/sign-up')
  }

  const handleLogoClick = () => {
    navigate('/')
  }

  const handleExplorerClick = () => {
    navigate('/explore')
  }

  const handleSignOutClick = () => {
    dispatch(logoutUser())
    signOut(auth)
  }

  const handleToggleCart = () => {
    dispatch(toggleCart())
  }

  return (
    <HeaderContainer>
      <HeaderTitle onClick={handleLogoClick}>CLUB CLOTHING</HeaderTitle>
      <HeaderItems>
        {!isAuthenticated && (
          <>
            <HeaderItem onClick={handleLoginClick}>Login</HeaderItem>
            <HeaderItem onClick={handleSignUpClick}>Criar Conta</HeaderItem>
          </>
        )}
        {isAuthenticated && (
          <>
            <HeaderItem onClick={handleExplorerClick}>Explorar</HeaderItem>
            <HeaderItem onClick={handleSignOutClick}>Sair</HeaderItem>
            <HeaderItem onClick={handleToggleCart}>
              <BsCart3 size={25} />
              <p style={{ marginLeft: '5px' }}>
                {productsCount > 0 && productsCount}
              </p>
            </HeaderItem>
          </>
        )}
      </HeaderItems>
    </HeaderContainer>
  )
}

export default Header
