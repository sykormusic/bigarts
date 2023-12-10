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
      label: 'Miễn phí vận chuyển',
      description: 'Đơn trên 10 triệu VNĐ',
      icon: <CarOutlined />
    },
    {
      key: 2,
      label: 'Nhiều ưu đãi hấp dẫn',
      description: 'Lên đến 50%',
      icon: <GiftOutlined />
    },
    {
      key: 3,
      label: 'Hỗ trợ 24/7',
      description: 'Nhanh chóng, tiện lợi',
      icon: <CustomerServiceOutlined />
    },
    {
      key: 4,
      label: 'Giá cả phải chăng',
      description: 'Chất lượng tốt',
      icon: <DollarOutlined />
    },
    {
      key: 5,
      label: 'Thanh toán bảo mật',
      description: '100% an toàn',
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
