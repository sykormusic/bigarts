import styles from './index.module.scss'
import { useNavigate } from 'react-router-dom'

const ProductItem = (props) => {
  const navigate = useNavigate()
  const { data: { id, name, image, price } = {} } = props

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
        <h1>{name}</h1>
        <h3>{price}</h3>
      </div>
    </div>
  )
}

export default ProductItem
