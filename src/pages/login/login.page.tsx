import validator from 'validator'

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
import InputErrorMessage from '../../components/input-error-massage/input-error-massage.component'
import {
  AuthError,
  signInWithEmailAndPassword,
  signInWithPopup
} from 'firebase/auth'
import { auth, db, googleProvider } from '../../config/firebase.config'
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'

type LoginForm = {
  email: string
  password: string
}

const LoginPage = () => {
  const {
    handleSubmit,
    register,
    setError,
    formState: { errors }
  } = useForm<LoginForm>()

  const handleSubmitPress = async (data: LoginForm) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password)
    } catch (error) {
      const _error = error as AuthError

      if (_error.code === 'auth/invalid-login-credentials') {
        setError('email', {
          type: 'invalid-credentials'
        })
        setError('password', {
          type: 'invalid-credentials'
        })
      }
    }
  }

  const handleGoogleLoginPress = async () => {
    try {
      const userCredentials = await signInWithPopup(auth, googleProvider)

      const querySnapshot = await getDocs(
        query(
          collection(db, 'users'),
          where('id', '==', userCredentials.user.uid)
        )
      )

      const user = querySnapshot.docs[0]?.data()

      if (!user) {
        return await addDoc(collection(db, 'users'), {
          id: userCredentials.user.uid,
          firstName: userCredentials.user.displayName?.split(' ')[0],
          lastName: userCredentials.user.displayName?.split(' ')[1],
          email: userCredentials.user.email,
          provider: 'google'
        })
      }

      return null
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <LoginContainer>
      <LoginContent>
        <LoginHeadline>Entre com a sua conta</LoginHeadline>
        <CustomButton
          icon={<BsGoogle size={18} />}
          onClick={handleGoogleLoginPress}>
          Entrar com o Google
        </CustomButton>
        <LoginSubtitle>ou entre com o seu email</LoginSubtitle>
        <LoginInputContainer>
          <p>Email</p>
          <CustomInput
            hasError={!!errors?.email}
            placeholder="Digite seu email"
            type="email"
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
        </LoginInputContainer>
        <LoginInputContainer>
          <p>Senha</p>
          <CustomInput
            hasError={!!errors?.password}
            placeholder="Digite sua senha"
            type="password"
            {...register('password', { required: true, minLength: 1 })}
          />
          {errors?.password?.type === 'required' && (
            <InputErrorMessage>O senha é obrigatória.</InputErrorMessage>
          )}
        </LoginInputContainer>

        {(errors?.email?.type || errors?.password?.type) ===
          'invalid-credentials' && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              paddingBottom: '15px'
            }}>
            <InputErrorMessage>Email ou senha são inválidos.</InputErrorMessage>
          </div>
        )}

        <CustomButton
          onClick={handleSubmit(handleSubmitPress)}
          icon={<FiLogIn size={18} />}>
          Entrar
        </CustomButton>
      </LoginContent>
    </LoginContainer>
  )
}

export default LoginPage
