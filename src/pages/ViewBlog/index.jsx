import { dislikeBlogAPI, getABlogAPI, likeBlogAPI } from '@/store/reducers/blogSlice'
import { DislikeFilled, EyeFilled, LikeFilled } from '@ant-design/icons'
import { Card, Col, Empty, Row, Skeleton, Space, Tag } from 'antd'
import { isEmpty } from 'lodash'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import styles from './index.module.scss'
import { formatDate } from '@/utils/functions'

const ViewBlog = () => {
  const { user } = useSelector((state) => state.auth)
  const { isLoadingBlogDetails } = useSelector((state) => state.blog)
  const location = useLocation()
  const dispatch = useDispatch()

  const id = location.pathname.split('/')[2]
  const [blogDetails, setBlogDetails] = useState({})

  const onLike = async () => {
    if (!user) {
      return
    }
    const res = await await dispatch(
      likeBlogAPI({
        blogId: blogDetails?._id
      })
    )

    if (res.payload?._id) {
      getBlogDetail()
    }
  }

  const onDislike = async () => {
    if (!user) {
      return
    }
    const res = await dispatch(
      dislikeBlogAPI({
        blogId: blogDetails?._id
      })
    )

    if (res.payload?._id) {
      getBlogDetail()
    }
  }

  const getBlogDetail = async () => {
    const res = await dispatch(getABlogAPI(id))

    if (res.payload?._id) {
      setBlogDetails(res.payload)
    }
  }

  useEffect(() => {
    getBlogDetail()
  }, [])

  if (isLoadingBlogDetails) return <Skeleton />

  return (
    <div className={styles.ViewBlog}>
      <Row gutter={[24, 24]}>
        <Col span={6}>
          <div className={styles.left}>
            <Card
              bordered={false}
              key={blogDetails?._id}
              style={{
                boxShadow: 'none'
              }}
              cover={
                !isEmpty(blogDetails?.images) && (
                  <img
                    alt='example'
                    src={blogDetails?.images?.[0]?.url}
                    style={{
                      height: 200
                    }}
                  />
                )
              }
              actions={[
                <div key='views'>
                  <EyeFilled /> {blogDetails.numViews}
                </div>,
                <div key='likes' onClick={onLike}>
                  <LikeFilled
                    style={{
                      color: blogDetails.isLiked == true ? 'var(--blue)' : null
                    }}
                  />{' '}
                  {(blogDetails.likes || []).length}
                </div>,
                <div key='dislikes' onClick={onDislike}>
                  <DislikeFilled
                    style={{
                      color: blogDetails.isDisliked == true ? 'var(--blue)' : null
                    }}
                  />{' '}
                  {(blogDetails.dislikes || []).length}
                </div>
              ]}
            >
              <Card.Meta
                description={
                  <Space direction='vertical'>
                    <Tag color='blue'>Danh mục: {blogDetails.category}</Tag>
                    <Tag color='green'>Tác giả: {blogDetails.author}</Tag>
                  </Space>
                }
              />
            </Card>
          </div>
        </Col>
        <Col span={18}>
          <div className={styles.right}>
            <p className={styles.date}>{formatDate(blogDetails.createdAt)}</p>
            <h2>{blogDetails.title}</h2>
            <div dangerouslySetInnerHTML={{ __html: blogDetails.description }} />
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default ViewBlog
