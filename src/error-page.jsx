import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'
import { useRouteError } from 'react-router-dom'
import styles from './error-page.module.scss'

export default function ErrorPage() {
  const navigate = useNavigate()
  const error = useRouteError()
  console.error(error)

  return (
    <div id='error-page' className={styles.ErrorPage}>
      <div className={styles.container}>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error?.statusText || error?.message}</i>
        </p>
        <Button onClick={() => navigate('/')} type='primary'>
          Trở về trang chủ
        </Button>
      </div>
    </div>
  )
}
