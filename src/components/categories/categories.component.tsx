import { useEffect, useState } from 'react'
// import axios from 'axios'
import { CategoriesMock, Category } from '../../types/category.types'
import CategoryItem from '../category-item/category-item.component'
import { CategoriesContainer, CategoriesContent } from './categories.styles'
// import { env } from '../../config/env.config'

const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([])

  //   const fetchCategories = async () => {
  //     try {
  //       const { data } = await axios.get(`${env.apiUrl}/api/category`)
  //       setCategories(data)
  //     } catch (error) {
  //       console.log({ error })
  //     }
  //   }

  useEffect(() => {
    setCategories(CategoriesMock)
    //   fetchCategories()
  }, [])

  return (
    <CategoriesContainer>
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
