import { render } from '@testing-library/react'
import CustomInput from './custom-input.component'
import Colors from '../../theme/theme.colors'

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
})
