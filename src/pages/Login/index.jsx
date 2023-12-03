import { Form, Button, Input } from 'antd'
import styles from './index.module.scss'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const onSignIn = (values) => {
    console.log('🚀  ~ Sign In Values:', values)
  }

  return (
    <div className={styles.Login}>
      <div className={styles.container}>
        <span className={styles.title}>Login</span>
        <Form name='signInForm' form={form} onFinish={onSignIn} autoComplete='off' layout='vertical'>
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
            <Button type='primary' htmlType='submit' size='large'>
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
