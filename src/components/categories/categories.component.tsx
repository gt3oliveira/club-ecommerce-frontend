import { useEffect, useState } from 'react'
// import axios from 'axios'
import { CategoriesMock, Category } from '../../types/category.types'
import './categories.styles.css'
import CategoryItem from '../category-item/category-item.component'
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
    <div className="category-container">
      <div className="category-content">
        {categories.map((category) => (
          <div key={category.id}>
            <CategoryItem category={category} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default CategoriesPage
