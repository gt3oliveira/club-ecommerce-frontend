import Header from './header.component'
import { renderWithRedux } from '../../helpers/test.helpers'

describe('Header', () => {
  it('teste de autenticação: botão de signout visivel', () => {
    const { getByText } = renderWithRedux(<Header />, {
      preloadedState: {
        userReducer: {
          isAuthenticated: true
        }
      } as any
    })

    getByText(/sair/i)
    getByText(/explorar/i)
  })

  it('teste de não autenticação: botão de login e signup visivel', () => {
    const { getByText } = renderWithRedux(<Header />, {
      preloadedState: {
        userReducer: {
          isAuthenticated: false
        }
      } as any
    })

    getByText(/login/i)
    getByText(/criar conta/i)
  })
})
