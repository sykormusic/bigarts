import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { ConfigProvider } from 'antd'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Details from './pages/Details'
import ErrorPage from './error-page'
import MainLayout from './layouts/MainLayout'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Products from './pages/Products'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import { persistor, store } from './store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    handle: {
      crumb: () => 'Trang chủ'
    },
    children: [
      {
        path: '/',
        index: true,
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />,
        handle: {
          crumb: () => 'Đăng nhập'
        }
      },
      {
        path: '/sign-up',
        element: <SignUp />,
        handle: {
          crumb: () => 'Đăng ký'
        }
      },
      {
        path: '/products',
        handle: {
          crumb: () => 'Tất cả sản phẩm'
        },
        children: [
          {
            index: true,
            element: <Products />
          },
          {
            path: ':id',
            element: <Details />,
            handle: {
              crumb: () => 'Chi tiết sản phẩm'
            }
          }
        ]
      },
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path: '/checkout',
        element: <Checkout />
      },
      {
        path: '*',
        element: <ErrorPage />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <ConfigProvider
    theme={{
      token: {
        colorPrimary: '#00aa13',
        borderRadius: 2
      }
    }}
  >
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </ConfigProvider>
)
