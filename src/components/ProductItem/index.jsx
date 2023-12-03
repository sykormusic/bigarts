import styles from './index.module.scss'
import { useNavigate } from 'react-router-dom'
import { HeartOutlined } from '@ant-design/icons'

const ProductItem = (props) => {
  const navigate = useNavigate()
  const { data: { id, name, brand, image, price } = {} } = props

  return (
    <div
      className={styles.ProductItem}
      key={id}
      onClick={() => {
        navigate(`/products/${id}`)
      }}
    >
      <img src={image} alt='' />
      <div className={styles.texts}>
        <span className={styles.brand}>{brand}</span>
        <h1>{name}</h1>
        <h3>{price}</h3>
      </div>
      <button
        type='button'
        className={styles.saveBtn}
        onClick={(e) => {
          e.stopPropagation()
          e.preventDefault()
        }}
      >
        <HeartOutlined />
      </button>
    </div>
  )
}

export default ProductItem
