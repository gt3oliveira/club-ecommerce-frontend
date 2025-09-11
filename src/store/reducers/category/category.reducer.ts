import { Category } from '../../../types/category.types'
import { CategoryActionTypes } from './category.action-types'
import { CategoryActions } from './category.actions'

interface InitialState {
  categories: Category[]
  isLoading: boolean
}

const initialState: InitialState = {
  categories: [],
  isLoading: false
}

export const categoryReducer = (
  state = initialState,
  action: CategoryActions
) => {
  switch (action.type) {
    case CategoryActionTypes.FETCH_CATEGORIES_START:
      return {
        ...state,
        isLoading: true
      }

    case CategoryActionTypes.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload,
        isLoading: false
      }

    case CategoryActionTypes.FETCH_CATEGORIES_FAILURE:
      return {
        ...state,
        isLoading: false
      }

    default:
      return state
  }
}
