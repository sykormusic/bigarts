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

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    handle: {
      crumb: () => 'Home'
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
          crumb: () => 'Account'
        }
      },
      {
        path: '/sign-up',
        element: <SignUp />,
        handle: {
          crumb: () => 'Create Account'
        }
      },
      {
        path: '/products',
        handle: {
          crumb: () => 'Products'
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
              crumb: () => 'Details'
            }
          }
        ]
      },
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path: '*',
        element: <ErrorPage />
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#00b96b',
          borderRadius: 2
        }
      }}
    >
      <RouterProvider router={router} />
    </ConfigProvider>
  </React.StrictMode>
)
