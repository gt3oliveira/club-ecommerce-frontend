import { useNavigate, useSearchParams } from 'react-router-dom'
import CustomButton from '../../components/custom-button/custom-button.component'
import {
  PaymentConfirmationContainer,
  PaymentConfirmationContent
} from './payment-confirmation.styles'
import { AiOutlineCheckCircle, AiOutlineHome } from 'react-icons/ai'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const PaymentConfirmation = () => {
  const { isAuthenticated } = useSelector(
    (rootReducer: any) => rootReducer.userReducer
  )
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()

  const success = searchParams.get('success')
  if (!success) navigate('/')

  const handleGoToHomePage = () => {
    navigate('/')
  }

  useEffect(() => {
    if (!isAuthenticated) navigate('/login')
  }, [])

  return (
    <PaymentConfirmationContainer>
      <PaymentConfirmationContent>
        <AiOutlineCheckCircle size={100} color="green" />
        <p>Seu pagamento foi realizado com sucesso!</p>
        <CustomButton
          icon={<AiOutlineHome size={18} />}
          onClick={handleGoToHomePage}>
          Voltar para a página inicial
        </CustomButton>
      </PaymentConfirmationContent>
    </PaymentConfirmationContainer>
  )
}

export default PaymentConfirmation
