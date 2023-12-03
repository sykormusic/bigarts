import { Carousel } from 'antd'
import styles from './index.module.scss'
import Title from '../Title'
import ProductItem from '@/components/ProductItem'

const FeaturedProducts = () => {
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
    },
    {
      id: 4,
      name: 'Product 4',
      image: 'https://picsum.photos/500/500',
      price: 1000000
    },
    {
      id: 5,
      name: 'Product 5',
      image: 'https://picsum.photos/500/500',
      price: 1000000
    },
    {
      id: 6,
      name: 'Product 6',
      image: 'https://picsum.photos/500/500',
      price: 1000000
    },
    {
      id: 7,
      name: 'Product 7',
      image: 'https://picsum.photos/500/500',
      price: 1000000
    },
    {
      id: 8,
      name: 'Product 8',
      image: 'https://picsum.photos/500/500',
      price: 1000000
    }
  ]
  return (
    <div className={styles.FeaturedProducts}>
      <Title title='Featured Products' />

      <div className={styles.container}>
        {products.map((product) => (
          <ProductItem key={product.id} data={product} />
        ))}
      </div>
    </div>
  )
}

export default FeaturedProducts
