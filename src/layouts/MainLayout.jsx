import Breadcrumb from '@/components/Breadcrumb'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import NavBar from '@/components/NavBar'
import TopBar from '@/components/TopBar'
import { getCategoriesAPI } from '@/store/reducers/categorySlice'
import { goToTop } from '@/utils/functions'
import { FloatButton } from 'antd'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useLocation } from 'react-router-dom'
import styles from './MainLayout.module.scss'
import { getUserCartAPI } from '@/store/reducers/cartSlice'

const MainLayout = () => {
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const location = useLocation()

  useEffect(() => {
    goToTop()
  }, [location.pathname])

  useEffect(() => {
    dispatch(getCategoriesAPI())
  }, [])

  useEffect(() => {
    if (user) {
      dispatch(getUserCartAPI())
    }
  }, [user, open])

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
