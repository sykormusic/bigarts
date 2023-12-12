import { Avatar, Rate } from 'antd'
import styles from './index.module.scss'

const Comment = ({ data }) => {
  return (
    <div className={styles.Comment}>
      <Avatar size={44} />
      <div className={styles.right}>
        <div className={styles.title}>
          <p className={styles.username}>
            {data?.postedby?.firstname} {data?.postedby?.lastname}
          </p>
          <Rate defaultValue={data?.star} disabled />
        </div>
        <p>{data?.comment}</p>
      </div>
    </div>
  )
}
Comment.propTypes = {
  data: Object
}

export default Comment
