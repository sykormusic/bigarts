import { Dropdown } from 'antd'
import styles from './index.module.scss'
const Item = ({ icon, title, subtitle, onClick = () => {}, menuItems }) => {
  const renderItem = () => {
    return (
      <div className={styles.Item}>
        <div className={styles.icon}>{icon}</div>
        <div className={styles.content}>
          <div className={styles.title}>{title}</div>
          {!!subtitle && <div className={styles.subtitle}>{subtitle}</div>}
        </div>
      </div>
    )
  }

  console.log('🚀  ~ menuItems:', menuItems)
  if (menuItems) {
    return (
      <Dropdown
        menu={{
          items: menuItems
        }}
      >
        {renderItem()}
      </Dropdown>
    )
  }
  return <div onClick={onClick}>{renderItem()}</div>
}

export default Item
