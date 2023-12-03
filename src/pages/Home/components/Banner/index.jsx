import { Carousel } from 'antd'
import styles from './index.module.scss'

const Banner = () => {
  const images = ['https://picsum.photos/1024/500', 'https://picsum.photos/1024/500', 'https://picsum.photos/1024/500']
  return (
    <div className={styles.Banner}>
      <Carousel autoplay>
        {images.map((image) => (
          <div key={image} className={styles.item}>
            <img src={image} />
            {/* <div className={styles.texts}>
              <h1>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut.</h1>
              <h3>Enim ut tellus elementum sagittis vitae et. Dui ut ornare lectus sit amet. </h3>
            </div> */}
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default Banner
