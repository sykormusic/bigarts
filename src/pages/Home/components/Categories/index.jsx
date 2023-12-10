import { useSelector } from 'react-redux'
import Item from './components/Item'
import styles from './index.module.scss'
import { useNavigate } from 'react-router-dom'
import { isEmpty } from 'lodash'

const Categories = () => {
  const navigate = useNavigate()
  const { categories = [] } = useSelector((state) => state.category)

  const getImage = (title) => {
    switch (title) {
      case 'Bàn Phím':
        return '/images/keyboard.png'
      case 'Laptop':
        return '/images/laptop.jpg'
      case 'Tai Nghe':
        return '/images/headphone.jpg'
      case 'Màn Hình':
        return '/images/tv.jpg'
      case 'Chuột máy tính':
        return '/images/mouse.png'

      default:
        return ''
    }
  }
  const items = categories.map((item) => {
    return {
      key: item._id,
      label: item.title,
      icon: <img src={item.image || getImage(item.title)} alt={item.name} />,
      onClick: () =>
        navigate(`/products`, {
          state: {
            categoryId: item._id,
            categoryName: item.title
          }
        })
    }
  })

  const rows = Math.ceil(items.length / 5)

  if (isEmpty(items)) return null
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
