import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CategoriesPage from '../../components/categories/categories.component'
import { useSelector } from 'react-redux'

const HomePage = () => {
  const { isAuthenticated } = useSelector(
    (rootReducer: any) => rootReducer.userReducer
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
