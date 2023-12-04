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

  const items = [
    {
      key: '1',
      type: 'group',
      label: 'Group title',
      children: [
        {
          key: '1-1',
          label: '1st menu item'
        },
        {
          key: '1-2',
          label: '2nd menu item'
        }
      ]
    },
    {
      key: '2',
      label: 'sub menu',
      children: [
        {
          key: '2-1',
          label: '3rd menu item'
        },
        {
          key: '2-2',
          label: '4th menu item'
        }
      ]
    },
    {
      key: '3',
      label: 'disabled sub menu',
      disabled: true,
      children: [
        {
          key: '3-1',
          label: '5d menu item'
        },
        {
          key: '3-2',
          label: '6th menu item'
        }
      ]
    }
  ]

  return (
    <div className={styles.NavBar}>
      <div className={styles.contentWrapper}>
        <Dropdown menu={{ items: items }}>
          <div className={styles.left}>
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
          </div>
        </Dropdown>

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
