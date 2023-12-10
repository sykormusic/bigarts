import { addToCart, userCartAPI } from '@/store/reducers/cartSlice'
import { getAProductAPI, rateProductAPI } from '@/store/reducers/productSlice'
import { renderMoney } from '@/utils/functions'
import { PlusOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import {
  Button,
  Carousel,
  Col,
  Divider,
  Form,
  Image,
  Input,
  InputNumber,
  Rate,
  Row,
  Skeleton,
  Space,
  Tag,
  message
} from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Comment from './components/Comment'
import styles from './index.module.scss'
import { TAG_COLOR } from '@/utils/constants'
import { useRef } from 'react'
import { isEmpty } from 'lodash'

const Details = () => {
  const [form] = Form.useForm()
  const { productDetails = {}, isLoadingProductDetails } = useSelector((state) => state.product)
  const { user } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [count, setCount] = useState(1)

  const reviewInputRef = useRef()

  const {
    _id,
    images = [],
    category,
    tags,
    brand,
    quantity,
    title,
    description,
    price,
    totalrating = 0,
    ratings = []
  } = productDetails || {}
  const { id } = useParams()

  const myRating = ratings.find((rating) => rating.postedby === user?._id)

  useEffect(() => {
    form.resetFields()
  }, [JSON.stringify(myRating)])

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

  const onRate = async (values) => {
    if (values.star < 1 || values.star > 5) {
      return
    }
    const res = await dispatch(
      rateProductAPI({
        star: values.star,
        prodId: _id,
        comment: values.comment
      })
    )
    if (res.payload) {
      getProductData()
      form.resetFields()
    }
  }

  useEffect(() => {
    if (id) {
      getProductData()
    }
  }, [id])

  const onAddToCart = () => {
    if (!user) {
      navigate('/login')
      return
    }
    dispatch(addToCart({ product: productDetails, count: count }))

    message.success('Đã thêm vào giỏ hàng')
  }

  if (isLoadingProductDetails) {
    return (
      <div className={styles.Details}>
        <Skeleton active />
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
              <Carousel dots infinite={false} arrows prevArrow={<PlusOutlined />} nextArrow={<PlusOutlined />}>
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
                <span>{renderMoney(price)}</span>
              </div>

              {/* <Typography.Text delete className={styles.oldPrice}>
                $ 1200000
              </Typography.Text> */}
            </div>
            <div className={styles.rating}>
              <Rate defaultValue={totalrating} disabled />
              <span>
                <span>({ratings.length} reviews)</span>
                {!!user && (
                  <Button type='link' onClick={() => reviewInputRef.current.focus()}>
                    Write a review
                  </Button>
                )}
              </span>
            </div>
            <Divider />
            <span className={styles.info}>
              Brand: <Tag color='orange'>{brand}</Tag>
            </span>
            <span className={styles.info}>
              Category: <Tag color='blue'>{category}</Tag>
            </span>
            <span className={styles.info}>
              Tag: <Tag color={TAG_COLOR[tags]}>{tags}</Tag>
            </span>
            <Divider />
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

      <Row
        gutter={[24, 24]}
        style={{
          marginTop: 24
        }}
      >
        <Col span={24}>
          <div className={styles.descriptionContainer}>
            <span className={styles.title}>Mô tả</span>
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </div>
        </Col>

        {!user && isEmpty(ratings) ? null : (
          <Col span={24}>
            <div className={styles.reviewContainer}>
              <span className={styles.title}>Đánh giá sản phẩm</span>
              {!!user && (
                <>
                  <Form
                    form={form}
                    onFinish={onRate}
                    initialValues={{
                      star: myRating?.star,
                      comment: myRating?.comment
                    }}
                  >
                    <Form.Item
                      name='star'
                      rules={[
                        {
                          validator: async (_, value) => {
                            if (value < 1 || value > 5) {
                              throw new Error('Vui lòng chọn số sao!')
                            }
                            return Promise.resolve()
                          }
                        }
                      ]}
                    >
                      <Rate allowClear={false} />
                    </Form.Item>
                    <Form.Item
                      name='comment'
                      rules={[
                        {
                          min: 25,
                          message: 'Đánh giá tối thiểu 25 ký tự!'
                        }
                      ]}
                    >
                      <Input.TextArea rows={4} placeholder='Nhập đánh giá...' ref={reviewInputRef} />
                    </Form.Item>

                    <Form.Item>
                      <Button type='primary' htmlType='submit'>
                        Đánh giá
                      </Button>
                    </Form.Item>
                  </Form>

                  {ratings.length > 0 ? <Divider /> : null}
                </>
              )}
              {ratings.map((x) => (
                <Comment key={x._id} data={x} />
              ))}
            </div>
          </Col>
        )}
      </Row>
    </div>
  )
}

export default Details
