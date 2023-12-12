import { updateUserAPI } from '@/store/reducers/authSlice'
import { Button, Form, Input } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import styles from './index.module.scss'

const ChangePassword = () => {
  const dispatch = useDispatch()
  const { user } = useSelector((state) => state.auth)

  return (
    <div className={styles.ChangePassword}>
      <div className={styles.title}>
        <h3>Thông tin cá nhân</h3>
      </div>
      <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        initialValues={{
          firstname: user?.firstname,
          lastname: user?.lastname,
          mobile: user?.mobile,
          email: user?.email
        }}
        onFinish={(values) => {
          dispatch(updateUserAPI(values))
        }}
      >
        <Form.Item name='firstname' label='Họ'>
          <Input placeholder='Họ' size='large' />
        </Form.Item>

        <Form.Item name='lastname' label='Tên'>
          <Input placeholder='Tên' size='large' />
        </Form.Item>

        <Form.Item name='mobile' label='Điện thoại'>
          <Input placeholder='Điện thoại' size='large' />
        </Form.Item>

        <Form.Item name='email' label='Email'>
          <Input placeholder='Email' size='large' disabled />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
          <Button type='primary' htmlType='submit'>
            Cập nhật
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}
export default ChangePassword
