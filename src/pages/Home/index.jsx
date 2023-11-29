import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.scss'

const Home = () => {
  const navigate = useNavigate()
  return (
    <div className={styles.Home}>
      <div>Home</div>
      <Button
        type='primary'
        onClick={() => {
          navigate('/products/1')
        }}
      >
        View a product
      </Button>
    </div>
  )
}

export default Home
