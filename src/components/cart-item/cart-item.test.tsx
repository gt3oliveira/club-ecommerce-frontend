import { renderWithRedux } from '../../helpers/test.helpers'
import { CartProduct } from '../../types/cart.types'
import CartItem from './cart-item.component'

describe('Cart Item', () => {
  const product: CartProduct = {
    id: '1',
    name: 'produto 1',
    price: 500,
    quantity: 2,
    imageUrl: 'image_url'
  }

  it('teste de visibilidade: exibir informações do produto', () => {
    const { getByText, getByLabelText } = renderWithRedux(
      <CartItem
        cartProduct={product}
        decrementProductQuantity={() => {}}
        incrementProductQuantity={() => {}}
        removeProductToCart={() => {}}
      />,
      {}
    )

    getByText('produto 1')
    getByText('R$ 500,00')
    getByText('2')

    getByLabelText('decrementar quantidade produto 1')
    getByLabelText('incrementar quantidade produto 1')
    getByLabelText('remover produto 1')
  })
})
