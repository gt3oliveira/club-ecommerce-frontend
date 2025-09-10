import { useNavigate, useSearchParams } from 'react-router-dom'
import CustomButton from '../../components/custom-button/custom-button.component'
import {
  PaymentConfirmationContainer,
  PaymentConfirmationContent
} from './payment-confirmation.styles'
import { AiOutlineCheckCircle, AiOutlineHome } from 'react-icons/ai'
import { useContext, useEffect } from 'react'
import { UserContext } from '../../contexts/user.context'

const PaymentConfirmation = () => {
  const { isAuthenticated } = useContext(UserContext)
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
