import ProductItem from '@/components/ProductItem'
import { getPopularProducts } from '@/store/reducers/homeSlice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Title from '../Title'
import styles from './index.module.scss'

const PopularProducts = () => {
  const { popularProducts = [] } = useSelector((state) => state.home)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getPopularProducts())
  }, [])

  return (
    <div className={styles.PopularProducts}>
      <Title title='Sản phẩm phổ biến' />

      <div className={styles.container}>
        {popularProducts.map((product) => (
          <ProductItem key={product._id} data={product} />
        ))}
      </div>
    </div>
  )
}

export default PopularProducts
