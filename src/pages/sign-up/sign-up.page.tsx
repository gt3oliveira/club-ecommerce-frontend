import { useForm } from 'react-hook-form'
import validator from 'validator'
import { FiLogIn } from 'react-icons/fi'
import CustomButton from '../../components/custom-button/custom-button.component'
import CustomInput from '../../components/custom-input/custom-input.component'
import {
  SignUpContainer,
  SignUpContent,
  SignUpHeadline,
  SignUpInputContainer
} from './sign-up.styles'
import InputErrorMessage from '../../components/input-error-massage/input-error-massage.component'

type SignupForm = {
  name: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

const SignupPage = () => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors }
  } = useForm<SignupForm>()

  const watchPassword = watch('password')

  const handleSubmitPress = (data: any) => {
    console.log(data)
  }

  return (
    <SignUpContainer>
      <SignUpContent>
        <SignUpHeadline>Crie sua conta</SignUpHeadline>

        <SignUpInputContainer>
          <p>Nome</p>
          <CustomInput
            placeholder="Digite seu nome"
            hasError={!!errors?.name}
            {...register('name', {
              required: true
            })}
          />
          {errors?.name?.type === 'required' && (
            <InputErrorMessage>O nome é obrigatória.</InputErrorMessage>
          )}
        </SignUpInputContainer>
        <SignUpInputContainer>
          <p>Sobrenome</p>
          <CustomInput
            placeholder="Digite seu sobrenome"
            hasError={!!errors?.lastName}
            {...register('lastName', {
              required: true
            })}
          />
          {errors?.lastName?.type === 'required' && (
            <InputErrorMessage>O sobrenome é obrigatória.</InputErrorMessage>
          )}
        </SignUpInputContainer>
        <SignUpInputContainer>
          <p>Email</p>
          <CustomInput
            placeholder="Digite seu email"
            hasError={!!errors?.email}
            {...register('email', {
              required: true,
              validate: (value) => validator.isEmail(value)
            })}
          />
          {errors?.email?.type === 'validate' && (
            <InputErrorMessage>Digite um email válido.</InputErrorMessage>
          )}
          {errors?.email?.type === 'required' && (
            <InputErrorMessage>O email é obrigatório.</InputErrorMessage>
          )}
        </SignUpInputContainer>
        <SignUpInputContainer>
          <p>Senha</p>
          <CustomInput
            type="password"
            placeholder="Digite sua senha"
            hasError={!!errors?.password}
            {...register('password', {
              required: true
            })}
          />
          {errors?.password?.type === 'required' && (
            <InputErrorMessage>A senha é obrigatória.</InputErrorMessage>
          )}
        </SignUpInputContainer>
        <SignUpInputContainer>
          <p>Confirmar Senha</p>
          <CustomInput
            type="password"
            placeholder="Digite novamente a sua senha"
            hasError={!!errors?.confirmPassword}
            {...register('confirmPassword', {
              required: true,
              validate: (value) => value === watchPassword
            })}
          />
          {errors?.confirmPassword?.type === 'validate' && (
            <InputErrorMessage>
              As senhas devem ser iguais. Digite novamente.
            </InputErrorMessage>
          )}
          {errors?.confirmPassword?.type === 'required' && (
            <InputErrorMessage>
              A confirmação da senha é obrigatória.
            </InputErrorMessage>
          )}
        </SignUpInputContainer>

        <CustomButton
          onClick={handleSubmit(handleSubmitPress)}
          icon={<FiLogIn size={18} />}>
          Criar Conta
        </CustomButton>
      </SignUpContent>
    </SignUpContainer>
  )
}

export default SignupPage
