import { BsGoogle } from 'react-icons/bs'
import { FiLogIn } from 'react-icons/fi'
import CustomButton from '../../components/custom-button/custom-button.component'
import {
  LoginContainer,
  LoginContent,
  LoginHeadline,
  LoginInputContainer,
  LoginSubtitle
} from './login.styles'
import CustomInput from '../../components/custom-input/custom-input.component'

const LoginPage = () => {
  return (
    <LoginContainer>
      <LoginContent>
        <LoginHeadline>Entre com a sua conta</LoginHeadline>
        <CustomButton type="button" icon={<BsGoogle size={18} />}>
          Entrar com o Google
        </CustomButton>
        <LoginSubtitle>ou entre com o seu email</LoginSubtitle>
        <LoginInputContainer>
          <p>Email</p>
          <CustomInput placeholder="Digite seu email" type="email" />
        </LoginInputContainer>
        <LoginInputContainer>
          <p>Senha</p>
          <CustomInput placeholder="Digite sua senha" type="password" />
        </LoginInputContainer>
        <CustomButton type="submit" icon={<FiLogIn size={18} />}>
          Entrar
        </CustomButton>
      </LoginContent>
    </LoginContainer>
  )
}

export default LoginPage
