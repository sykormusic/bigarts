import { logoutAPI } from '@/store/reducers/authSlice'
import { searchProductAPI } from '@/store/reducers/productSlice'
import { getMyWishlistAPI } from '@/store/reducers/userSlice'
import { HeartOutlined, LogoutOutlined, ShoppingCartOutlined, UserOutlined } from '@ant-design/icons'
import { Badge, Input, Dropdown } from 'antd'
import { debounce } from 'lodash'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CartDrawer from '../CartDrawer'
import Item from './components/Item'
import styles from './index.module.scss'

const Header = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)
  const { myWishlist = [] } = useSelector((state) => state.user)
  const {
    cart: { products = [] }
  } = useSelector((state) => state.cart)

  const [isCartOpen, setIsCartOpen] = useState(false)
  const [searchData, setSearchData] = useState([])
  const [isLoadingSearch, setIsLoadingSearch] = useState(false)

  const handleSearch = debounce(async (e) => {
    setIsLoadingSearch(true)
    // setSearchValue(newValue)

    const { value } = e.target
    if (!value) {
      setSearchData([])
      setIsLoadingSearch(false)
      return
    }
    const { payload: { status, data = [] } = {} } = await dispatch(searchProductAPI({ searchKey: value }))
    if (status === 200) {
      setSearchData(data)
      setIsLoadingSearch(false)
    }
  }, 1000)

  useEffect(() => {
    if (user) {
      dispatch(getMyWishlistAPI())
    }
  }, [user])

  const headerItems = [
    // {
    //   title: 'Compare',
    //   subtitle: 'Products',
    //   key: 'compare-products',
    //   icon: <SyncOutlined />,
    //   onClick: () => {}
    // },
    {
      title: 'Sản phẩm',
      subtitle: 'Yêu thích',
      key: 'wishlist',
      icon: (
        <Badge count={myWishlist.length}>
          <HeartOutlined />
        </Badge>
      ),
      onClick: () => {
        navigate('/profile/wishlist')
      }
    },
    ...(!user
      ? [
          {
            title: 'Đăng nhập',
            subtitle: 'Tài khoản',
            key: 'login',
            icon: <UserOutlined />,
            onClick: () => navigate(`/login`)
          }
        ]
      : [
          {
            title: user.firstname,
            subtitle: user.lastname,
            key: 'login',
            icon: <UserOutlined />,
            menuItems: [
              {
                label: 'Trang cá nhân',
                key: 'profile',
                onClick: () => navigate(`/profile/info`),
                icon: <UserOutlined />
              },
              {
                label: 'Đơn hàng của tôi',
                key: 'orders',
                onClick: () => navigate(`/profile/orders`),
                icon: <ShoppingCartOutlined />
              },
              {
                label: (
                  <span
                    style={{
                      color: 'var(--red)'
                    }}
                  >
                    Đăng xuất
                  </span>
                ),
                key: 'logout',
                onClick: () => {
                  dispatch(logoutAPI())
                },
                icon: (
                  <LogoutOutlined
                    style={{
                      color: 'var(--red)'
                    }}
                  />
                )
              }
            ]
          }
        ]),
    {
      title: 'Giỏ hàng',
      key: 'cart',
      icon: (
        <Badge count={products.length}>
          <ShoppingCartOutlined />
        </Badge>
      ),
      onClick: () => setIsCartOpen((prev) => !prev)
    }
  ]

  return (
    <div className={styles.Header}>
      <div className={styles.contentWrapper}>
        <div className={styles.logo}>
          <a href='/'>BigArts</a>
        </div>
        <div className={styles.center}>
          <Dropdown
            menu={{
              items: searchData.map((d) => ({
                value: d._id,
                label: d.title,
                onClick: () => {
                  navigate(`/products/${d._id}`)
                }
              }))
            }}
          >
            <Input
              placeholder='Tìm kiếm sản phẩm...'
              onSearch={handleSearch}
              onChange={handleSearch}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  navigate(`/products`, {
                    state: {
                      searchKey: e.target.value
                    }
                  })
                }
              }}
              loading={isLoadingSearch}
              style={{
                width: '100%'
              }}
              size='large'
              allowClear
            />
          </Dropdown>
        </div>
        <div className={styles.right}>
          {headerItems.map((item) => (
            <Item
              key={item.key}
              onClick={item.onClick}
              title={item.title}
              subtitle={item.subtitle}
              icon={item.icon}
              menuItems={item.menuItems}
            />
          ))}
        </div>
      </div>
      <CartDrawer open={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  )
}

export default Header
