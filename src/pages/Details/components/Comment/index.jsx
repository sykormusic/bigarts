import { Avatar, Rate } from 'antd'
import styles from './index.module.scss'

const Comment = ({ data }) => {
  return (
    <div className={styles.Comment}>
      <Avatar size={44} />
      <div className={styles.right}>
        <Rate defaultValue={data?.star} disabled />
        <p>{data?.comment}</p>
      </div>
    </div>
  )
}
Comment.propTypes = {
  data: Object
}

export default Comment
