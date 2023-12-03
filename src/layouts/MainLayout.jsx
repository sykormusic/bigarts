import Header from '@/components/Header'
import { Outlet } from 'react-router-dom'
import styles from './MainLayout.module.scss'
import Footer from '@/components/Footer'

const MainLayout = () => {
  return (
    <div className={styles.MainLayout}>
      <Header />
      <div className={styles.body}>
        <Outlet />
      </div>
      <Footer />
    </div>
  )
}

export default MainLayout
