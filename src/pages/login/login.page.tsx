import { useForm } from 'react-hook-form'
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
  const {
    handleSubmit,
    register,
    formState: { errors }
  } = useForm()

  const handleSubmitPress = (data: any) => {
    console.log(data)
  }

  return (
    <LoginContainer>
      <LoginContent>
        <LoginHeadline>Entre com a sua conta</LoginHeadline>
        <CustomButton icon={<BsGoogle size={18} />}>
          Entrar com o Google
        </CustomButton>
        <LoginSubtitle>ou entre com o seu email</LoginSubtitle>
        <LoginInputContainer>
          <p>Email</p>
          <CustomInput
            hasError={!!errors?.email}
            placeholder="Digite seu email"
            type="email"
            {...register('email', { required: true, minLength: 1 })}
          />
        </LoginInputContainer>
        <LoginInputContainer>
          <p>Senha</p>
          <CustomInput
            hasError={!!errors?.password}
            placeholder="Digite sua senha"
            type="password"
            {...register('password', { required: true, minLength: 1 })}
          />
        </LoginInputContainer>
        <CustomButton
          onClick={() => handleSubmit(handleSubmitPress)()}
          icon={<FiLogIn size={18} />}>
          Entrar
        </CustomButton>
      </LoginContent>
    </LoginContainer>
  )
}

export default LoginPage
