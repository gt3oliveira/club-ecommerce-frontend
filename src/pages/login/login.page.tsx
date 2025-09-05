import {
  LoginContainer,
  LoginContent,
  LoginHeadline,
  LoginInputContainer,
  LoginSubtitle
} from './login.styles'

const LoginPage = () => {
  return (
    <LoginContainer>
      <LoginContent>
        <LoginHeadline>Entre com a sua conta</LoginHeadline>
        <button>google</button>
        <LoginSubtitle>ou entre com o seu email</LoginSubtitle>
        <LoginInputContainer></LoginInputContainer>
        <LoginInputContainer></LoginInputContainer>
      </LoginContent>
    </LoginContainer>
  )
}

export default LoginPage
