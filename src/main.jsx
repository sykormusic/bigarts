import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Details from './pages/Details'
import ErrorPage from './error-page'
import MainLayout from './layouts/MainLayout'
import Login from './pages/Login'
import SignUp from './pages/SignUp'
import Products from './pages/Products'

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
        element: <Products />,
        handle: {
          crumb: () => 'Products'
        },
        children: [
          {
            path: '/products/:id',
            element: <Details />,
            handle: {
              crumb: () => 'Details'
            }
          }
        ]
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
