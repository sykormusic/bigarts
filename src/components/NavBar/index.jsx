import { DownOutlined, AppstoreOutlined } from '@ant-design/icons'
import { Dropdown, Space } from 'antd'
import styles from './index.module.scss'
import { Link } from 'react-router-dom'

const NavBar = () => {
  const links = [
    {
      key: 'home',
      label: 'Home',
      url: '/'
    },
    {
      key: 'our-store',
      label: 'Our Store',
      url: '/products'
    },
    {
      key: 'blogs',
      label: 'Blogs',
      url: '/blogs'
    },
    {
      key: 'contact',
      label: 'Contact',
      url: '/contact'
    }
  ]
  return (
    <div className={styles.NavBar}>
      <div className={styles.contentWrapper}>
        <div className={styles.left}>
          <Dropdown menu={{ items: [] }}>
            <a onClick={(e) => e.preventDefault()}>
              <Space className={styles.categories}>
                <div>
                  <AppstoreOutlined
                    style={{
                      fontSize: 20
                    }}
                  />
                  SHOP CATEGORIES
                </div>
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </div>

        <div className={styles.right}>
          {links.map((link) => (
            <Link key={link.key} to={link.url}>
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NavBar
