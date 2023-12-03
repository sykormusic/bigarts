import { DownOutlined } from '@ant-design/icons'
import { Dropdown, Space } from 'antd'
import styles from './index.module.scss'

const TopBar = () => {
  const languages = [
    {
      key: 'en',
      label: 'English'
    }
  ]
  return (
    <div className={styles.TopBar}>
      <div className={styles.contentWrapper}>
        <div className={styles.left}>Free Shipping Over $100 & Free Returns</div>

        <div className={styles.right}>
          <span>Hotline: (+84) 123 456 789</span>
          <Dropdown menu={{ items: languages }}>
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                English
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
