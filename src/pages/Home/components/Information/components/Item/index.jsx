import styles from './index.module.scss'
const Item = ({ icon, title, subtitle, onClick = () => {} }) => {
  return (
    <div className={styles.Item} onClick={onClick}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        {!!subtitle && <div className={styles.subtitle}>{subtitle}</div>}
      </div>
    </div>
  )
}

export default Item
