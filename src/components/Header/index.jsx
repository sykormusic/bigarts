import { SIGN_UP_SIGN_IN } from '@/utils/constants'
import { SearchOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { Badge, Button, Input, Popover } from 'antd'
import { useState } from 'react'
import SignUpInModal from '../SignUpInModal'
import styles from './index.module.scss'

const Header = () => {
  const [signUpInOpen, setSignUpInOpen] = useState({
    open: false,
    type: ''
  })

  return (
    <div className={styles.Header}>
      <div className={styles.contentWrapper}>
        <div className={styles.logo}>
          <a href='/'>SAMAZON</a>
        </div>

        <div className={styles.right}>
          <Input
            placeholder='Type to search...'
            size='large'
            allowClear
            // suffix={
            //   <Button type='primary'>
            //     <SearchOutlined />
            //   </Button>
            // }
          />
          {/* <Button
            type='link'
            onClick={() =>
              setSignUpInOpen({
                open: true,
                type: SIGN_UP_SIGN_IN.MODAL_TYPE.SIGN_UP
              })
            }
          >
            Sign up
          </Button> */}
          <Popover content='Gio hang' placement='bottomRight' trigger='click'>
            <Button type='text'>
              <Badge count={4}>
                <ShoppingCartOutlined
                  style={{
                    fontSize: 22
                  }}
                />
              </Badge>
            </Button>
          </Popover>
          <Button
            type='primary'
            size='large'
            onClick={() =>
              setSignUpInOpen({
                open: true,
                type: SIGN_UP_SIGN_IN.MODAL_TYPE.SIGN_IN
              })
            }
          >
            Sign in
          </Button>
        </div>
      </div>

      <SignUpInModal
        open={signUpInOpen.open}
        onCancel={() =>
          setSignUpInOpen({
            open: false,
            type: ''
          })
        }
        type={signUpInOpen.type}
        onSwitch={() => {
          setSignUpInOpen({
            open: true,
            type:
              signUpInOpen.type === SIGN_UP_SIGN_IN.MODAL_TYPE.SIGN_IN
                ? SIGN_UP_SIGN_IN.MODAL_TYPE.SIGN_UP
                : SIGN_UP_SIGN_IN.MODAL_TYPE.SIGN_IN
          })
        }}
      />
    </div>
  )
}

export default Header
