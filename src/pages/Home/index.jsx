import Banner from './components/Banner'
import Brands from './components/Brands'
import Categories from './components/Categories'
import FeaturedProducts from './components/FeaturedProducts'
import Information from './components/Information'
import PopularProducts from './components/PopularProducts'
import styles from './index.module.scss'

const Home = () => {
  return (
    <div className={styles.Home}>
      <Banner />
      <Information />
      <Categories />
      {/* <NewProducts /> */}
      <FeaturedProducts />
      <PopularProducts />
      <Brands />
    </div>
  )
}

export default Home
