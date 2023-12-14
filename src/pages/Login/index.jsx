import { loginAPI } from '@/store/reducers/authSlice'
import { Button, Form, Input, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.scss'

const Login = () => {
  const { isLoadingLogin } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [form] = Form.useForm()

  const onSignIn = async (values) => {
    const res = await dispatch(loginAPI(values))
    if (res.payload?.status === 200) {
      message.success('Đăng nhập thành công.')
      navigate('/')
    }
  }

  return (
    <div className={styles.Login}>
      <div className={styles.container}>
        <span className={styles.title}>Đăng nhập</span>
        <Form name='signInForm' form={form} onFinish={onSignIn} autoComplete='off' layout='vertical'>
          <Form.Item
            label='Email'
            name='email'
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập email'
              },
              {
                type: 'email',
                message: 'Vui lòng điền đúng định dạng email'
              }
            ]}
          >
            <Input size='large' placeholder='Nhập email của bạn' />
          </Form.Item>

          <Form.Item
            label='Mật khẩu'
            name='password'
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập mật khẩu!'
              }
            ]}
          >
            <Input.Password size='large' placeholder='Nhập mật khẩu' />
          </Form.Item>

          <a href='/forgot-password'>Quên mật khẩu?</a>

          <div className={styles.footer}>
            <Button type='primary' htmlType='submit' size='large' loading={isLoadingLogin}>
              Đăng nhập
            </Button>
            <Button
              type='link'
              color='default'
              size='large'
              onClick={() => {
                navigate('/sign-up')
              }}
            >
              Đăng ký
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default Login
