import React, { ButtonHTMLAttributes, FunctionComponent } from 'react'
import { CustomButtonContainer, IconContainer } from './custom-button.styles'

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode
}

const CustomButton: FunctionComponent<CustomButtonProps> = ({
  children,
  icon,
  ...rest
}) => {
  return (
    <CustomButtonContainer {...rest}>
      {icon && <IconContainer>{icon}</IconContainer>}
      {children}
    </CustomButtonContainer>
  )
}

export default CustomButton
