import { ConfigProvider } from 'antd'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import ErrorPage from './error-page'
import './index.css'
import MainLayout from './layouts/MainLayout'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import Details from './pages/Details'
import Home from './pages/Home'
import Login from './pages/Login'
import Products from './pages/Products'
import SignUp from './pages/SignUp'
import { persistor, store } from './store'
import Profile from './pages/Profile'
import ProtectedRoute from './components/ProtectedRoute'
import Contact from './pages/Contact'
import Blogs from './pages/Blogs'
import ViewBlog from './pages/ViewBlog'

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
        path: '/about',
        element: <Contact />,
        handle: {
          crumb: () => 'Liên hệ'
        }
      },
      {
        path: '/blogs',
        handle: {
          crumb: () => 'Blog'
        },
        children: [
          {
            index: true,
            element: <Blogs />
          },
          {
            path: ':id',
            element: <ViewBlog />,
            handle: {
              crumb: () => 'Xem blog'
            }
          }
        ]
      },

      {
        path: '/profile',
        handle: {
          crumb: () => 'Trang cá nhân'
        },
        children: [
          {
            index: true,
            element: (
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            )
          },
          {
            path: 'info',
            element: (
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            ),
            handle: {
              crumb: () => 'Thông tin cá nhân'
            }
          },
          {
            path: 'orders',
            element: (
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            ),
            handle: {
              crumb: () => 'Đơn hàng'
            }
          },
          {
            path: 'wishlist',
            element: (
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            ),
            handle: {
              crumb: () => 'Danh sách yêu thích'
            }
          }
        ]
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
        element: (
          <ProtectedRoute>
            <Cart />
          </ProtectedRoute>
        ),
        handle: {
          crumb: () => 'Giỏ hàng'
        }
      },
      {
        path: '/checkout',
        element: (
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        ),
        handle: {
          crumb: () => 'Thanh toán'
        }
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
