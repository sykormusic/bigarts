import ProductItem from '@/components/ProductItem'
import { getFeaturedProducts } from '@/store/reducers/homeSlice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Title from '../Title'
import styles from './index.module.scss'

const FeaturedProducts = () => {
  const { featuredProducts = [] } = useSelector((state) => state.home)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getFeaturedProducts())
  }, [])

  return (
    <div className={styles.FeaturedProducts}>
      <Title title='Sản phẩm nổi bật' />

      <div className={styles.container}>
        {featuredProducts.map((product) => (
          <ProductItem key={product._id} data={product} />
        ))}
      </div>
    </div>
  )
}

export default FeaturedProducts
