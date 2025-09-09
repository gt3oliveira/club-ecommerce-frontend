import { FunctionComponent, useEffect, useState } from 'react'
import { Category } from '../../types/category.types'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../config/firebase.config'
import { categoryConverter } from '../../converters/firestore.converters'
import {
  CategoryTitle,
  Container,
  IconContainer,
  ProductsContainer
} from './category-details.styles'
import LoadingPage from '../loading/loading.component'
import { BiChevronLeft } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'
import ProductItem from '../product-item/product-item.component'

interface CategoryDetailsProps {
  categoryId: string
}

const CategoryDetails: FunctionComponent<CategoryDetailsProps> = ({
  categoryId
}) => {
  const navigate = useNavigate()
  const [category, setCategory] = useState<Category | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const fetchCategory = async () => {
    try {
      setIsLoading(true)
      const querySnapshot = await getDocs(
        query(
          collection(db, 'categories').withConverter(categoryConverter),
          where('id', '==', categoryId)
        )
      )
      const categoryFromFirestore = querySnapshot.docs[0]?.data()

      setCategory(categoryFromFirestore)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleGoBack = () => {
    navigate('/')
  }

  useEffect(() => {
    fetchCategory()
  }, [])

  if (isLoading) {
    return <LoadingPage />
  }

  return (
    <Container>
      <CategoryTitle>
        <IconContainer onClick={handleGoBack}>
          <BiChevronLeft size={36} />
        </IconContainer>
        <p>Explorar {category?.displayName}</p>
      </CategoryTitle>
      <ProductsContainer>
        {category?.products.map((product) => (
          <ProductItem product={product} key={product.id} />
        ))}
      </ProductsContainer>
    </Container>
  )
}

export default CategoryDetails
