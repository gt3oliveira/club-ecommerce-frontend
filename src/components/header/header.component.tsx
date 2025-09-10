/* eslint-disable multiline-ternary */
import { BsCart3 } from 'react-icons/bs'

import {
  HeaderContainer,
  HeaderItem,
  HeaderItems,
  HeaderTitle
} from './header.styles'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { CartContext } from '../../contexts/cart.context'
import { useSelector, useDispatch } from 'react-redux'
import { signOut } from 'firebase/auth'
import { auth } from '../../config/firebase.config'
import { logoutUser } from '../../store/reducers/user/user.actions'
const Header = () => {
  const { isAuthenticated } = useSelector(
    (rootReducer: any) => rootReducer.userReducer
  )
  const dispatch = useDispatch()
  const { toggleCart, productsCount } = useContext(CartContext)
  const navigate = useNavigate()

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
            <HeaderItem onClick={toggleCart}>
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
