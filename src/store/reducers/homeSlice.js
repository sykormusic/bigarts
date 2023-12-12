import { BASE_API } from '@/utils/api'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  featuredProducts: [],
  specialProducts: [],
  popularProducts: [],
  isLoadingFeaturedProducts: false,
  isLoadingSpecialProducts: false,
  isLoadingPopularProducts: false
}

export const getFeaturedProducts = createAsyncThunk('home/get-featured', async () => {
  try {
    const { data } = await axios.get(`${BASE_API}/product`, {
      params: {
        tags: 'featured',
        limit: 10
      }
    })
    return data
  } catch (error) {
    return error
  }
})

export const getSpecialProducts = createAsyncThunk('home/get-special', async () => {
  try {
    const { data } = await axios.get(`${BASE_API}/product`, {
      params: {
        tags: 'special',
        limit: 5
      }
    })
    return data
  } catch (error) {
    return error
  }
})

export const getPopularProducts = createAsyncThunk('home/get-popular', async () => {
  try {
    const { data } = await axios.get(`${BASE_API}/product`, {
      params: {
        tags: 'popular',
        limit: 10
      }
    })
    return data
  } catch (error) {
    return error
  }
})

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    // logout: (state) => {
    //   state.user = null
    //   window.location.reload()
    // }
  },
  extraReducers: (builder) => {
    builder.addCase(getFeaturedProducts.pending, (state) => {
      state.isLoadingFeaturedProducts = true
    })
    builder.addCase(getSpecialProducts.pending, (state) => {
      state.isLoadingSpecialProducts = true
    })
    builder.addCase(getPopularProducts.pending, (state) => {
      state.isLoadingPopularProducts = true
    })
    builder.addCase(getFeaturedProducts.fulfilled, (state, action) => {
      state.featuredProducts = action.payload?.data || []
      state.isLoadingFeaturedProducts = false
    })
    builder.addCase(getSpecialProducts.fulfilled, (state, action) => {
      state.specialProducts = action.payload?.data || []
      state.isLoadingSpecialProducts = false
    })
    builder.addCase(getPopularProducts.fulfilled, (state, action) => {
      state.popularProducts = action.payload?.data || []
      state.isLoadingPopularProducts = false
    })

    builder.addCase(getFeaturedProducts.rejected, (state) => {
      state.isLoadingFeaturedProducts = false
    })
    builder.addCase(getSpecialProducts.rejected, (state) => {
      state.isLoadingSpecialProducts = false
    })
    builder.addCase(getPopularProducts.rejected, (state) => {
      state.isLoadingPopularProducts = false
    })
  }
})

// Action creators are generated for each case reducer function
// export const { logout } = authSlice.actions
export default homeSlice.reducer
