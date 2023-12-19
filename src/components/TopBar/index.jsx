import { DownOutlined } from '@ant-design/icons'
import { Dropdown, Space } from 'antd'
import styles from './index.module.scss'

const TopBar = () => {
  const languages = [
    {
      key: 'en',
      label: 'English'
    },
    {
      key: 'vi',
      label: 'Tiếng Việt'
    }
  ]
  return (
    <div className={styles.TopBar}>
      <div className={styles.contentWrapper}>
        <div className={styles.left}>Trang mua sắm sản phẩm công nghệ, phụ kiện</div>

        <div className={styles.right}>
          <span>Hotline: (+84) 827250515</span>
          <Dropdown menu={{ items: languages }}>
            <a
              onClick={(e) => e.preventDefault()}
              style={{
                cursor: 'pointer'
              }}
            >
              <Space>
                <img className={styles.flag} src='/images/vn-flag.png' alt='' />
                Tiếng Việt
                <DownOutlined />
              </Space>
            </a>
          </Dropdown>
        </div>
      </div>
    </div>
  )
}

export default TopBar
