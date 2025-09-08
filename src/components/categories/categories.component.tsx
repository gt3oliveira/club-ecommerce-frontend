import { useContext, useEffect } from 'react'
import { CategoryContext } from '../../contexts/category.context'
import { CategoriesContainer, CategoriesContent } from './categories.styles'
import LoadingPage from '../loading/loading.component'
import CategoryItem from '../category-item/category-item.component'

const CategoriesPage = () => {
  const { categories, fetchCategories, isLoading } = useContext(CategoryContext)

  useEffect(() => {
    fetchCategories()
  }, [])

  return (
    <CategoriesContainer>
      {isLoading && <LoadingPage />}
      <CategoriesContent>
        {categories.map((category) => (
          <div key={category.id}>
            <CategoryItem category={category} />
          </div>
        ))}
      </CategoriesContent>
    </CategoriesContainer>
  )
}

export default CategoriesPage
