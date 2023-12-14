import api from '@/utils/api'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  blogs: [],
  isLoadingBlogDetails: false,
  isLoadingBlogs: false
}

export const getBlogsAPI = createAsyncThunk('blog/get-all', async (params) => {
  try {
    const { data } = await api.get(`/blog`, params)
    return data
  } catch (error) {
    return error
  }
})

export const getABlogAPI = createAsyncThunk('blog/get-one', async (id) => {
  try {
    const { data } = await api.get(`/blog/${id}`)
    return data
  } catch (error) {
    return error
  }
})

export const likeBlogAPI = createAsyncThunk('blog/like', async (payload) => {
  try {
    const { data } = await api.put(`/blog/likes`, payload)
    return data
  } catch (error) {
    return error
  }
})

export const dislikeBlogAPI = createAsyncThunk('blog/dislike', async (payload) => {
  try {
    const { data } = await api.put(`/blog/dislikes`, payload)
    return data
  } catch (error) {
    return error
  }
})

export const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(getBlogsAPI.fulfilled, (state, action) => {
      state.blogs = action.payload
      state.isLoadingBlogs = false
    })
    builder.addCase(getBlogsAPI.pending, (state) => {
      state.isLoadingBlogs = true
    })
    builder.addCase(getBlogsAPI.rejected, (state) => {
      state.isLoadingBlogs = false
    })

    builder.addCase(getABlogAPI.pending, (state) => {
      state.isLoadingBlogDetails = true
    })
    builder.addCase(getABlogAPI.fulfilled, (state) => {
      state.isLoadingBlogDetails = false
    })

    builder.addCase(getABlogAPI.rejected, (state) => {
      state.isLoadingBlogDetails = false
    })
  }
})

// Action creators are generated for each case reducer function
// export const { logout } = authSlice.actions
export default blogSlice.reducer
