import { Dispatch } from 'redux'
import { Category } from '../../../types/category.types'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../../config/firebase.config'
import { categoryConverter } from '../../../converters/firestore.converters'
import { CategoryActionTypes } from './category.action-types'

export const fetchCategories = () => {
  return async (dispatch: Dispatch) => {
    dispatch({ type: CategoryActionTypes.FETCH_CATEGORIES_START })

    try {
      const categoriesData: Category[] = []
      const querySnapshot = await getDocs(
        collection(db, 'categories').withConverter(categoryConverter)
      )
      querySnapshot.docs.map((doc) => categoriesData.push(doc.data()))

      dispatch({
        type: CategoryActionTypes.FETCH_CATEGORIES_SUCCESS,
        payload: categoriesData
      })
    } catch (error) {
      console.log(error)
      dispatch({ type: CategoryActionTypes.FETCH_CATEGORIES_FAILURE })
    }
  }
}

interface CategoriesStartAction {
  type: typeof CategoryActionTypes.FETCH_CATEGORIES_START
}

export const categoriesStartAction = (): CategoriesStartAction => ({
  type: CategoryActionTypes.FETCH_CATEGORIES_START
})

interface CategoriesSuccessAction {
  type: typeof CategoryActionTypes.FETCH_CATEGORIES_SUCCESS
  payload: Category[]
}

export const categoriesSuccessAction = (): CategoriesSuccessAction => ({
  type: CategoryActionTypes.FETCH_CATEGORIES_SUCCESS,
  payload: []
})

interface CategoriesFailureAction {
  type: typeof CategoryActionTypes.FETCH_CATEGORIES_FAILURE
}

export const categoriesFailureAction = (): CategoriesFailureAction => ({
  type: CategoryActionTypes.FETCH_CATEGORIES_FAILURE
})

export type CategoryActions =
  | CategoriesStartAction
  | CategoriesSuccessAction
  | CategoriesFailureAction
