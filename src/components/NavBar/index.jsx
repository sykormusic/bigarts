import { DownOutlined, AppstoreOutlined } from '@ant-design/icons'
import { Dropdown, Space } from 'antd'
import styles from './index.module.scss'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const NavBar = () => {
  const { categories = [] } = useSelector((state) => state.category)
  const navigate = useNavigate()

  const links = [
    {
      key: 'home',
      label: 'Trang chủ',
      url: '/'
    },
    {
      key: 'our-store',
      label: 'Tất cả sản phẩm',
      url: '/products'
    },
    {
      key: 'blogs',
      label: 'Blog',
      url: '/blogs'
    },
    {
      key: 'contact',
      label: 'Liên hệ',
      url: '/contact'
    }
  ]

  const items = categories.map((x) => ({
    key: x._id,
    label: x.title,
    onClick: () =>
      navigate(`/products`, {
        state: {
          categoryId: x._id,
          categoryName: x.title
        }
      })
  }))

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
                  DANH MỤC
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
