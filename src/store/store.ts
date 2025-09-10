import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import { rootReducer } from './root-reduce'

export const store = createStore(rootReducer, applyMiddleware(logger))

export type RootState = ReturnType<typeof store.getState>
