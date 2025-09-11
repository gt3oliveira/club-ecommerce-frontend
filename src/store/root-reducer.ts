import { combineReducers } from 'redux'
import userReducer from './toolkit/user/user.slice'
import cartReducer from './toolkit/cart/cart.slice'
import categoryReducer from './toolkit/category/category.slice'

export const rootReducer = combineReducers({
  userReducer,
  cartReducer,
  categoryReducer
})
