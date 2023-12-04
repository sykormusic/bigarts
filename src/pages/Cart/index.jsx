import { ArrowRightOutlined, DeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { Button, InputNumber, Space, Table, Tooltip } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.scss'
import { Link } from 'react-router-dom'

const Cart = () => {
  const navigate = useNavigate()
  const [selectedRowKeys, setSelectedRowKeys] = useState([])

  const items = [
    {
      id: 1,
      title: 'iPhone 13 Pro Max Dark Grey',
      price: 1000000,
      size: 'Large',
      quantity: 1,
      image: 'https://picsum.photos/500/500'
    },
    {
      id: 2,
      title: 'Sony A7',
      price: 2300000,
      quantity: 2,
      image: 'https://picsum.photos/500/500'
    },
    {
      id: 3,
      title: 'iPhone 13 Pro Max Dark Grey',
      price: 1000000,
      size: 'Large',
      quantity: 1,
      image: 'https://picsum.photos/500/500'
    },
    {
      id: 4,
      title: 'Sony A7',
      price: 2300000,
      quantity: 1,
      image: 'https://picsum.photos/500/500'
    }
  ]

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text, row) => (
        <div className={styles.titleContainer}>
          <div className={styles.image}>
            <img src={row.image} alt={row.title} />
          </div>
          <div className={styles.content}>
            <div className={styles.title}>
              <Link to={`/products/${row.id}`}>{row.title}</Link>
            </div>
            {!!row.size && <div className={styles.size}>Size: {row.size}</div>}
            {!!row.color && <div className={styles.color}>Color: {row.color}</div>}
          </div>
        </div>
      )
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price'
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
      render: (text, row) => <InputNumber size='large' defaultValue={row.quantity} min={0} />
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
      render: (text, row) => <div>{row.price * row.quantity}</div>
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      align: 'center',
      render: () => (
        <Tooltip title='Remove' placement='right'>
          <Button className={styles.remove} danger type='default'>
            <DeleteOutlined />
          </Button>
        </Tooltip>
      )
    }
  ]

  const getTotal = () => {
    let total = 0
    selectedRowKeys.forEach((key) => {
      const item = items.find((i) => i.id === key)
      total += item.price * item.quantity
    })
    return total
  }

  return (
    <div className={styles.Cart}>
      <div className={styles.title}>
        <h1>Cart</h1>
        <Button type='default' size='large' danger icon={<DeleteOutlined />}>
          Clear All
        </Button>
      </div>
      <div className={styles.tableContainer}>
        <Table
          rowKey='id'
          rowSelection={{
            selectedRowKeys,
            onChange: (selectedRowKeys) => setSelectedRowKeys(selectedRowKeys)
          }}
          dataSource={items}
          bordered
          columns={columns}
          pagination={false}
          footer={() => (
            <div className={styles.summary}>
              <div className={styles.total}>Total: {getTotal()}</div>
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
            Continue Shopping
            <ShoppingCartOutlined />
          </Space>
        </Button>
        <Button
          type='primary'
          size='large'
          disabled={!selectedRowKeys.length}
          onClick={() => {
            navigate('/checkout')
          }}
        >
          <Space>
            Checkout
            <ArrowRightOutlined />
          </Space>
        </Button>
      </div>
    </div>
  )
}

export default Cart
