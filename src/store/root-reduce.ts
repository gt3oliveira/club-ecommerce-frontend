import { combineReducers } from 'redux'
import { userReducer } from './reducers/user/user.reduce'

export const rootReducer = combineReducers({
  userReducer
})
