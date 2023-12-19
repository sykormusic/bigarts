import { Tabs } from 'antd'
import MyInformation from './components/MyInformation'
import MyOrders from './components/MyOrders'
import styles from './index.module.scss'
import MyWishlist from './components/MyWishlist'
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { redirect } from 'react-router-dom'
import { useEffect } from 'react'

const Profile = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const activeKey = location.pathname.split('/')?.[2]

  useEffect(() => {
    if (!activeKey) {
      redirect('/profile/info')
    }
  }, [activeKey])

  const tabs = [
    {
      label: 'Thông tin',
      key: 'info',
      children: <MyInformation />
    },
    {
      label: 'Đơn hàng của tôi',
      key: 'orders',
      children: <MyOrders />
    },
    { label: 'Sản phẩm yêu thích', key: 'wishlist', children: <MyWishlist /> }
  ]
  return (
    <div className={styles.Profile}>
      <div className={styles.title}>
        <h1>Trang cá nhân</h1>
      </div>
      <div className={styles.container}>
        <Tabs
          defaultActiveKey={activeKey}
          tabPosition={'left'}
          activeKey={activeKey}
          items={tabs}
          onTabClick={(key) => navigate(`/profile/${key}`)}
        />
      </div>
    </div>
  )
}

export default Profile
