import { Button, Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.scss'
import { useDispatch } from 'react-redux'
import { signupAPI } from '@/store/reducers/authSlice'
import { notification } from 'antd'
import { useSelector } from 'react-redux'
import { message } from 'antd'

const SignUp = () => {
  const { isLoadingSignUp } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [form] = Form.useForm()
  const onSignUp = async (values) => {
    const res = await dispatch(signupAPI(values))
    if (res.payload?._id) {
      message.success('Đăng ký thành công.')
      navigate('/login')
    } else {
      message.error(res?.payload?.message)
    }
  }

  return (
    <div className={styles.SignUp}>
      <div className={styles.container}>
        <span className={styles.title}>Sign Up</span>
        <Form name='signInForm' form={form} onFinish={onSignUp} autoComplete='off' layout='vertical'>
          <Form.Item
            label='First Name'
            name='firstname'
            rules={[
              {
                required: true,
                message: 'Please input your first name!'
              }
            ]}
          >
            <Input size='large' placeholder='Input your first name' />
          </Form.Item>
          <Form.Item
            label='Last Name'
            name='lastname'
            rules={[
              {
                required: true,
                message: 'Please input your first name!'
              }
            ]}
          >
            <Input size='large' placeholder='Input your first name' />
          </Form.Item>
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
            label='Phone Number'
            name='mobile'
            rules={[
              {
                required: true,
                message: 'Please input your phone number!'
              }
            ]}
          >
            <Input type='text' size='large' placeholder='Input your phone number' />
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

          <div className={styles.footer}>
            <Button type='primary' htmlType='submit' size='large' loading={isLoadingSignUp}>
              Sign Up
            </Button>
            <Button
              type='link'
              color='default'
              size='large'
              onClick={() => {
                navigate('/login')
              }}
            >
              Login
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default SignUp
