import { getMyOrdersAPI } from '@/store/reducers/userSlice'
import { formatDate, renderMoney } from '@/utils/functions'
import { Badge, Col, Empty, Row, Spin, Tag } from 'antd'
import { isEmpty } from 'lodash'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import styles from './index.module.scss'

const STATUSES = {
  NOT_PROCESSED: 'Not Processed',
  CASH_ON_DELIVERY: 'Cash on Delivery',
  PROCESSING: 'Processing',
  DISPATCHED: 'Dispatched',
  CANCELLED: 'Cancelled',
  DELIVERED: 'Delivered'
}

const COLOR_STATUS = {
  [STATUSES.CASH_ON_DELIVERY]: 'blue',
  [STATUSES.NOT_PROCESSED]: 'gray',
  [STATUSES.PROCESSING]: 'orange',
  [STATUSES.DISPATCHED]: 'purple',
  [STATUSES.CANCELLED]: 'red',
  [STATUSES.DELIVERED]: 'green'
}

const MyOrders = () => {
  const dispatch = useDispatch()
  const { myOrders = [], loadingGetMyOrders } = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(getMyOrdersAPI())
  }, [])

  const _renderOrder = (order) => {
    const orderAddress = [
      order.paymentAddress?.address,
      order.paymentAddress?.ward,
      order.paymentAddress?.district,
      order.paymentAddress?.state
    ]
      .filter(Boolean)
      .join(', ')

    const orderByInfo = !isEmpty(order.paymentInfo)
      ? [`${order.paymentInfo?.firstName} ${order.paymentInfo?.lastName}`, order.paymentInfo?.mobile]
          .filter(Boolean)
          .join(', ')
      : null

    return (
      <div key={order._id} className={styles.order}>
        <div className={styles.orderHeader}>
          <h3>Đơn hàng</h3>
          <Tag color={COLOR_STATUS[order.orderStatus]}>{order.orderStatus}</Tag>
        </div>
        <div className={styles.orderBody}>
          <Row className={styles.orderItem} gutter={[12, 12]}>
            <Col span={8}>Ngày tạo</Col>
            <Col span={16}>{formatDate(order.createdAt)}</Col>
            {/* 
            <Col span={8}>Mã đơn hàng</Col>
            <Col span={16}>{order._id}</Col> */}

            <Col span={8}>Tiền đơn hàng</Col>
            <Col
              span={16}
              style={{
                fontWeight: 700,
                fontSize: 18,
                color: 'var(--orange)'
              }}
            >
              {renderMoney(order.paymentIntent?.amount)}
            </Col>

            <Col span={8}>Địa chỉ giao hàng</Col>
            <Col span={16}>{orderAddress}</Col>

            <Col span={8}>Thông tin nhận hàng</Col>
            <Col span={16}>{orderByInfo}</Col>

            <Col span={8}>Sản phẩm</Col>
            <Col span={16}>
              <div className={styles.productList}>
                {(order.products || []).map((x, index) => (
                  <>
                    <Link to={`/products/${x.product?._id}`}>
                      <div className={styles.product} key={x._id}>
                        <div className={styles.left}>
                          <Badge count={x.count}>
                            <div className={styles.productImage}>
                              <img src={x.product?.images?.[0]?.url} alt={x.name} />
                            </div>
                          </Badge>
                          <p>{x.product?.title}</p>
                        </div>
                        <p className={styles.price}>{renderMoney(x.product?.price)}</p>
                      </div>
                    </Link>
                    {/* {index !== (order.products || []).length - 1 && (
                      <Divider
                        style={{
                          marginBlock: 8
                        }}
                      />
                    )} */}
                  </>
                ))}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    )
  }
  return (
    <Spin spinning={loadingGetMyOrders}>
      <div className={styles.MyOrders}>
        {isEmpty(myOrders) ? <Empty description='Chưa có đơn hàng' /> : myOrders.map((x) => _renderOrder(x))}
      </div>
    </Spin>
  )
}
export default MyOrders
