import * as firestore from 'firebase/firestore'
import { renderWithRedux } from '../../helpers/test.helpers'
import CategoriesPage from './categories.component'

jest.mock('firebase/firestore')

describe('Categories', () => {
  it('teste de requisição: exibir categorias', async () => {
    const mockedFirestore = firestore as any

    mockedFirestore.getDocs.mockReturnValue([
      {
        data() {
          return {
            id: '1',
            displayName: 'category 1'
          }
        }
      }
    ])

    mockedFirestore.collection.mockReturnValue({
      withConverter: () => {}
    })

    const { getByText, findByText } = renderWithRedux(<CategoriesPage />, {})

    getByText('Explorar')
    await findByText('category 1')
  })
})
