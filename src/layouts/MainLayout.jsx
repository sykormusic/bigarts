import Header from '@/components/Header'
import { Outlet } from 'react-router-dom'
import styles from './MainLayout.module.scss'

const MainLayout = () => {
  return (
    <div className={styles.MainLayout}>
      <Header />
      <div className={styles.body}>
        <Outlet />
      </div>
    </div>
  )
}

export default MainLayout
