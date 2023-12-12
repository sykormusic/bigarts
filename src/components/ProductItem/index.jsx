import styles from './index.module.scss'
import { useNavigate } from 'react-router-dom'
import { HeartOutlined, HeartFilled } from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux'
import { addToWishListAPI } from '@/store/reducers/productSlice'
import { Rate, message } from 'antd'
import { renderMoney } from '@/utils/functions'
import { Tag } from 'antd'
import { TAG_COLOR } from '@/utils/constants'
import { getMyWishlistAPI } from '@/store/reducers/userSlice'

const ProductItem = (props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { myWishlist = [] } = useSelector((state) => state.user)
  const { data: { _id, title, brand, images, price, tags, totalrating } = {} } = props

  const isInWishlist = (myWishlist || []).some((item) => item._id === _id)

  const onAddToWishList = (id) => {
    dispatch(
      addToWishListAPI({
        prodId: id
      })
    ).then(() => {
      if (!isInWishlist) {
        message.success('Đã thêm vào danh sách yêu thích')
      } else {
        message.success('Đã xoá khỏi danh sách yêu thích')
      }
      dispatch(getMyWishlistAPI())
    })
  }

  return (
    <div
      className={styles.ProductItem}
      key={_id}
      onClick={() => {
        navigate(`/products/${_id}`)
      }}
    >
      <div className={styles.image}>
        <img src={images?.[0]?.url} alt='' />
      </div>
      <div className={styles.texts}>
        <span className={styles.brand}>{brand}</span>
        <h1>{title}</h1>
        <h3 className={styles.price}>{renderMoney(price)}</h3>
        <div>
          <Tag color={TAG_COLOR[tags]} bordered={false}>
            {tags}
          </Tag>
        </div>
        <div className={styles.rating}>
          <Rate defaultValue={totalrating} disabled />
        </div>
      </div>

      <button
        type='button'
        className={styles.saveBtn}
        onClick={(e) => {
          e.stopPropagation()
          e.preventDefault()
          onAddToWishList(_id)
        }}
      >
        {isInWishlist ? (
          <HeartFilled
            style={{
              color: 'var(--red)'
            }}
          />
        ) : (
          <HeartOutlined />
        )}
      </button>
    </div>
  )
}

ProductItem.propTypes = {
  data: Object
}

export default ProductItem
