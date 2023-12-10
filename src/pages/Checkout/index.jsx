import { applyCouponAPI, createCashOrderAPI, emptyCartAPI, getUserCartAPI } from '@/store/reducers/cartSlice'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { Button, Col, Divider, Form, Input, Row, Space } from 'antd'
import { useForm } from 'antd/es/form/Form'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import Result from '../Result'
import styles from './index.module.scss'
import { Select } from 'antd'

const Checkout = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [form] = useForm()
  const { user } = useSelector((state) => state.auth)

  const [cartDetails, setCartDetails] = useState({})

  const [orderStatus, setOrderStatus] = useState('')
  const [coupon, setCoupon] = useState('CRM2023')
  const [formValues, setFormValues] = useState({})

  const { products = [], cartTotal } = cartDetails || {}

  const getCartDetails = async () => {
    const res = await dispatch(getUserCartAPI())
    if (res.payload) {
      setCartDetails(res.payload)
    }
  }

  const onApplyCoupon = async () => {
    await dispatch(
      applyCouponAPI({
        coupon
      })
    )
  }

  useEffect(() => {
    getCartDetails()
  }, [])

  const onFinish = async (values) => {
    console.log(values)
    const res = await dispatch(
      createCashOrderAPI({
        COD: true,
        paymentAddress: {
          address: values.address,
          country: 'VN',
          ward: values.ward,
          district: values.district,
          state: values.state
        },
        paymentInfo: {
          firstName: values.firstname,
          lastName: values.lastname,
          mobile: values.mobile,
          email: user?.email
        }
      })
    )

    if (res?.payload?.message === 'success') {
      dispatch(emptyCartAPI())
      setOrderStatus('success')
    }
  }

  if (orderStatus === 'success') {
    return (
      <Result
        title='Thanh toán thành công'
        subTitle='Cảm ơn quý khách đã mua hàng'
        extra={[
          <Button key='back' type='primary' icon={<ArrowLeftOutlined />} onClick={() => navigate('/')}>
            Quay về trang chủ
          </Button>
        ]}
      />
    )
  }
  return (
    <div className={styles.Checkout}>
      <div className={styles.title}>
        <h1>Đặt hàng</h1>
      </div>
      <div className={styles.container}>
        <Row gutter={[24, 24]}>
          <Col span={15}>
            <div className={styles.infoContainer}>
              <div className={styles.contactInfo}>
                <h2>Thông tin liên hệ</h2>
                <p>
                  {user.firstname} {user.lastname} ({user?.email})
                </p>
              </div>
              <div className={styles.addressForm}>
                <h2>Địa chỉ giao hàng</h2>
                <Form
                  form={form}
                  name='checkoutForm'
                  layout='vertical'
                  initialValues={{
                    firstname: user?.firstname,
                    lastname: user?.lastname,
                    mobile: user.mobile
                  }}
                  onFinish={onFinish}
                  autoComplete='off'
                  onValuesChange={(changedValues, allValues) => {
                    setFormValues(allValues)
                  }}
                >
                  <Row gutter={[24, 24]}>
                    <Col span={12}>
                      <Form.Item
                        name='firstname'
                        rules={[
                          {
                            required: true,
                            message: 'Vui lòng điền họ và tên đệm'
                          }
                        ]}
                      >
                        <Input size='large' placeholder='Họ và tên đệm' />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name='lastname'
                        rules={[
                          {
                            required: true,
                            message: 'Vui lòng điền tên'
                          }
                        ]}
                      >
                        <Input size='large' placeholder='Tên' />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Form.Item
                    name='mobile'
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng điền số điện thoại'
                      }
                    ]}
                  >
                    <Input size='large' placeholder='Số điện thoại' />
                  </Form.Item>
                  <Form.Item
                    name='address'
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng nhập địa chi!'
                      }
                    ]}
                  >
                    <Input size='large' placeholder='Số nhà, tên đường, tòa nhà,...' />
                  </Form.Item>
                  <Row gutter={[24, 24]}>
                    <Col span={8}>
                      <Form.Item
                        name='state'
                        rules={[
                          {
                            required: true,
                            message: 'Vui lòng nhập tỉnh'
                          }
                        ]}
                      >
                        <Select
                          size='large'
                          placeholder='Tỉnh/thành phố'
                          options={[{ label: 'Thanh Pho Ho Chi Minh', value: 'Thanh Pho Ho Chi Minh' }]}
                          onChange={() => form.setFieldValue('district', undefined)}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={8}>
                      <Form.Item
                        name='district'
                        rules={[
                          {
                            required: true,
                            message: 'Vui lòng nhập quận/huyện'
                          }
                        ]}
                      >
                        <Select
                          size='large'
                          placeholder='Quận/huyện'
                          options={[
                            { label: 'Quan 1', value: 'Quan 1' },
                            { label: 'Quan 2', value: 'Quan 2' }
                          ]}
                          onChange={() => form.setFieldValue('ward', undefined)}
                        />
                      </Form.Item>
                    </Col>

                    <Col span={8}>
                      <Form.Item
                        name='ward'
                        rules={[
                          {
                            required: true,
                            message: 'Vui lòng nhập phường, xã'
                          }
                        ]}
                      >
                        <Select
                          size='large'
                          placeholder='Phường/xã'
                          options={[{ label: 'Phuong 1', value: 'Phuong 1' }]}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Form>
              </div>

              <Button onClick={() => navigate('/cart')} type='text'>
                <Space>
                  <ArrowLeftOutlined />
                  Về lại giỏ hàng
                </Space>
              </Button>
            </div>
          </Col>
          <Col span={9}>
            <div className={styles.checkoutContainer}>
              <div className={styles.items}>
                {products.map((item) => (
                  <div className={styles.item} key={item.title}>
                    <div className={styles.image}>
                      <img src={item.product?.images?.[0]?.url} alt='' />
                    </div>
                    <div className={styles.content}>
                      <div className={styles.title}>{item?.product?.title}</div>
                      <div className={styles.price}>{item.price}</div>
                      {item.size ? <div className={styles.size}>Kích thước: {item.size}</div> : null}
                      <div className={styles.quantity}>Số lượng: {item.count}</div>
                    </div>
                  </div>
                ))}
              </div>
              <Divider />
              {/* <Input
                placeholder='Nhập mã giảm giá'
                defaultValue={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                value={coupon}
                suffix={
                  <Button type='primary' size='small' onClick={onApplyCoupon}>
                    Áp dụng
                  </Button>
                }
              />
              <Divider /> */}
              {/* <div className={styles.prices}>
                <div className={styles.item}>
                  <span>Tổng</span>
                  <span>{getSubTotal()}</span>
                </div>
                <div className={styles.item}>
                  <span>Phí vận chuyển</span>
                  <span>{shippingFee}</span>
                </div>
              </div>
              <Divider /> */}
              <div className={styles.footer}>
                <div className={styles.total}>
                  <span>Tổng</span>
                  <span>{cartTotal}</span>
                </div>
                <div className={styles.btns}>
                  <Button type='primary' htmlType='submit' form='checkoutForm' className={styles.checkout} size='large'>
                    Hoàn tất đặt hàng
                  </Button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Checkout
