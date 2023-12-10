import { getMyOrdersAPI, getMyWishlistAPI } from '@/store/reducers/authSlice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './index.module.scss'
import { Badge, Col, Row } from 'antd'
import { Tag } from 'antd'
import { Divider } from 'antd'
import { Link } from 'react-router-dom'
import ProductItem from '@/components/ProductItem'

const MyWishlist = () => {
  const dispatch = useDispatch()
  const { myWishlist = [] } = useSelector((state) => state.auth)

  useEffect(() => {
    dispatch(getMyWishlistAPI())
  }, [])

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
