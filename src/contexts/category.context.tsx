import { createContext, FunctionComponent, useState } from 'react'
import { Category } from '../types/category.types'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../config/firebase.config'
import { categoryConverter } from '../converters/firestore.converters'

interface ICategoryContext {
  categories: Category[]
  isLoading: boolean
  fetchCategories: () => Promise<void>
}

export const CategoryContext = createContext<ICategoryContext>({
  categories: [],
  isLoading: false,
  fetchCategories: async () => {}
})

export const CategoryContextProvider: FunctionComponent = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchCategories = async () => {
    try {
      setIsLoading(true)
      const categoriesData: Category[] = []
      const querySnapshot = await getDocs(
        collection(db, 'categories').withConverter(categoryConverter)
      )
      querySnapshot.docs.map((doc) => categoriesData.push(doc.data()))
      setCategories(categoriesData)
    } catch (error) {
      console.log({ error })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <CategoryContext.Provider
      value={{
        categories,
        fetchCategories,
        isLoading
      }}>
      {children}
    </CategoryContext.Provider>
  )
}
