import { render } from '@testing-library/react'
import CustomInput from './custom-input.component'
import Colors from '../../theme/theme.colors'
import userEvent from '@testing-library/user-event'

describe('Custom Input', () => {
  it('error if hasError is true', () => {
    const { getByPlaceholderText } = render(
      <CustomInput placeholder="Test input" hasError={true} />
    )

    getByPlaceholderText('Test input')
    const input = getByPlaceholderText('Test input')
    expect(input).toHaveStyle({
      border: `2px solid ${Colors.error}`
    })
  })

  it('not error if hasError is false', () => {
    const { getByPlaceholderText } = render(
      <CustomInput placeholder="Test input" hasError={false} />
    )

    getByPlaceholderText('Test input')
    const input = getByPlaceholderText('Test input')
    expect(input).toHaveStyle({
      border: 'none'
    })
  })

  it('change value when user types', () => {
    const { getByPlaceholderText, getByDisplayValue } = render(
      <CustomInput placeholder="Test input" hasError={false} />
    )

    const input = getByPlaceholderText('Test input')
    userEvent.type(input, 'username')
    getByDisplayValue('username')
  })
})
