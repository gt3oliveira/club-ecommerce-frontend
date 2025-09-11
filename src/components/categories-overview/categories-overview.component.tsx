import { FunctionComponent, useEffect } from 'react'
import LoadingPage from '../loading/loading.component'
import { Container } from './categories-overview.styles'
import CategoryOverview from '../category-overview/category-overview.component'
import { useNavigate } from 'react-router-dom'
import { useAppSelector } from '../../hooks/redux.hooks'
import { useDispatch } from 'react-redux'
import { fetchCategories } from '../../store/toolkit/category/category.slice'

const CategoriesOverview: FunctionComponent = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { isAuthenticated } = useAppSelector(
    (rootReducer) => rootReducer.userReducer
  )

  const { categories, isLoading } = useAppSelector(
    (rootReducer) => rootReducer.categoryReducer
  )

  useEffect(() => {
    if (!isAuthenticated) navigate('/login')
  }, [])

  useEffect(() => {
    dispatch(fetchCategories() as any)
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
