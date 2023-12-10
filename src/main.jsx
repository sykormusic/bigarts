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
        handle: {
          crumb: () => 'Giới thiệu'
        }
      },
      {
        path: '/contact',
        handle: {
          crumb: () => 'Liên hệ'
        }
      },
      {
        path: '/blogs',
        handle: {
          crumb: () => 'Blog'
        }
      },
      {
        path: '/blogs/:id',
        element: <div />,
        handle: {
          crumb: () => 'Chi tiết blog'
        }
      },
      {
        path: '/profile',
        handle: {
          crumb: () => 'Trang cá nhân'
        },
        children: [
          {
            index: true,
            element: <Profile />
          },
          {
            path: 'info',
            element: <Profile />,
            handle: {
              crumb: () => 'Thông tin cá nhân'
            }
          },
          {
            path: 'orders',
            element: <Profile />,
            handle: {
              crumb: () => 'Đơn hàng'
            }
          },
          {
            path: 'wishlist',
            element: <Profile />,
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
        element: <Cart />,
        handle: {
          crumb: () => 'Giỏ hàng'
        }
      },
      {
        path: '/checkout',
        element: <Checkout />,
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
