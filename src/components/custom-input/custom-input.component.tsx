import React, { FunctionComponent, InputHTMLAttributes } from 'react'
import { CustomInputContainer } from './custom-input.styles'

interface CustomInputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean
}

const CustomInput: FunctionComponent<CustomInputProps> = React.forwardRef(
  (props, ref) => <CustomInputContainer ref={ref as any} {...props} />
)

CustomInput.displayName = 'CustomInput'

export default CustomInput
