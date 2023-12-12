import { forgotPwdAPI } from '@/store/reducers/authSlice'
import { Button, Form, Input, message } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import styles from './index.module.scss'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Result from '../Result'

const ForgotPassword = () => {
  const { isLoadingForgot } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isSuccess, setIsSuccess] = useState(false)
  const [form] = Form.useForm()

  const onSubmit = async (values) => {
    const res = await dispatch(
      forgotPwdAPI({
        email: values.email
      })
    )
    if (res.payload?.response?.data?.status === 'fail') {
      message.error(res?.payload?.response?.data?.message)
    } else {
      setIsSuccess(true)
    }
  }

  return (
    <div className={styles.ForgotPassword}>
      <div className={styles.container}>
        {isSuccess ? (
          <>
            <Result
              title='Đã gửi email đặt lại mật khẩu!'
              subTitle='Vui lòng kiểm tra email.'
              extra={[
                <Button
                  key='back'
                  type='primary'
                  onClick={() => {
                    navigate('/login')
                  }}
                >
                  Đăng nhập
                </Button>
              ]}
            />
          </>
        ) : (
          <>
            <span className={styles.title}>Quên mật khẩu</span>
            <Form form={form} onFinish={onSubmit} autoComplete='off' layout='vertical'>
              <Form.Item
                label='Email'
                name='email'
                rules={[
                  {
                    required: true,
                    message: 'Please input your email!'
                  },
                  {
                    type: 'email',
                    message: 'Please input valid email!'
                  }
                ]}
              >
                <Input size='large' placeholder='Input your email' />
              </Form.Item>

              <div className={styles.footer}>
                <Button type='primary' htmlType='submit' size='large' loading={isLoadingForgot}>
                  Tiếp tục
                </Button>
              </div>
            </Form>
          </>
        )}
      </div>
    </div>
  )
}

export default ForgotPassword
