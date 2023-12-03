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
      price: 1000000,
      brand: 'Sony'
    },
    {
      id: 2,
      name: 'Product 2',
      image: 'https://random.imagecdn.app/500/150',
      price: 3000000,
      brand: 'Toshiba'
    },
    {
      id: 3,
      name: 'Product 3 asd asd asdd asd asd asd asd ',
      image: 'https://random.imagecdn.app/500/200',
      price: 6000000,
      brand: 'Samsung'
    },
    {
      id: 4,
      name: 'Product 4',
      image: 'https://picsum.photos/500/500',
      price: 1000000,
      brand: 'Sony'
    },
    {
      id: 5,
      name: 'Product 5',
      image: 'https://picsum.photos/500/500',
      price: 1000000,
      brand: 'Apple'
    },
    {
      id: 6,
      name: 'Product 6',
      image: 'https://picsum.photos/500/500',
      price: 1000000,
      brand: 'Samsung'
    },
    {
      id: 7,
      name: 'Product 7',
      image: 'https://picsum.photos/500/500',
      price: 1000000,
      brand: 'Philips'
    },
    {
      id: 8,
      name: 'Product 8',
      image: 'https://picsum.photos/500/500',
      price: 1000000,
      brand: 'Sony'
    }
  ]
  return (
    <div className={styles.FeaturedProducts}>
      <Title title='Featured Collection' />

      <div className={styles.container}>
        {products.map((product) => (
          <ProductItem key={product.id} data={product} />
        ))}
      </div>
    </div>
  )
}

export default FeaturedProducts
