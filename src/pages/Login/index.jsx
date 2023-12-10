import { Form, Button, Input } from 'antd'
import styles from './index.module.scss'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { loginAPI } from '@/store/reducers/authSlice'
import { useSelector } from 'react-redux'
import { notification } from 'antd'
import { message } from 'antd'

const Login = () => {
  const { isLoadingLogin } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [form] = Form.useForm()

  const onSignIn = async (values) => {
    const res = await dispatch(loginAPI(values))
    if (res.payload) {
      message.success('Đăng nhập thành công.')
      navigate(-1)
    }
  }

  return (
    <div className={styles.Login}>
      <div className={styles.container}>
        <span className={styles.title}>Login</span>
        <Form
          initialValues={{
            email: 'sykormusic@gmail.com',
            password: '19052001Sam'
          }}
          name='signInForm'
          form={form}
          onFinish={onSignIn}
          autoComplete='off'
          layout='vertical'
        >
          <Form.Item
            label='Email'
            name='email'
            rules={[
              {
                required: true,
                message: 'Please input your email!'
              }
            ]}
          >
            <Input size='large' placeholder='Input your email' />
          </Form.Item>

          <Form.Item
            label='Password'
            name='password'
            rules={[
              {
                required: true,
                message: 'Please input your password!'
              }
            ]}
          >
            <Input.Password size='large' placeholder='Input your password' />
          </Form.Item>

          <a href='#'>Forgot password?</a>

          <div className={styles.footer}>
            <Button type='primary' htmlType='submit' size='large' loading={isLoadingLogin}>
              Login
            </Button>
            <Button
              type='link'
              color='default'
              size='large'
              onClick={() => {
                navigate('/sign-up')
              }}
            >
              Sign Up
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default Login
