import ProductItem from '@/components/ProductItem'
import { getMyWishlistAPI } from '@/store/reducers/authSlice'
import { Empty } from 'antd'
import { isEmpty } from 'lodash'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './index.module.scss'

const MyWishlist = () => {
  const dispatch = useDispatch()
  const { myWishlist = [] } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(getMyWishlistAPI())
  }, [])

  if (isEmpty(myWishlist)) {
    return (
      <div className={styles.MyWishlist}>
        <Empty description='Danh sách trống' />
      </div>
    )
  }
  return (
    <div className={styles.MyWishlist}>
      <div className={styles.container}>
        {myWishlist.map((product) => (
          <ProductItem key={product.id} data={product} />
        ))}
      </div>
    </div>
  )
}
export default MyWishlist
