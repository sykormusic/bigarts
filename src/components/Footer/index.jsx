import styles from './index.module.scss'
import { createFromIconfontCN } from '@ant-design/icons'
import { Row, Col, Space, Input, Button } from 'antd'
import { SendOutlined } from '@ant-design/icons'
import { useLocation, Link } from 'react-router-dom'

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js'
})

const Footer = () => {
  const location = useLocation()
  const showSubscribe = location.pathname === '/'
  const items = [
    {
      label: 'Liên hệ',
      value: (
        <div className={styles.contactUs}>
          <div>
            <span>BigArts Store</span>
            <span>Thu Dau Mot City, Binh Duong</span>
            <div className={styles.spacer} />
            <span>+84123456789</span>
            <div className={styles.spacer} />
            <span>sykormusic@gmail.com</span>
          </div>
          <Space className={styles.socials}>
            <a href='https://www.facebook.com/' rel='noreferrer' target='_blank'>
              <div className={styles.btn}>
                <IconFont type='icon-facebook' className={styles.icon} />
              </div>
            </a>
            <a href='https://www.twitter.com/' rel='noreferrer' target='_blank'>
              <div className={styles.btn}>
                <IconFont type='icon-twitter' className={styles.icon} />
              </div>
            </a>
          </Space>
        </div>
      )
    },
    {
      label: 'Thông tin',
      links: [
        {
          key: 2,
          label: 'Chính sách đổi trả',
          url: '/#'
        },
        {
          key: 3,
          label: 'Chính sách vận chuyển',
          url: '/#'
        },
        {
          key: 4,
          label: 'Các điều khoản và điều kiện',
          url: '/#'
        },
        {
          key: 5,
          label: 'Blog',
          url: '/blogs'
        }
      ]
    },
    {
      label: 'Tài khoản',
      links: [
        {
          key: 1,
          label: 'Tìm kiếm',
          url: '/#'
        },
        {
          key: 2,
          label: 'Về chúng tôi',
          url: '/#'
        },
        {
          key: 3,
          label: 'Hỏi đáp',
          url: '/#'
        },
        {
          key: 4,
          label: 'Liên hệ',
          url: '/#'
        }
      ]
    },
    {
      label: 'Liên kết nhanh',
      links: [
        {
          key: 1,
          label: 'Accessories',
          url: '/#'
        },
        {
          key: 2,
          label: 'Laptops',
          url: '/#'
        },
        {
          key: 3,
          label: 'Headphones',
          url: '/#'
        },
        {
          key: 4,
          label: 'Tablets',
          url: '/#'
        }
      ]
    }
  ]
  return (
    <div className={styles.Footer}>
      {showSubscribe && (
        <div className={styles.above}>
          <div className={styles.container}>
            <div className={styles.label}>
              <SendOutlined className={styles.icon} />
              <span>Đăng ký nhận tin</span>
            </div>
            <div className={styles.input}>
              <Input
                placeholder='Nhập email của bạn...'
                allowClear
                suffix={<Button type='primary'>Đăng ký</Button>}
                size='large'
              />
            </div>
          </div>
        </div>
      )}
      <div className={styles.contentWrapper}>
        <div className={styles.container}>
          <Row gutter={[24, 24]} className={styles.content}>
            {items.map((item) => (
              <Col span={6} key={item.label}>
                <div>
                  <p className={styles.label}>{item.label}</p>
                  {item.value
                    ? item.value
                    : item.links?.map((link) => (
                        <p key={link.key} className={styles.link}>
                          <Link to={link.url}>{link.label}</Link>
                        </p>
                      ))}
                </div>
              </Col>
            ))}
          </Row>
        </div>
      </div>
      <div className={styles.below}>
        <div className={styles.container}>
          <p className={styles.copyright}>© 2023. BigArts Store by Sykor</p>
        </div>
      </div>
    </div>
  )
}

export default Footer
