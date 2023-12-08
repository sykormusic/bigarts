import styles from './index.module.scss'
import { useNavigate } from 'react-router-dom'
import { HeartOutlined } from '@ant-design/icons'

const ProductItem = (props) => {
  const navigate = useNavigate()
  const { data: { _id, title, brand, images, price } = {} } = props

  return (
    <div
      className={styles.ProductItem}
      key={_id}
      onClick={() => {
        navigate(`/products/${_id}`)
      }}
    >
      <div className={styles.image}>
        <img src={images?.[0]?.url} alt='' />
      </div>
      <div className={styles.texts}>
        <span className={styles.brand}>{brand}</span>
        <h1>{title}</h1>
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
