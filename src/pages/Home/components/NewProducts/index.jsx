import { Carousel } from 'antd'
import styles from './index.module.scss'
import Title from '../Title'
import ProductItem from '@/components/ProductItem'

const NewProducts = () => {
  const products = [
    {
      id: 1,
      name: 'Product 1',
      image: 'https://picsum.photos/500/500',
      price: 1000000
    },
    {
      id: 2,
      name: 'Product 2',
      image: 'https://random.imagecdn.app/500/150',
      price: 3000000
    },
    {
      id: 3,
      name: 'Product 3',
      image: 'https://random.imagecdn.app/500/200',
      price: 6000000
    }
  ]
  return (
    <div className={styles.NewProducts}>
      <Title title='New Products' />

      <div className={styles.container}>
        {products.map((product) => (
          <ProductItem key={product.id} data={product} />
        ))}
      </div>
    </div>
  )
}

export default NewProducts
