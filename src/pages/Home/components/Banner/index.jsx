import { Carousel } from 'antd'
import styles from './index.module.scss'

const Banner = () => {
  const colors = ['#BBBEC3', '#B3DEEF', '#F0E1D3', '#B8D5CF', '#E0D0CE']
  const items = [
    {
      type: 'New Arrival',
      label: 'Laptops Max',
      description: 'From $1699 or $64.22/mo',
      image: 'https://picsum.photos/500/500'
    },
    {
      type: 'Best Sale',
      label: 'Laptops Max',
      description: 'From $1699 or $64.22/mo',
      image: 'https://picsum.photos/500/500'
    },
    {
      type: '15% Off',
      label: 'Laptops Max',
      description: 'From $1699 or $64.22/mo',
      image: 'https://picsum.photos/500/500'
    },
    {
      type: '30% Off',
      label: 'Laptops Max',
      description: 'From $1699 or $64.22/mo',
      image: 'https://picsum.photos/500/500'
    },
    {
      type: 'Free Shipping',
      label: 'Laptops Max',
      description: 'From $1699 or $64.22/mo',
      image: 'https://picsum.photos/500/500'
    }
  ]
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
        {items.map((item, index) => (
          <div
            key={item.type}
            className={styles.item}
            style={{
              gridArea: `otherItem${index + 1}`,
              backgroundColor: colors[index]
            }}
          >
            <div className={styles.texts}>
              <span className={styles.type}>{item.type}</span>
              <h1>{item.label}</h1>
              <span className={styles.description}>{item.description}</span>
            </div>
            <img src={item.image} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Banner
