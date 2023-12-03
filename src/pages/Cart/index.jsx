import { Table, Space, Tooltip, Button, InputNumber } from 'antd'
import styles from './index.module.scss'
import { DeleteOutlined, ArrowRightOutlined } from '@ant-design/icons'
import { useState } from 'react'

const Cart = () => {
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
            <div className={styles.title}>{row.title}</div>
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
      render: (text, row) => (
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
        <Button type='default' size='large'>
          Continue Shopping
        </Button>
        <Button type='primary' size='large' disabled={!selectedRowKeys.length}>
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
