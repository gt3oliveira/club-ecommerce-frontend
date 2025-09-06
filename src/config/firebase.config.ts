import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyDqpO_ya-H8lv7D9E3lnpl4E87p34tcP1Q',
  authDomain: 'club-ecommerce-a2a6b.firebaseapp.com',
  projectId: 'club-ecommerce-a2a6b',
  storageBucket: 'club-ecommerce-a2a6b.firebasestorage.app',
  messagingSenderId: '506973571635',
  appId: '1:506973571635:web:927f22f4d4436b58d1f146'
}

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const auth = getAuth(app)
