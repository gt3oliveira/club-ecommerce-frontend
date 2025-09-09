import { useParams } from 'react-router-dom'
import CategoryDetails from '../../components/category-details/category-details.component'

const CategoryDetailsPage = () => {
  const { id: categoryId } = useParams()

  if (!categoryId) return null

  return <CategoryDetails categoryId={categoryId} />
}

export default CategoryDetailsPage
