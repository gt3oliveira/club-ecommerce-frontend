import { render } from '@testing-library/react'
import CategoryItem from './category-item.component'
import { Category } from '../../types/category.types'
import { BrowserRouter } from 'react-router-dom'

describe('Category Item', () => {
  const category: Category = {
    id: '1',
    name: 'categoria_1',
    displayName: 'Categoria 1',
    products: [],
    imageUrl: 'image_url'
  }

  it('deve renderizar a categoria corretamente', () => {
    const { getByText } = render(
      <BrowserRouter>
        <CategoryItem category={category} />
      </BrowserRouter>
    )

    getByText('Categoria 1')
    getByText('Explorar')
  })
})
