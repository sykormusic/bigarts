import styles from './index.module.scss'
import { createFromIconfontCN } from '@ant-design/icons'
import { Space } from 'antd'

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js'
})

const Footer = () => {
  return (
    <div className={styles.Footer}>
      <div className={styles.contentWrapper}>
        <div className={styles.left}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua.
          </p>
          <Space>
            <a href='https://www.facebook.com/' rel='noreferrer' target='_blank'>
              <IconFont
                type='icon-facebook'
                style={{
                  color: '#4267B2',
                  fontSize: 24
                }}
              />
            </a>
            <a href='https://www.twitter.com/' rel='noreferrer' target='_blank'>
              <IconFont
                type='icon-twitter'
                style={{
                  color: '#1DA1F2',
                  fontSize: 24
                }}
              />
            </a>
          </Space>
        </div>

        <div className={styles.right}>
          <p>© 2022 SAMAZON. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  )
}

export default Footer
