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
import {
  AuthError,
  AuthErrorCodes,
  createUserWithEmailAndPassword
} from 'firebase/auth'
import { auth, db } from '../../config/firebase.config'
import { addDoc, collection } from 'firebase/firestore'
import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../../contexts/user.context'
import { useNavigate } from 'react-router-dom'
import LoadingPage from '../../components/loading/loading.component'

type SignupForm = {
  firstName: string
  lastName: string
  email: string
  password: string
  confirmPassword: string
}

const SignupPage = () => {
  const { isAuthenticated } = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated])

  const {
    handleSubmit,
    register,
    watch,
    setError,
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
        email: userCredentials.user.email,
        provider: 'firebase'
      })
    } catch (error) {
      const _error = error as AuthError

      if (_error.code === AuthErrorCodes.EMAIL_EXISTS) {
        return setError('email', {
          type: 'email-exists',
          message: 'Este e-mail já está cadastrado.'
        })
      }

      if (_error.code === AuthErrorCodes.WEAK_PASSWORD) {
        return setError('password', {
          type: 'weak-password',
          message: 'A senha deve ter no mínimo 6 caracteres.'
        })
      }

      console.log({ error })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <SignUpContainer>
      {isLoading && <LoadingPage />}

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
          {errors?.email?.type === 'email-exists' && (
            <InputErrorMessage>{errors.email.message}</InputErrorMessage>
          )}
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
          {errors?.password?.type === 'weak-password' && (
            <InputErrorMessage>{errors.password.message}</InputErrorMessage>
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
          icon={<FiLogIn size={18} />}>
          Criar Conta
        </CustomButton>
      </SignUpContent>
    </SignUpContainer>
  )
}

export default SignupPage
