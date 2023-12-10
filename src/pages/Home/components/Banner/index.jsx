import { getSpecialProducts } from '@/store/reducers/homeSlice'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.scss'

const Banner = () => {
  const { specialProducts = [] } = useSelector((state) => state.home)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    dispatch(getSpecialProducts())
  }, [])

  return (
    <div className={styles.Banner}>
      <div className={styles.container}>
        {/* <div className={styles.carousel}>
          <Carousel autoplay>
            {images.map((image) => (
              <div key={image} className={styles.carouselItem}>
                <img src={image} />
              </div>
            ))}
          </Carousel>
        </div> */}
        {specialProducts.slice(0, 5).map((item, index) => (
          <div
            key={item._id}
            className={styles.item}
            style={{
              gridArea: `otherItem${index + 1}`
            }}
            onClick={() => navigate(`/products/${item._id}`)}
          >
            <div className={styles.texts}>
              <span className={styles.type}>{item.tags}</span>
              <h3>{item.title}</h3>
              {/* <span className={styles.description}>{item.description}</span> */}
            </div>
            <div className={styles.image}>
              <img src={item.images?.[0]?.url} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Banner
