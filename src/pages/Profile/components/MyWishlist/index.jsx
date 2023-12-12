import ProductItem from '@/components/ProductItem'
import { Empty } from 'antd'
import { isEmpty } from 'lodash'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './index.module.scss'
import { getMyWishlistAPI } from '@/store/reducers/userSlice'

const MyWishlist = () => {
  const dispatch = useDispatch()
  const { myWishlist = [] } = useSelector((state) => state.user)

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
