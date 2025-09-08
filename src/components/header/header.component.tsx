/* eslint-disable multiline-ternary */
import { BsCart3 } from 'react-icons/bs'

import {
  HeaderContainer,
  HeaderItem,
  HeaderItems,
  HeaderTitle
} from './header.styles'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../../config/firebase.config'
import { useContext } from 'react'
import { UserContext } from '../../contexts/user.context'
const Header = () => {
  const { isAuthenticated } = useContext(UserContext)
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

  return (
    <HeaderContainer>
      <HeaderTitle onClick={handleLogoClick}>CLUB CLOTHING</HeaderTitle>
      <HeaderItems>
        <HeaderItem>Explorar</HeaderItem>
        {!isAuthenticated ? (
          <>
            <HeaderItem onClick={handleLoginClick}>Login</HeaderItem>
            <HeaderItem onClick={handleSignUpClick}>Criar Conta</HeaderItem>
          </>
        ) : (
          <HeaderItem onClick={() => signOut(auth)}>Sair</HeaderItem>
        )}
        <HeaderItem>
          <BsCart3 size={25} />
          <p style={{ marginLeft: '5px' }}>5</p>
        </HeaderItem>
      </HeaderItems>
    </HeaderContainer>
  )
}

export default Header
