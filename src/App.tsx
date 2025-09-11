import { FunctionComponent, useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/home/home.page'
import LoginPage from './pages/login/login.page'
import Header from './components/header/header.component'
import SignupPage from './pages/sign-up/sign-up.page'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from './config/firebase.config'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { userConverter } from './converters/firestore.converters'
import LoadingPage from './components/loading/loading.component'
import ExplorerPage from './pages/explorer/explorer.page'
import CategoryDetailsPage from './pages/category-details/category-details.page'
import Cart from './components/cart/cart.component'
import Checkout from './components/checkout/checkout.component'
import PaymentConfirmation from './pages/payment-confirmation/payment-confirmation.page'
import { useDispatch } from 'react-redux'
import { loginUser, logoutUser } from './store/toolkit/user/user.slice'
import { useAppSelector } from './hooks/redux.hooks'

const App: FunctionComponent = () => {
  const { isAuthenticated } = useAppSelector(
    (rootReducer) => rootReducer.userReducer
  )
  const dispatch = useDispatch()
  const [isInitializing, setInitializing] = useState(true)

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      const isSigningOut = isAuthenticated && !user
      if (isSigningOut) {
        dispatch(logoutUser())
        return setInitializing(false)
      }

      const isSigningIn = !isAuthenticated && user
      if (isSigningIn) {
        const querySnapshot = await getDocs(
          query(
            collection(db, 'users').withConverter(userConverter),
            where('id', '==', user.uid)
          )
        )

        const userFirestore = querySnapshot.docs[0]?.data()
        dispatch(loginUser(userFirestore))
        return setInitializing(false)
      }
      return setInitializing(false)
    })
  }, [dispatch])

  if (isInitializing) {
    return <LoadingPage />
  }

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route path="/explore" element={<ExplorerPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/payment-confirmation" element={<PaymentConfirmation />} />
        <Route path="/category/:id" element={<CategoryDetailsPage />} />
      </Routes>
      <Cart />
    </BrowserRouter>
  )
}

export default App
