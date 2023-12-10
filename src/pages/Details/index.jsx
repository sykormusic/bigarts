import { PlusOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { Button, Image, Typography, Rate, Carousel, Col, InputNumber, Row, Space, notification, Skeleton } from 'antd'
import { useParams, useNavigate } from 'react-router-dom'
import styles from './index.module.scss'
import { useDispatch } from 'react-redux'
import { getAProductAPI } from '@/store/reducers/productSlice'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { addToCart, userCartAPI } from '@/store/reducers/cartSlice'
import { useState } from 'react'
import { Divider } from 'antd'

const Details = () => {
  const { productDetails = {}, isLoadingProductDetails } = useSelector((state) => state.product)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [count, setCount] = useState(1)

  const {
    images = [],
    category,
    tags,
    brand,
    quantity,
    title,
    description,
    price,
    totalrating = 0
  } = productDetails || {}
  const { id } = useParams()

  const getProductData = () => {
    dispatch(getAProductAPI(id))
  }

  const onCheckoutThisItem = async () => {
    await dispatch(
      userCartAPI({
        cart: [
          {
            _id: id,
            count
          }
        ]
      })
    )
    navigate('/checkout')
  }

  useEffect(() => {
    if (id) {
      getProductData()
    }
  }, [id])

  const onAddToCart = () => {
    dispatch(addToCart({ product: productDetails, count: count }))
    notification.success({
      message: 'Success',
      description: 'Add to cart successfully',
      btn: (
        <Button type='primary' size='small' onClick={() => navigate('/cart')}>
          Go to cart
        </Button>
      )
    })
  }

  if (isLoadingProductDetails) {
    return (
      <div className={styles.Details}>
        <Skeleton active />
      </div>
    )
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
            <Divider />
            <div className={styles.price}>
              <div className={styles.priceItem}>
                <span></span>
                <span>{price}</span>
              </div>

              {/* <Typography.Text delete className={styles.oldPrice}>
                $ 1200000
              </Typography.Text> */}
            </div>
            <div className={styles.rating}>
              <Rate disabled defaultValue={totalrating} />
              <span>({totalrating} reviews)</span>
            </div>
            <Divider />
            <span className={styles.info}>Brand: {brand}</span>
            <span className={styles.info}>Category: {category}</span>
            <span className={styles.info}>Tag: {tags}</span>
            <Divider />

            <div dangerouslySetInnerHTML={{ __html: description }} />

            <div className={styles.buttons}>
              <InputNumber
                size='large'
                defaultValue={count}
                max={quantity}
                min={1}
                onChange={(value) => setCount(value)}
                value={count}
              />
              <Button size='large' onClick={onAddToCart}>
                <Space>
                  <PlusOutlined />
                  Thêm vào giỏ hàng
                </Space>
              </Button>
              <Button size='large' type='primary' onClick={onCheckoutThisItem}>
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
