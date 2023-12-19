import { getUserCartAPI, userCartAPI } from '@/store/reducers/cartSlice'
import { addToWishListAPI, getAProductAPI, rateProductAPI } from '@/store/reducers/productSlice'
import { getMyWishlistAPI } from '@/store/reducers/userSlice'
import { TAG_COLOR } from '@/utils/constants'
import { renderMoney } from '@/utils/functions'
import { HeartFilled, HeartOutlined, PlusOutlined, ShoppingCartOutlined } from '@ant-design/icons'
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
import { isEmpty } from 'lodash'
import { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import Comment from './components/Comment'
import styles from './index.module.scss'

const Details = () => {
  const [form] = Form.useForm()
  const { cart = {} } = useSelector((state) => state.cart)
  const { productDetails = {}, isLoadingProductDetails } = useSelector((state) => state.product)
  const { myWishlist = [] } = useSelector((state) => state.user)
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
  console.log('🚀  ~ _id:', _id)
  const { id } = useParams()

  const myRating = ratings.find((rating) => rating.postedby === user?._id)
  const isInWishlist = myWishlist.some((item) => item._id === _id)

  useEffect(() => {
    form.resetFields()
  }, [JSON.stringify(myRating)])

  const getProductData = () => {
    dispatch(getAProductAPI(id))
  }

  const onAddToWishList = (id) => {
    dispatch(
      addToWishListAPI({
        prodId: id
      })
    ).then(() => {
      if (!isInWishlist) {
        message.success('Đã thêm vào danh sách yêu thích')
      } else {
        message.success('Đã xoá khỏi danh sách yêu thích')
      }
      dispatch(getMyWishlistAPI())
    })
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
    if (!values.star || values.star < 1 || values.star > 5) {
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

  const onAddToCart = async () => {
    if (!user) {
      navigate('/login')
      return
    }

    const newItem = {
      product: { _id },
      count: count
    }
    let newCart = cart
    const isItemExist = cart.products.some((x) => x.product._id === newItem.product._id)

    if (isItemExist) {
      newCart = {
        ...newCart,
        products: cart.products.map((x) =>
          x.product._id === newItem.product._id ? { ...x, count: x.count + newItem.count } : x
        )
      }
    } else {
      newCart = {
        ...newCart,
        products: [...newCart.products, newItem]
      }
    }

    await dispatch(
      userCartAPI({
        cart: newCart.products.map((x) => ({
          _id: x.product?._id,
          count: x.count
        }))
      })
    )
    dispatch(getUserCartAPI())
    // dispatch(addToCart({ product: productDetails, count: count }))

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
            <div
              className={styles.buttons}
              style={{
                marginTop: 24
              }}
            >
              <Button onClick={() => onAddToWishList(_id)} type='default' danger={isInWishlist}>
                <Space>
                  {isInWishlist ? (
                    <HeartFilled
                      style={{
                        color: 'var(--red)'
                      }}
                    />
                  ) : (
                    <HeartOutlined />
                  )}
                  {!isInWishlist ? 'Thêm vào danh sách yêu thích' : 'Xoá khỏi danh sách yêu thích'}
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
                          min: 20,
                          message: 'Đánh giá tối thiểu 20 ký tự!'
                        }
                      ]}
                    >
                      <Input.TextArea rows={4} placeholder='Nhập đánh giá...' ref={reviewInputRef} />
                    </Form.Item>

                    <Form.Item>
                      <Button type='primary' htmlType='submit'>
                        {!isEmpty(myRating) ? 'Cập nhật đánh giá' : 'Đánh giá'}
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
