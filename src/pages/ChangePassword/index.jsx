import { changePwdAPI } from '@/store/reducers/authSlice'
import { Button, Form, Input, message } from 'antd'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.scss'

const ChangePassword = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [form] = Form.useForm()

  const onSubmit = async (values) => {
    const res = await dispatch(
      changePwdAPI({
        password: values.password,
      })
    )
    if (res.payload?.response?.data?.status === 'fail') {
      message.error(res?.payload?.response?.data?.message)
    } else {
      message.success('Đổi mật khẩu thành công!')
      navigate('/')
    }
  }

  return (
    <div className={styles.ChangePassword}>
      <div className={styles.container}>
        <span className={styles.title}>Đổi mật khẩu</span>
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
            <Button type='primary' htmlType='submit' size='large'>
              Xác nhận
            </Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

export default ChangePassword
