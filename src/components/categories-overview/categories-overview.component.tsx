import { FunctionComponent, useContext, useEffect } from 'react'
import { CategoryContext } from '../../contexts/category.context'
import LoadingPage from '../loading/loading.component'
import { Container } from './categories-overview.styles'
import CategoryOverview from '../category-overview/category-overview.component'
import { UserContext } from '../../contexts/user.context'
import { useNavigate } from 'react-router-dom'

const CategoriesOverview: FunctionComponent = () => {
  const { isAuthenticated } = useContext(UserContext)
  const navigate = useNavigate()
  const { categories, isLoading, fetchCategories } = useContext(CategoryContext)

  useEffect(() => {
    if (!isAuthenticated) navigate('/login')
  }, [])

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
