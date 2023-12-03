import Item from './components/Item'
import styles from './index.module.scss'

import {
  CarOutlined,
  CreditCardOutlined,
  CustomerServiceOutlined,
  DollarOutlined,
  GiftOutlined
} from '@ant-design/icons'

const Information = () => {
  const items = [
    {
      key: 1,
      label: 'Free Shipping',
      description: 'From all orders over $100',
      icon: <CarOutlined />
    },
    {
      key: 2,
      label: 'Daily Surprise Offers',
      description: 'Save up to 25% off',
      icon: <GiftOutlined />
    },
    {
      key: 3,
      label: 'Support 24/7',
      description: 'Shop with an expert',
      icon: <CustomerServiceOutlined />
    },
    {
      key: 4,
      label: 'Affordable Prices',
      description: 'Get Factory Default Price',
      icon: <DollarOutlined />
    },
    {
      key: 5,
      label: 'Secure Payments',
      description: '100% Protected',
      icon: <CreditCardOutlined />
    }
  ]
  return (
    <div className={styles.Information}>
      {items.map((item) => (
        <Item key={item.key} icon={item.icon} title={item.label} subtitle={item.description} />
      ))}
    </div>
  )
}

export default Information
