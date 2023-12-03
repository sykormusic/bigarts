import styles from './index.module.scss'
const Item = ({ icon, label, count, onClick = () => {} }) => {
  return (
    <div className={styles.Item} onClick={onClick}>
      {!!icon && <div className={styles.icon}>{icon}</div>}
      <div className={styles.content}>
        <div className={styles.title}>{label}</div>
        {!!count && <div className={styles.subtitle}>{count} items</div>}
      </div>
    </div>
  )
}

export default Item
