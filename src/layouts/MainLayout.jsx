import Header from '@/components/Header'
import { Outlet } from 'react-router-dom'
import styles from './MainLayout.module.scss'
import Footer from '@/components/Footer'
import TopBar from '@/components/TopBar'
import NavBar from '@/components/NavBar'
import { BackTop } from 'antd'
import Breadcrumb from '@/components/Breadcrumb'

const MainLayout = () => {
  return (
    <div className={styles.MainLayout}>
      <TopBar />
      <Header />
      <NavBar />
      <Breadcrumb />
      <div className={styles.body}>
        <Outlet />
      </div>
      <Footer />
      <BackTop  style={{
        right: 24,
        bottom: 24
      }}/>
    </div>
  )
}

export default MainLayout
