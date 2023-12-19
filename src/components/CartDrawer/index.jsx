import { DeleteOutlined } from '@ant-design/icons'
import { Button, Drawer, Tooltip } from 'antd'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.scss'
import { useDispatch } from 'react-redux'
import { getUserCartAPI, removeFromCart, userCartAPI } from '@/store/reducers/cartSlice'
import { useEffect } from 'react'
import { Spin } from 'antd'
import { renderMoney } from '@/utils/functions'

const CartDrawer = ({ open, onClose = () => {} }) => {
  const {
    cart: { products = [], cartTotal },
    loadingGetCart = false
  } = useSelector((state) => state.cart)
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onRemoveItem = async (id) => {
    await dispatch(
      userCartAPI({
        cart: products.filter((item) => item._id !== id).map((item) => ({ _id: item.product?._id, count: item.count }))
      })
    )
    dispatch(getUserCartAPI())
  }

  const onCheckout = () => {
    onClose()
    navigate('/checkout')
  }

  useEffect(() => {
    if (user && open) {
      dispatch(getUserCartAPI())
    }
  }, [user, open])

  return (
    <Drawer
      title='Giỏ hàng'
      placement='right'
      closable={false}
      onClose={onClose}
      open={open}
      className={styles.CartDrawer}
      extra={<span>Số lượng: {products.length}</span>}
    >
      <Spin spinning={loadingGetCart}>
        <div className={styles.items}>
          {products.map((item) => (
            <div className={styles.item} key={item._id}>
              <div className={styles.left}>
                <div className={styles.image}>
                  <img src={item.product?.images?.[0]?.url} alt='' />
                </div>
                <div className={styles.content}>
                  <div className={styles.title}>{item.product?.title}</div>
                  <div className={styles.price}>{renderMoney(item.price)}</div>
                  {item.size ? <div className={styles.size}>Kích thước: {item.size}</div> : null}
                  <div className={styles.quantity}>Số lượng: {item.count}</div>
                </div>
              </div>
              <div className={styles.right}>
                <Tooltip title='Xóa khỏi giỏ hàng'>
                  <Button className={styles.remove} danger type='default' onClick={() => onRemoveItem(item._id)}>
                    <DeleteOutlined />
                  </Button>
                </Tooltip>
              </div>
            </div>
          ))}
        </div>
      </Spin>
      <div className={styles.footer}>
        <div className={styles.total}>
          <span>Tổng</span>
          <span>{renderMoney(cartTotal)}</span>
        </div>
        <div className={styles.btns}>
          <Button
            type='primary'
            className={styles.viewCart}
            size='large'
            onClick={() => {
              onClose()
              navigate('/cart')
            }}
          >
            Xem giỏ hàng
          </Button>
          <Button type='primary' className={styles.checkout} size='large' onClick={onCheckout}>
            Thanh toán
          </Button>
        </div>
      </div>
    </Drawer>
  )
}

export default CartDrawer
