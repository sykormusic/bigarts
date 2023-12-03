import { DeleteOutlined } from '@ant-design/icons'
import { Button, Drawer, Tooltip } from 'antd'
import styles from './index.module.scss'
import { useNavigate } from 'react-router-dom'

const CartDrawer = ({ open, onClose = () => {} }) => {
  const navigate = useNavigate()
  const items = [
    {
      title: 'iPhone 13 Pro Max Dark Grey',
      price: 1000000,
      size: 'Large',
      quantity: 1
    },
    {
      title: 'Sony A7',
      price: 2300000,
      quantity: 1
    },
    {
      title: 'iPhone 13 Pro Max Dark Grey',
      price: 1000000,
      size: 'Large',
      quantity: 1
    },
    {
      title: 'Sony A7',
      price: 2300000,
      quantity: 1
    }
  ]
  return (
    <Drawer
      title='Your Cart'
      placement='right'
      closable={false}
      onClose={onClose}
      open={open}
      className={styles.CartDrawer}
      extra={<span>{items.length} items</span>}
    >
      <div className={styles.items}>
        {items.map((item) => (
          <div className={styles.item} key={item.title}>
            <div className={styles.left}>
              <div className={styles.image}>
                <img src='https://picsum.photos/500/500' alt='' />
              </div>
              <div className={styles.content}>
                <div className={styles.title}>{item.title}</div>
                <div className={styles.price}>${item.price}</div>
                <div className={styles.size}>Size: {item.size}</div>
                <div className={styles.quantity}>Quantity: {item.quantity}</div>
              </div>
            </div>
            <div className={styles.right}>
              <Tooltip title='Remove'>
                <Button className={styles.remove} danger type='default'>
                  <DeleteOutlined />
                </Button>
              </Tooltip>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.footer}>
        <div className={styles.total}>
          <span>Total</span>
          <span>${items.reduce((total, item) => total + item.price, 0)}</span>
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
            View cart
          </Button>
          <Button type='primary' className={styles.checkout} size='large'>
            Checkout
          </Button>
        </div>
      </div>
    </Drawer>
  )
}

export default CartDrawer
