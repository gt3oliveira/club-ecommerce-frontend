import { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CategoriesPage from '../../components/categories/categories.component'
import { UserContext } from '../../contexts/user.context'

const HomePage = () => {
  const { isAuthenticated } = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login')
    }
  }, [isAuthenticated])

  return <CategoriesPage />
}

export default HomePage
