import Item from './components/Item'
import styles from './index.module.scss'

import {
  CarOutlined,
  CreditCardOutlined,
  CustomerServiceOutlined,
  DollarOutlined,
  GiftOutlined
} from '@ant-design/icons'

const Categories = () => {
  const items = [
    {
      key: 1,
      label: 'Computers & Laptops',
      count: 8,
      icon: <img src='/images/laptop.jpg' alt='' />
    },
    {
      key: 2,
      label: 'Cameras & Videos',
      count: 8,
      icon: <img src='/images/camera.jpg' alt='' />
    },
    {
      key: 3,
      label: 'Smart TV',
      count: 8,
      icon: <img src='/images/tv.jpg' alt='' />
    },
    {
      key: 4,
      label: 'Smartwatches',
      count: 8,
      icon: <img src='/images/watch.jpg' alt='' />
    },
    {
      key: 5,
      label: 'Music & Gaming',
      count: 8,
      icon: <img src='/images/camera.jpg' alt='' />
    },
    {
      key: 6,
      label: 'Mobile & Tablets',
      count: 8,
      icon: <img src='/images/tab3.jpg' alt='' />
    },
    {
      key: 7,
      label: 'Headphones',
      count: 8,
      icon: <img src='/images/headphone.jpg' alt='' />
    },
    {
      key: 8,
      label: 'Accessories',
      count: 8,
      icon: <img src='/images/acc.jpg' alt='' />
    },
    {
      key: 9,
      label: 'Portable Speakers',
      count: 8,
      icon: <img src='/images/speaker.jpg' alt='' />
    },
    {
      key: 10,
      label: 'Home Appliances',
      count: 8,
      icon: <img src='/images/homeapp.jpg' alt='' />
    }
  ]

  const rows = Math.ceil(items.length / 5)
  return (
    <div className={styles.Categories}>
      <table>
        <tbody>
          {[...Array(rows)].map((_, index) => (
            <tr
              key={index}
              style={{
                borderBottom: index === rows - 1 ? 'none' : '1px solid #f0f0f0'
              }}
            >
              {items.slice(index * 5, index * 5 + 5).map((item) => (
                <td key={item.key}>
                  <Item key={item.key} {...item} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Categories
