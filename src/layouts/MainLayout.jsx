import Header from '@/components/Header'
import { Outlet } from 'react-router-dom'
import styles from './MainLayout.module.scss'
import Footer from '@/components/Footer'
import TopBar from '@/components/TopBar'
import NavBar from '@/components/NavBar'
import { FloatButton } from 'antd'
import Breadcrumb from '@/components/Breadcrumb'
import { useEffect } from 'react'
import { goToTop } from '@/utils/functions'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getCategoriesAPI } from '@/store/reducers/categorySlice'

const MainLayout = () => {
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    goToTop()
  }, [location.pathname])

  useEffect(() => {
    dispatch(getCategoriesAPI())
  }, [])

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

      <FloatButton.BackTop
        style={{
          right: 24,
          bottom: 24
        }}
      />
    </div>
  )
}

export default MainLayout
