import { HeartOutlined, SearchOutlined, ShoppingCartOutlined, SyncOutlined } from '@ant-design/icons'
import { Button, Input, Badge } from 'antd'
import { useNavigate } from 'react-router-dom'
import Item from './components/Item'
import styles from './index.module.scss'
import { useState } from 'react'
import CartDrawer from '../CartDrawer'

const Header = () => {
  const navigate = useNavigate()
  const [isCartOpen, setIsCartOpen] = useState(false)

  const headerItems = [
    {
      title: 'Compare',
      subtitle: 'Products',
      key: 'compare-products',
      icon: <SyncOutlined />,
      onClick: () => {}
    },
    {
      title: 'Favorites',
      subtitle: 'Wishlist',
      key: 'wishlist',
      icon: <HeartOutlined />,
      onClick: () => {}
    },
    {
      title: 'Log In',
      subtitle: 'My Account',
      key: 'login',
      icon: <SearchOutlined />,
      onClick: () => navigate(`/login`)
    },
    {
      title: 'Cart',
      key: 'cart',
      icon: (
        <Badge count={4}>
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
          <a href='/'>SAMAZON</a>
        </div>
        <div className={styles.center}>
          <Input
            placeholder='Search products here...'
            size='large'
            allowClear
            addonAfter={
              <Button type='text'>
                <SearchOutlined />
              </Button>
            }
          />
        </div>
        <div className={styles.right}>
          {headerItems.map((item) => (
            <Item key={item.key} onClick={item.onClick} title={item.title} subtitle={item.subtitle} icon={item.icon} />
          ))}
        </div>
      </div>
      <CartDrawer open={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  )
}

export default Header
