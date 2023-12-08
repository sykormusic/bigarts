import { PlusOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { Button, Image, Typography, Rate, Carousel, Col, InputNumber, Row, Space, notification } from 'antd'
import { useParams, useNavigate } from 'react-router-dom'
import styles from './index.module.scss'
import { useDispatch } from 'react-redux'
import { getAProductAPI } from '@/store/reducers/productSlice'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'

const Details = () => {
  const { productDetails = {} } = useSelector((state) => state.product)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { images = [], brand, quantity, title, description, price, totalrating = 0 } = productDetails || {}
  const { id } = useParams()

  const getProductData = () => {
    dispatch(getAProductAPI(id))
  }

  useEffect(() => {
    if (id) {
      getProductData()
    }
  }, [id])

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
                  <div key={image._id} className={styles.carouselItem}>
                    <Image src={image.url} className={styles.carouselImage} />
                  </div>
                ))}
              </Carousel>
            </Image.PreviewGroup>
          </div>
        </Col>
        <Col span={14}>
          <div className={styles.productInfo}>
            <span className={styles.title}>{title}</span>
            <span className={styles.brand}>{brand}</span>
            <div className={styles.rating}>
              <Rate disabled defaultValue={totalrating} />
            </div>

            <div dangerouslySetInnerHTML={{ __html: description }} />
            <div className={styles.price}>
              <div className={styles.priceItem}>
                <span>$</span>
                <span>{price}</span>
              </div>

              {/* <Typography.Text delete className={styles.oldPrice}>
                $ 1200000
              </Typography.Text> */}
            </div>
            <InputNumber size='large' defaultValue={1} max={quantity} min={1} />
            <div className={styles.buttons}>
              <Button size='large' onClick={onAddToCart}>
                <Space>
                  <PlusOutlined />
                  Thêm vào giỏ hàng
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
                  Mua ngay
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
