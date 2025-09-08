import { useContext, useEffect } from 'react'
import {
  CategoryContainer,
  CategoryTitle,
  ProductsContainer
} from './categories-overview.styles'
import { CategoryContext } from '../../contexts/category.context'
import LoadingPage from '../loading/loading.component'

const CategoriesOverview = () => {
  const { categories, isLoading, fetchCategories } = useContext(CategoryContext)

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <CategoryContainer>
      {isLoading && <LoadingPage />}
      <CategoryTitle>
        {categories.map((category) => category.displayName + ' ')}
      </CategoryTitle>
      <ProductsContainer>
        <div>Category</div>
      </ProductsContainer>
    </CategoryContainer>
  )
}

export default CategoriesOverview
