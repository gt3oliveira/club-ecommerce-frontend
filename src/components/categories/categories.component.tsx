import { useEffect } from 'react'
import { CategoriesContainer, CategoriesContent } from './categories.styles'
import LoadingPage from '../loading/loading.component'
import CategoryItem from '../category-item/category-item.component'
import { useDispatch } from 'react-redux'
import { fetchCategories } from '../../store/reducers/category/category.actions'
import { useAppSelector } from '../../hooks/redux.hooks'

const CategoriesPage = () => {
  const dispatch = useDispatch()
  const { categories, isLoading } = useAppSelector(
    (rootReducer) => rootReducer.categoryReducer
  )

  useEffect(() => {
    dispatch(fetchCategories() as any)
  }, [])

  return (
    <CategoriesContainer>
      {isLoading && <LoadingPage />}
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
