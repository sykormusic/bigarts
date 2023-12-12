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
        <span className={styles.title}>Đăng ký</span>
        <Form name='signInForm' form={form} onFinish={onSignUp} autoComplete='off' layout='vertical'>
          <Form.Item
            label='Họ và tên đệm'
            name='firstname'
            rules={[
              {
                required: true,
                message: 'Vui lòng điền họ và tên đệm!'
              }
            ]}
          >
            <Input size='large' placeholder='Nhập họ và tên đệm' />
          </Form.Item>
          <Form.Item
            label='Tên'
            name='lastname'
            rules={[
              {
                required: true,
                message: 'Vui lòng điền tên!'
              }
            ]}
          >
            <Input size='large' placeholder='Nhập tên' />
          </Form.Item>
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
            label='Số điện thoại'
            name='mobile'
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập số điện thoại!'
              }
            ]}
          >
            <Input type='text' size='large' placeholder='Nhập số điện thoại' />
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

          <div className={styles.footer}>
            <Button type='primary' htmlType='submit' size='large' loading={isLoadingSignUp}>
              Đăng ký
            </Button>
            <Button
              type='link'
              color='default'
              size='large'
              onClick={() => {
                navigate('/login')
              }}
            >
              Đăng nhập
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default SignUp
