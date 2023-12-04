import { PlusOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { Button, Image, Typography, Rate, Carousel, Col, InputNumber, Row, Space, notification } from 'antd'
import { useParams, useNavigate } from 'react-router-dom'
import styles from './index.module.scss'

const Details = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  console.log('🚀  ~ id:', id)

  const images = ['https://picsum.photos/500/500', 'https://picsum.photos/500/500', 'https://picsum.photos/500/500']

  const onAddToCart = () => {
    notification.success({
      message: 'Success',
      description: 'Add to cart successfully'
    })
  }
  return (
    <div className={styles.Details}>
      <Row gutter={[24, 24]}>
        <Col span={10}>
          <div className={styles.carousel}>
            <Image.PreviewGroup>
              <Carousel infinite={false} arrows prevArrow={<PlusOutlined />} nextArrow={<PlusOutlined />}>
                {images.map((image) => (
                  <div key={image} className={styles.carouselItem}>
                    <Image src={image} className={styles.carouselImage} />
                  </div>
                ))}
              </Carousel>
            </Image.PreviewGroup>
          </div>
        </Col>
        <Col span={14}>
          <div className={styles.productInfo}>
            <span className={styles.title}>iPhone 15 Pro Max Dark Grey</span>
            <div className={styles.rating}>
              <Rate disabled defaultValue={2} />
            </div>

            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </p>
            <div className={styles.price}>
              <div className={styles.priceItem}>
                <span>$</span>
                <span>1000000</span>
              </div>

              <Typography.Text delete className={styles.oldPrice}>
                $ 1200000
              </Typography.Text>
            </div>
            <InputNumber size='large' defaultValue={1} min={1} />
            <div className={styles.buttons}>
              <Button size='large' onClick={onAddToCart}>
                <Space>
                  <PlusOutlined />
                  Add to Cart
                </Space>
              </Button>
              <Button
                size='large'
                type='primary'
                onClick={() => {
                  navigate('/checkout')
                }}
              >
                <Space>
                  <ShoppingCartOutlined />
                  Buy now
                </Space>
              </Button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default Details
