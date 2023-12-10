import { getMyOrdersAPI } from '@/store/reducers/authSlice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './index.module.scss'
import { Badge, Col, Row } from 'antd'
import { Tag } from 'antd'
import { Divider } from 'antd'
import { Link } from 'react-router-dom'

const MyOrders = () => {
  const dispatch = useDispatch()
  const { myOrders = [] } = useSelector((state) => state.auth)
  console.log('🚀  ~ myOrders:', myOrders)

  useEffect(() => {
    dispatch(getMyOrdersAPI())
  }, [])

  const _renderOrder = (order) => {
    return (
      <div key={order._id} className={styles.order}>
        <div className={styles.orderHeader}>
          <h3>Đơn hàng</h3>
          <Tag color='green'>{order.orderStatus}</Tag>
        </div>
        <div className={styles.orderBody}>
          <Row className={styles.orderItem} gutter={[12, 12]}>
            <Col span={8}>Ngày tạo</Col>
            <Col span={16}>{order.createdAt}</Col>

            <Col span={8}>Mã đơn hàng</Col>
            <Col span={16}>{order._id}</Col>

            <Col span={8}>Tiền đơn hàng</Col>
            <Col span={16}>{order.paymentIntent?.amount}</Col>

            <Col span={8}>Trạng thái đơn hàng</Col>
            <Col span={16}>{order.orderStatus}</Col>

            <Col span={8}>Sản phẩm</Col>
            <Col span={16}>
              <div className={styles.productList}>
                {(order.products || []).map((x, index) => (
                  <>
                    <Link to={`/product/${x.product?._id}`}>
                      <div className={styles.product} key={x._id}>
                        <div className={styles.left}>
                          <Badge count={x.count}>
                            <div className={styles.productImage}>
                              <img src={x.product?.images?.[0]?.url} alt={x.name} />
                            </div>
                          </Badge>
                          <p>{x.product?.title}</p>
                        </div>
                        <p className={styles.price}>{x.product?.price}</p>
                      </div>
                    </Link>
                    {index !== (order.products || []).length - 1 && (
                      <Divider
                        style={{
                          marginBlock: 8
                        }}
                      />
                    )}
                  </>
                ))}
              </div>
            </Col>
          </Row>
        </div>
      </div>
    )
  }

  return <div className={styles.MyOrders}>{myOrders.map((x) => _renderOrder(x))}</div>
}
export default MyOrders
