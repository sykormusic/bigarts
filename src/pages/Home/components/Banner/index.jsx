import { Carousel } from 'antd'
import styles from './index.module.scss'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { getSpecialProducts } from '@/store/reducers/homeSlice'

const Banner = () => {
  const { specialProducts = [] } = useSelector((state) => state.home)
  const dispatch = useDispatch()

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
