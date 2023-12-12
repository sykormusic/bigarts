import authReducer from './reducers/authSlice'
import userReducer from './reducers/userSlice'
import categoryReducer from './reducers/categorySlice'
import productReducer from './reducers/productSlice'
import homeReducer from './reducers/homeSlice'
import cartReducer from './reducers/cartSlice'
import brandReducer from './reducers/brandSlice'
import blogReducer from './reducers/blogSlice'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
  key: 'root',
  storage
}

const rootReducer = combineReducers({
  auth: persistReducer(persistConfig, authReducer),
  category: categoryReducer,
  product: productReducer,
  home: homeReducer,
  cart: cartReducer,
  brand: brandReducer,
  blog: blogReducer,
  user: userReducer
  // Add other reducers as needed
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
})

export const persistor = persistStore(store)
