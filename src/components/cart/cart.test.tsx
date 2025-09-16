import userEvent from '@testing-library/user-event'
import { renderWithRedux } from '../../helpers/test.helpers'
import Cart from './cart.component'

describe('Cart', () => {
  it('teste de visualização: exibir produtos do carrinho', () => {
    const { getByText } = renderWithRedux(<Cart />, {
      preloadedState: {
        cartReducer: {
          isVisible: true,
          products: [
            {
              id: '1',
              name: 'produto 1',
              price: 500,
              quantity: 2,
              imageUrl: 'image_url'
            }
          ]
        }
      } as any
    })

    getByText('produto 1')
    getByText('R$ 500,00')
    getByText('2')
    getByText('R$ 1.000,00')
    getByText('Ir para o Checkout')
  })

  it('teste de visibilidade: esconder botão de checkout e exibir messagem de carrinho vazio', () => {
    const { getByText, queryByText } = renderWithRedux(<Cart />, {
      preloadedState: {
        cartReducer: {
          isVisible: true,
          products: []
        }
      } as any
    })

    getByText('Seu carrinho está vazio!')
    expect(queryByText('Ir para o Checkout')).toBeNull()
  })

  it('teste de interação: adicionar ou diminuir quantidade de produto', () => {
    const { getByLabelText, getByText } = renderWithRedux(<Cart />, {
      preloadedState: {
        cartReducer: {
          isVisible: true,
          products: [
            {
              id: '1',
              name: 'produto 1',
              price: 500,
              quantity: 2,
              imageUrl: 'image_url'
            }
          ]
        }
      } as any
    })

    const decreaseButton = getByLabelText('decrementar quantidade produto 1')
    const increaseButton = getByLabelText('incrementar quantidade produto 1')

    userEvent.click(increaseButton)
    getByText('3')
    getByText('R$ 1.500,00')

    userEvent.click(decreaseButton)
    getByText('2')
    getByText('R$ 1.000,00')
  })

  it('teste de interação: remover de produto', () => {
    const { getByLabelText, getByText, queryByText } = renderWithRedux(
      <Cart />,
      {
        preloadedState: {
          cartReducer: {
            isVisible: true,
            products: [
              {
                id: '1',
                name: 'produto 1',
                price: 500,
                quantity: 2,
                imageUrl: 'image_url'
              }
            ]
          }
        } as any
      }
    )

    const removeButton = getByLabelText('remover produto 1')

    userEvent.click(removeButton)
    expect(queryByText('produto 1')).toBeNull()
    getByText('Seu carrinho está vazio!')
  })
})
