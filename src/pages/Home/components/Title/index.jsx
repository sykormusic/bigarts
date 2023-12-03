import styles from './index.module.scss'

const Title = ({ title = '', extra = null }) => {
  return (
    <div className={styles.Title}>
      <div className={styles.title}>{title}</div>
      {extra}
    </div>
  )
}

export default Title
