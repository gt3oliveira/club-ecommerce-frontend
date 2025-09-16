import { renderWithRedux } from '../../helpers/test.helpers'
import Checkout from './checkout.component'

describe('Checkout', () => {
  it('teste de visualização: exibir produtos do carrinho e o preço total', () => {
    const { getByText } = renderWithRedux(<Checkout />, {
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
            },
            {
              id: '2',
              name: 'produto 2',
              price: 200,
              quantity: 2,
              imageUrl: 'image_url'
            }
          ]
        }
      } as any
    })

    getByText('Total R$ 700,00')
    getByText('Finalizar Compra')
    getByText('Checkout')
  })
})
