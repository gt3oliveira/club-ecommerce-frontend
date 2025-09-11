import { combineReducers } from 'redux'
import userReducer from './toolkit/user/user.slice'
import { cartReducer } from './reducers/cart/cart.reducer'
import { categoryReducer } from './reducers/category/category.reducer'

export const rootReducer = combineReducers({
  userReducer,
  cartReducer,
  categoryReducer
})
