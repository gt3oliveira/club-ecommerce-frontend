import { FunctionComponent, useContext, useEffect } from 'react'
import { CategoryContext } from '../../contexts/category.context'
import LoadingPage from '../loading/loading.component'
import { Container } from './categories-overview.styles'
import CategoryOverview from '../category-overview/category-overview.component'

const CategoriesOverview: FunctionComponent = () => {
  const { categories, isLoading, fetchCategories } = useContext(CategoryContext)

  useEffect(() => {
    fetchCategories()
  }, [])

  if (isLoading) {
    return <LoadingPage />
  }

  return (
    <Container>
      {categories.map((category) => (
        <CategoryOverview key={category.id} category={category} />
      ))}
    </Container>
  )
}

export default CategoriesOverview
