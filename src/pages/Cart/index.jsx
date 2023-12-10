import { emptyCartAPI, getUserCartAPI, removeFromCart, updateCartQty } from '@/store/reducers/cartSlice'
import { ArrowRightOutlined, DeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { Button, InputNumber, Space, Table, Tooltip } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import styles from './index.module.scss'
import { useEffect } from 'react'
import { renderMoney } from '@/utils/functions'

const Cart = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {
    cart: { products = [], cartTotal },
    loadingGetCart = false
  } = useSelector((state) => state.cart)

  const onRemoveItem = (id) => {
    dispatch(removeFromCart(id))
  }

  const onClearCart = () => {
    dispatch(emptyCartAPI())
  }

  const onChangeQty = (id, qty) => {
    dispatch(
      updateCartQty({
        _id: id,
        count: qty
      })
    )
  }

  const onCheckout = async () => {
    navigate('/checkout')
  }

  useEffect(() => {
    dispatch(getUserCartAPI())
  }, [])

  const columns = [
    {
      title: 'Sản phẩm',
      dataIndex: 'product',
      key: 'title',
      render: (product = {}, row) => (
        <div className={styles.titleContainer}>
          <div className={styles.image}>
            <img src={product.images?.[0]?.url} alt={row.title} />
          </div>
          <div className={styles.content}>
            <div className={styles.title}>
              <Link to={`/products/${product?._id}`}>{product?.title}</Link>
            </div>
            {!!row.size && <div className={styles.size}>Size: {row.size}</div>}
            {!!row.color && <div className={styles.color}>Color: {row.color}</div>}
          </div>
        </div>
      )
    },
    {
      title: 'Giá',
      dataIndex: 'product',
      key: 'price',
      render: (product) => <div>{renderMoney(product.price)}</div>
    },
    {
      title: 'Số lượng',
      dataIndex: 'qty',
      key: 'qty',
      render: (text, row) => (
        <InputNumber size='large' defaultValue={row.count} min={1} onChange={(val) => onChangeQty(row._id, val)} />
      )
    },
    {
      title: 'Tổng tiền',
      dataIndex: 'price',
      key: 'total',
      render: (price, row) => <div>{price * row.count}</div>
    },
    {
      title: 'Thao tác',
      dataIndex: 'action',
      key: 'action',
      align: 'center',
      render: (_, row) => (
        <Tooltip title='Remove' placement='right'>
          <Button className={styles.remove} danger type='default' onClick={() => onRemoveItem(row._id)}>
            <DeleteOutlined />
          </Button>
        </Tooltip>
      )
    }
  ]

  const getTotal = () => {
    return renderMoney(cartTotal)
  }

  return (
    <div className={styles.Cart}>
      <div className={styles.title}>
        <h1>Giỏ hàng</h1>
        <Button
          type='default'
          size='large'
          danger
          icon={<DeleteOutlined />}
          onClick={onClearCart}
          disabled={products.length === 0}
        >
          Xoá tất cả
        </Button>
      </div>
      <div className={styles.tableContainer}>
        <Table
          rowKey='_id'
          dataSource={products}
          bordered
          columns={columns}
          loading={loadingGetCart}
          pagination={false}
          footer={() => (
            <div className={styles.summary}>
              <div className={styles.total}>Tổng tiền: {getTotal()}</div>
            </div>
          )}
        />
      </div>
      <div className={styles.buttons}>
        <Button
          type='default'
          size='large'
          onClick={() => {
            navigate('/')
          }}
        >
          <Space>
            Tiếp tục mua hàng
            <ShoppingCartOutlined />
          </Space>
        </Button>
        <Button type='primary' size='large' onClick={onCheckout} disabled={products.length === 0}>
          <Space>
            Thanh toán
            <ArrowRightOutlined />
          </Space>
        </Button>
      </div>
    </div>
  )
}

export default Cart
