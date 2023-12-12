import { resetPwdAPI } from '@/store/reducers/authSlice'
import { Button, Form, Input, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import styles from './index.module.scss'

const ResetPassword = () => {
  const { isLoadingForgot } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const location = useLocation()
  console.log('🚀 ~ file: index.jsx:13 ~ ResetPassword ~ location:', location)
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const token = location.pathname.split('/').pop()

  const onSubmit = async (values) => {
    const res = await dispatch(
      resetPwdAPI({
        password: values.password,
        token
      })
    )
    if (res.payload?.response?.data?.status === 'fail') {
      message.error(res?.payload?.response?.data?.message)
    } else {
      message.success('Đặt lại mật khẩu thành công!')
      navigate('/login')
    }
  }

  return (
    <div className={styles.ResetPassword}>
      <div className={styles.container}>
        <span className={styles.title}>Đặt lại mật khẩu mới</span>
        <Form form={form} onFinish={onSubmit} autoComplete='off' layout='vertical'>
          <Form.Item
            label='Mật khẩu mới'
            name='password'
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập mật khẩu.'
              }
            ]}
          >
            <Input.Password size='large' placeholder='Mật khẩu mới' />
          </Form.Item>

          <div className={styles.footer}>
            <Button type='primary' htmlType='submit' size='large' loading={isLoadingForgot}>
              Xác nhận
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default ResetPassword
