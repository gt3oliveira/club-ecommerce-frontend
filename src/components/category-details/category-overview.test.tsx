import { renderWithRedux } from '../../helpers/test.helpers'
import CategoryOverview from '../category-overview/category-overview.component'

describe('Category Overview', () => {
  it('teste de visibilidade: exibir produtos da categoria', () => {
    const products = [
      {
        id: '1',
        name: 'produto 1',
        price: 100,
        quantity: 2,
        imageUrl: 'image_url'
      },
      {
        id: '2',
        name: 'produto 2',
        price: 200,
        quantity: 2,
        imageUrl: 'image_url'
      },
      {
        id: '3',
        name: 'produto 3',
        price: 300,
        quantity: 2,
        imageUrl: 'image_url'
      },
      {
        id: '4',
        name: 'produto 4',
        price: 400,
        quantity: 2,
        imageUrl: 'image_url'
      },
      {
        id: '5',
        name: 'produto 5',
        price: 500,
        quantity: 2,
        imageUrl: 'image_url'
      }
    ]
    const category = {
      id: '1',
      name: 'categoria_1',
      displayName: 'Categoria 1',
      products,
      imageUrl: 'image_url'
    }
    const { getByText, queryByText } = renderWithRedux(
      <CategoryOverview category={category} />,
      {}
    )

    getByText('Categoria 1')
    getByText('produto 1')
    getByText('R$ 100,00')
    getByText('produto 2')
    getByText('R$ 200,00')
    getByText('produto 3')
    getByText('R$ 300,00')
    getByText('produto 4')
    getByText('R$ 400,00')
    expect(queryByText('produto 5')).toBeNull()
  })
})
