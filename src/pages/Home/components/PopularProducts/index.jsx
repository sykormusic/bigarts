import ProductItem from '@/components/ProductItem'
import { getPopularProducts } from '@/store/reducers/homeSlice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Title from '../Title'
import styles from './index.module.scss'
import { Button, Skeleton } from 'antd'
import { Space } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const PopularProducts = () => {
  const { popularProducts = [], isLoadingPopularProducts } = useSelector((state) => state.home)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getPopularProducts())
  }, [])

  return (
    <div className={styles.PopularProducts}>
      <Title
        title='Sản phẩm phổ biến'
        extra={
          <Button
            type='link'
            onClick={() => {
              navigate(`/products`, {
                state: {
                  tags: 'popular'
                }
              })
            }}
          >
            <Space>
              <span>Xem tất cả</span>
              <ArrowRightOutlined />
            </Space>
          </Button>
        }
      />

      {isLoadingPopularProducts ? (
        <Skeleton active />
      ) : (
        <div className={styles.container}>
          {popularProducts.map((product) => (
            <ProductItem key={product._id} data={product} />
          ))}
        </div>
      )}
    </div>
  )
}

export default PopularProducts
