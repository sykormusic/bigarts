import { BASE_API } from '@/utils/api'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  categories: []
}

export const getCategoriesAPI = createAsyncThunk('category/get-all', async (params) => {
  try {
    const { data } = await axios.get(`${BASE_API}/category`, params)
    return data
  } catch (error) {
    return error
  }
})

export const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    // logout: (state) => {
    //   state.user = null
    //   window.location.reload()
    // }
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getCategoriesAPI.fulfilled, (state, action) => {
      state.categories = action.payload
    })
  }
})

// Action creators are generated for each case reducer function
// export const { logout } = authSlice.actions
export default categorySlice.reducer
