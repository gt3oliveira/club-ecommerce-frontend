import { FunctionComponent } from 'react'
import { InputErrorMessageContainer } from './input-error-massage.styles'

const InputErrorMessage: FunctionComponent = ({ children }) => {
  return <InputErrorMessageContainer>{children}</InputErrorMessageContainer>
}

export default InputErrorMessage
