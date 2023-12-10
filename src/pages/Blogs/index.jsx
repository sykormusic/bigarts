import { Card, Skeleton } from 'antd'
import styles from './index.module.scss'
import { useDispatch } from 'react-redux'
import { dislikeBlogAPI, getBlogsAPI, likeBlogAPI } from '@/store/reducers/blogSlice'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Tag } from 'antd'
import { useNavigate } from 'react-router-dom'
import { DislikeFilled, EyeFilled, LikeFilled } from '@ant-design/icons'
import { isEmpty } from 'lodash'
import { Space } from 'antd'

const { Meta } = Card

const Blogs = () => {
  const { user } = useSelector((state) => state.auth)
  const { isLoadingBlogs, blogs = [] } = useSelector((state) => state.blog)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const getData = () => {
    dispatch(getBlogsAPI())
  }

  useEffect(() => {
    getData()
  }, [])

  const onLike = async (id) => {
    if (!user) {
      return
    }
    const res = await await dispatch(
      likeBlogAPI({
        blogId: id
      })
    )

    if (res.payload?._id) {
      getData()
    }
  }

  const onDislike = async (id) => {
    if (!user) {
      return
    }
    const res = await dispatch(
      dislikeBlogAPI({
        blogId: id
      })
    )

    if (res.payload?._id) {
      getData()
    }
  }

  return (
    <div className={styles.Blogs}>
      <div className={styles.title}>
        <h1>Blog</h1>
      </div>
      {isLoadingBlogs ? (
        <div className={styles.loadingContainer}>
          <Skeleton loading={isLoadingBlogs} active />
        </div>
      ) : (
        <div className={styles.container}>
          {blogs.map((item) => (
            <Card
              key={item._id}
              hoverable
              onClick={() => navigate(`/blogs/${item._id}`)}
              cover={!isEmpty(item.images) && <img alt={item.title} src={item.images?.[0]?.url} />}
              actions={[
                <div key='views' onClick={() => navigate(`/blogs/${item._id}`)}>
                  <EyeFilled /> {item.numViews}
                </div>,
                <div
                  key='likes'
                  onClick={(e) => {
                    e.stopPropagation()
                    onLike(item._id)
                  }}
                >
                  <LikeFilled
                    style={{
                      color: item.isLiked == true ? 'var(--blue)' : null
                    }}
                  />{' '}
                  {(item.likes || []).length}
                </div>,
                <div
                  key='dislikes'
                  onClick={(e) => {
                    e.stopPropagation()
                    onDislike(item._id)
                  }}
                >
                  <DislikeFilled
                    style={{
                      color: item.isDisliked == true ? 'var(--blue)' : null
                    }}
                  />{' '}
                  {(item.dislikes || []).length}
                </div>
              ]}
            >
              <Meta
                title={item.title}
                description={
                  <Space direction='vertical'>
                    <div dangerouslySetInnerHTML={{ __html: (item.description || '').slice(0, 70) }} />
                    <Tag color='green'>Tác giả: {item.author}</Tag>
                  </Space>
                }
              />
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default Blogs
