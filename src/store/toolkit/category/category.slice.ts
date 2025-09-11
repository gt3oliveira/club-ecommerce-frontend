import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Category } from '../../../types/category.types'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../../../config/firebase.config'
import { categoryConverter } from '../../../converters/firestore.converters'

interface InitialState {
  categories: Category[]
  isLoading: boolean
}

const initialState: InitialState = {
  categories: [],
  isLoading: false
}

export const fetchCategories = createAsyncThunk(
  'categories/fetch',
  async () => {
    const categoriesData: Category[] = []
    const querySnapshot = await getDocs(
      collection(db, 'categories').withConverter(categoryConverter)
    )
    querySnapshot.docs.map((doc) => categoriesData.push(doc.data()))

    return categoriesData
  }
)

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload
        state.isLoading = false
      })
      .addCase(fetchCategories.rejected, (state) => {
        state.isLoading = false
      })
  }
})

export default categorySlice.reducer
