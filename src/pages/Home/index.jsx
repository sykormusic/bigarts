import Banner from './components/Banner'
import FeaturedProducts from './components/FeaturedProducts'
import NewProducts from './components/NewProducts'
import styles from './index.module.scss'

const Home = () => {
  return (
    <div className={styles.Home}>
      <Banner />
      <NewProducts />
      <FeaturedProducts />
    </div>
  )
}

export default Home
