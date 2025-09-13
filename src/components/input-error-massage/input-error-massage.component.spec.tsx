import { render } from '@testing-library/react'
import InputErrorMessage from './input-error-massage.component'
import Colors from '../../theme/theme.colors'

describe('Input Error Message', () => {
  it('should render with correct children', () => {
    const { getByText } = render(<InputErrorMessage>Test</InputErrorMessage>)

    const input = getByText('Test')
    expect(input).toHaveStyle({
      color: Colors.error
    })
  })
})
