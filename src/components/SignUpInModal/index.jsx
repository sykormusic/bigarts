import { SIGN_UP_SIGN_IN } from '@/utils/constants'
import { Form, Input, Modal, Button } from 'antd'
import { useEffect } from 'react'

const SignUpInModal = ({ open, onCancel, type = '', onSwitch = () => {} }) => {
  const [form] = Form.useForm()
  const onSignIn = (values) => {
    console.log('🚀  ~ Sign In Values:', values)
  }

  const onSignUp = (values) => {
    console.log('🚀  ~ Sign Up Values:', values)
  }

  useEffect(() => {
    if (open) {
      form.resetFields()
    }
  }, [open])

  const _renderSignIn = () => {
    return (
      <Modal
        open={open}
        onCancel={onCancel}
        title='Sign in'
        footer={[
          <Button type='link' onClick={onSwitch} key='cancel'>
            Sign Up
          </Button>,
          <Button type='primary' htmlType='submit' key='submit' form='signInForm'>
            Submit
          </Button>
        ]}
      >
        <Form
          name='signInForm'
          form={form}
          labelCol={{
            span: 6
          }}
          wrapperCol={{
            span: 18
          }}
          onFinish={onSignIn}
          autoComplete='off'
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
            <Input placeholder='Input your email' />
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
            <Input.Password placeholder='Input your password' />
          </Form.Item>
        </Form>
      </Modal>
    )
  }

  const _renderSignUp = () => {
    return (
      <Modal
        open={open}
        onCancel={onCancel}
        title='Sign Up'
        footer={[
          <Button type='link' onClick={onSwitch} key='cancel'>
            Sign In
          </Button>,
          <Button type='primary' htmlType='submit' key='submit' form='signUpForm'>
            Submit
          </Button>
        ]}
      >
        <Form
          name='signUpForm'
          form={form}
          labelCol={{
            span: 6
          }}
          wrapperCol={{
            span: 18
          }}
          onFinish={onSignUp}
          autoComplete='off'
        >
          <Form.Item
            label='Name'
            name='name'
            rules={[
              {
                required: true,
                message: 'Please input your name!'
              }
            ]}
          >
            <Input placeholder='Input your name' />
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
            <Input placeholder='Input your email' />
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
            <Input.Password placeholder='Input your password' />
          </Form.Item>
        </Form>
      </Modal>
    )
  }

  if (type === SIGN_UP_SIGN_IN.MODAL_TYPE.SIGN_IN) {
    return _renderSignIn()
  } else {
    return _renderSignUp()
  }
}

export default SignUpInModal
