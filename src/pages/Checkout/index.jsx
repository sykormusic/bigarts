import { ArrowRightOutlined, DeleteOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { Button, Row, Col, Space, Table, Tooltip } from 'antd'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.scss'
import { Link } from 'react-router-dom'

const Checkout = () => {
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

  const getTotal = () => {
    let total = 0
    selectedRowKeys.forEach((key) => {
      const item = items.find((i) => i.id === key)
      total += item.price * item.quantity
    })
    return total
  }

  return (
    <div className={styles.Checkout}>
      <div className={styles.title}>
        <h1>Checkout</h1>
      </div>
      <div className={styles.container}>
        <Row gutter={[24, 24]}>
          <Col span={16}>
            <div className={styles.infoContainer}>Info</div>
          </Col>
          <Col span={8}>
            <div className={styles.checkoutContainer}>
              <span>Total</span>
              <span>{getTotal()}</span>
              <div className={styles.buttons}>
                <Button
                  type='primary'
                  size='large'
                  style={{
                    width: '100%'
                  }}
                >
                  <Space>
                    Complete
                    <ArrowRightOutlined />
                  </Space>
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}

export default Checkout
