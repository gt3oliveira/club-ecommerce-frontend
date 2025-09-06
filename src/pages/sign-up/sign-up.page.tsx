import { useForm } from 'react-hook-form'
import validator from 'validator'
import { FiLogIn } from 'react-icons/fi'
import { BiLoaderCircle } from 'react-icons/bi'
import CustomButton from '../../components/custom-button/custom-button.component'
import CustomInput from '../../components/custom-input/custom-input.component'
import {
  SignUpContainer,
  SignUpContent,
  SignUpHeadline,
  SignUpInputContainer
} from './sign-up.styles'
import InputErrorMessage from '../../components/input-error-massage/input-error-massage.component'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { auth, db } from '../../config/firebase.config'
import { addDoc, collection } from 'firebase/firestore'
import { useState } from 'react'

type SignupForm = {
  firstName: string
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

  const [isLoading, setIsLoading] = useState(false)
  const watchPassword = watch('password')

  const handleSubmitPress = async (data: SignupForm) => {
    try {
      setIsLoading(true)
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      )
      await addDoc(collection(db, 'users'), {
        id: userCredentials.user.uid,
        firstName: data.firstName,
        lastName: data.lastName,
        email: userCredentials.user.email
      })
    } catch (error) {
      console.log({ error })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <SignUpContainer>
      <SignUpContent>
        <SignUpHeadline>Crie sua conta</SignUpHeadline>

        <SignUpInputContainer>
          <p>Nome</p>
          <CustomInput
            placeholder="Digite seu nome"
            hasError={!!errors?.firstName}
            {...register('firstName', {
              required: true
            })}
          />
          {errors?.firstName?.type === 'required' && (
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
              required: true,
              validate: (value) => value.length >= 6
            })}
          />
          {errors?.password?.type === 'validate' && (
            <InputErrorMessage>
              A senha deve ter no mínimo 6 caracteres.
            </InputErrorMessage>
          )}
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
          icon={
            isLoading ? <BiLoaderCircle size={18} /> : <FiLogIn size={18} />
          }
          disabled={isLoading}>
          Criar Conta
        </CustomButton>
      </SignUpContent>
    </SignUpContainer>
  )
}

export default SignupPage
