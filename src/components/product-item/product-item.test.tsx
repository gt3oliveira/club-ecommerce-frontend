import ProductItem from './product-item.component'
import { renderWithRedux } from '../../helpers/test.helpers'

describe('Product Item', () => {
  const product = {
    id: '1',
    name: 'produto 1',
    price: 500,
    quantity: 2,
    imageUrl: 'image_url'
  }
  it('teste de visibilidade: deve renderizar o produto corretamente', () => {
    const { getByText } = renderWithRedux(<ProductItem product={product} />, {})

    getByText('produto 1')
    getByText('R$ 500,00')
    getByText(/adicionar ao carrinho/i)
  })
})
