import ProductItem from '@/components/ProductItem'
import { getFeaturedProducts } from '@/store/reducers/homeSlice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Title from '../Title'
import styles from './index.module.scss'
import { Button, Skeleton } from 'antd'
import { Space } from 'antd'
import { ArrowRightOutlined } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const FeaturedProducts = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { featuredProducts = [], isLoadingFeaturedProducts } = useSelector((state) => state.home)

  useEffect(() => {
    dispatch(getFeaturedProducts())
  }, [])

  return (
    <div className={styles.FeaturedProducts}>
      <Title
        title='Sản phẩm nổi bật'
        extra={
          <Button
            type='link'
            onClick={() => {
              navigate(`/products`, {
                state: {
                  tags: 'featured'
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

      {isLoadingFeaturedProducts ? (
        <Skeleton active />
      ) : (
        <div className={styles.container}>
          {featuredProducts.map((product) => (
            <ProductItem key={product._id} data={product} />
          ))}
        </div>
      )}
    </div>
  )
}

export default FeaturedProducts
