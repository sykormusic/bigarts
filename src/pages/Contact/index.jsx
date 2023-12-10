import { Col, Row } from 'antd'
import styles from './index.module.scss'
import { Card } from 'antd'
import { createFromIconfontCN } from '@ant-design/icons'
import { Space } from 'antd'

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js'
})

const { Meta } = Card

const Contact = () => {
  return (
    <div className={styles.Contact}>
      <Row gutter={[24, 24]}>
        <Col span={6}>
          <Card
            hoverable
            cover={<img alt='example' src='https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png' />}
          >
            <Meta title='Nguyễn Ngọc Sâm' description='sykormysic@gmail.com' />
          </Card>
        </Col>

        <Col span={18}>
          <div className={styles.contactUs}>
            <div>
              <h1>BigArts Store</h1>
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
        </Col>
      </Row>
    </div>
  )
}

export default Contact
