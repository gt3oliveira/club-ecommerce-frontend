import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CategoriesPage from '../../components/categories/categories.component'
import { useAppSelector } from '../../hooks/redux.hooks'

const HomePage = () => {
  const { isAuthenticated } = useAppSelector(
    (rootReducer) => rootReducer.userReducer
  )
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated])

  return <CategoriesPage />
}

export default HomePage
