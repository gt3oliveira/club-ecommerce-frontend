import { FunctionComponent, useContext, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import HomePage from './pages/home/home.page'
import LoginPage from './pages/login/login.page'
import Header from './components/header/header.component'
import SignupPage from './pages/sign-up/sign-up.page'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from './config/firebase.config'
import { UserContext } from './contexts/user.context'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { userConverter } from './converters/firestore.converters'

const App: FunctionComponent = () => {
  const { isAuthenticated, loginUser, logoutUser } = useContext(UserContext)
  const [isInitializing, setInitializing] = useState(true)

  onAuthStateChanged(auth, async (user) => {
    const isSigningOut = isAuthenticated && !user
    if (isSigningOut) {
      logoutUser()
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
      loginUser(userFirestore)
      return setInitializing(false)
    }
    return setInitializing(false)
  })

  if (isInitializing) {
    return null
  }

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
