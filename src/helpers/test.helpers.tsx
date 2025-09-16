import { configureStore } from '@reduxjs/toolkit'
import React from 'react'
import { rootReducer } from '../store/root-reducer'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { render } from '@testing-library/react'
import { RootState } from '../store/store'

export const renderWithRedux = (
  component: React.ReactElement,
  {
    preloadedState,
    store = configureStore({
      reducer: rootReducer,
      preloadedState
    }),
    ...renderOptions
  }: {
    preloadedState: RootState
    store?: ReturnType<typeof configureStore>
  }
) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return (
      <BrowserRouter>
        <Provider store={store}>{children}</Provider>
      </BrowserRouter>
    )
  }

  return render(component, { wrapper: Wrapper, ...renderOptions })
}
