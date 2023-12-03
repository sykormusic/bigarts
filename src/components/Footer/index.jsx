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
      label: 'Contact Us',
      value: (
        <div className={styles.contactUs}>
          <p>
            <span>Samazon Store</span>
            <span>Thu Dau Mot City, Binh Duong</span>
            <div className={styles.spacer} />
            <span>+84123456789</span>
            <div className={styles.spacer} />
            <span>sykormusic@gmail.com</span>
          </p>
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
      label: 'Information',
      links: [
        {
          key: 1,
          label: 'Privacy Policy',
          url: '/#'
        },
        {
          key: 2,
          label: 'Return Policy',
          url: '/#'
        },
        {
          key: 3,
          label: 'Shipping Policy',
          url: '/#'
        },
        {
          key: 4,
          label: 'Terms & Conditions',
          url: '/#'
        },
        {
          key: 5,
          label: 'Blogs',
          url: '/blogs'
        }
      ]
    },
    {
      label: 'Account',
      links: [
        {
          key: 1,
          label: 'Search',
          url: '/#'
        },
        {
          key: 2,
          label: 'About us',
          url: '/#'
        },
        {
          key: 3,
          label: 'FAQ',
          url: '/#'
        },
        {
          key: 4,
          label: 'Contact',
          url: '/#'
        }
      ]
    },
    {
      label: 'Quick Links',
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
              <span>Sign Up for Our Newsletter</span>
            </div>
            <div className={styles.input}>
              <Input
                placeholder='Enter your email'
                allowClear
                suffix={<Button type='primary'>Subscribe</Button>}
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
          <p className={styles.copyright}>© 2023. Samazon by Sykor</p>
        </div>
      </div>
    </div>
  )
}

export default Footer
