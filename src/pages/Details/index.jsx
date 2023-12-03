import { useParams } from 'react-router-dom'
import styles from './index.module.scss'
import { useEffect } from 'react'
import { goToTop } from '@/utils/functions'

const Details = () => {
  const { id } = useParams()
  console.log('🚀  ~ id:', id)

  useEffect(() => {
    goToTop()
  }, [])

  return (
    <div className={styles.Details}>
      <div>Detail Product {id}</div>
    </div>
  )
}

export default Details
