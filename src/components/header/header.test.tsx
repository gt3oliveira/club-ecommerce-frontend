import Header from './header.component'
import { renderWithRedux } from '../../helpers/test.helpers'
import { CartProduct } from '../../types/cart.types'

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

  it('teste de contagem de produtos o carrinho', () => {
    const products: CartProduct[] = [
      {
        id: '1',
        name: 'Boné',
        price: 80,
        quantity: 10,
        imageUrl: 'image_url'
      },
      {
        id: '2',
        name: 'Jaqueta',
        price: 100,
        quantity: 12,
        imageUrl: 'image_url'
      }
    ]

    const { getByText } = renderWithRedux(<Header />, {
      preloadedState: {
        userReducer: {
          isAuthenticated: true
        },
        cartReducer: {
          products
        }
      } as any
    })

    getByText('22')
  })
})
