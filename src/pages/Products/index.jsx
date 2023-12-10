import ProductItem from '@/components/ProductItem'
import styles from './index.module.scss'

import { getProductsAPI } from '@/store/reducers/productSlice'
import { goToTop } from '@/utils/functions'
import { Checkbox, Col, Form, InputNumber, Pagination, Row, Select, Space, Spin } from 'antd'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
const Products = () => {
  const [form] = Form.useForm()
  const { isLoadingProducts, products = [] } = useSelector((state) => state.product)
  const { categories = [] } = useSelector((state) => state.category)
  const dispatch = useDispatch()
  const { state } = useLocation()

  const { categoryName } = state || {}

  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(12)
  const [formValues, setFormValues] = useState({
    category: categoryName
  })

  const productsPerPage = (products || []).slice((page - 1) * pageSize, page * pageSize)

  const getData = (params) => {
    dispatch(
      getProductsAPI({
        ...params
      })
    )
  }

  useEffect(() => {
    getData(formValues)
  }, [JSON.stringify(formValues)])

  const _renderFilterItem = (title, content) => {
    return (
      <div className={styles.filterItem}>
        <p className={styles.label}>{title}</p>
        <div className={styles.content}>{content}</div>
      </div>
    )
  }
  return (
    <div className={styles.Products}>
      <Form initialValues={formValues} form={form} onValuesChange={(values) => setFormValues(values)}>
        <Row gutter={[24, 24]}>
          <Col span={6}>
            <div className={styles.filterContainer}>
              <p className={styles.title}>Lọc sản phẩm</p>
              <div className={styles.container}>
                {_renderFilterItem(
                  'Danh mục',
                  <div>
                    <Form.Item name='category'>
                      <Checkbox.Group>
                        <Space direction='vertical'>
                          {/* <Checkbox key={'all'} value={undefined}>
                            Tất cả
                          </Checkbox> */}
                          {categories.map((category) => (
                            <Checkbox key={category.title} value={category.title}>
                              {category.title}
                            </Checkbox>
                          ))}
                        </Space>
                      </Checkbox.Group>
                    </Form.Item>
                  </div>
                )}

                {_renderFilterItem(
                  'Giá',
                  <div className={styles.priceContainer}>
                    <Form.Item name='priceFrom'>
                      <InputNumber prefix='' min={0} placeholder='From' size='large' />
                    </Form.Item>
                    <Form.Item name='priceTo'>
                      <InputNumber prefix='' min={0} placeholder='To' size='large' />
                    </Form.Item>
                  </div>
                )}
                {/* 
                {_renderFilterItem(
                  '',
                  <div>
                    <Form.Item name='size'>
                      <Checkbox.Group>
                        <Space direction='vertical'>
                          <Checkbox value='S'>S</Checkbox>
                          <Checkbox value='M'>M</Checkbox>
                          <Checkbox value='L'>L</Checkbox>
                          <Checkbox value='XL'>XL</Checkbox>
                          <Checkbox value='XXL'>XXL</Checkbox>
                        </Space>
                      </Checkbox.Group>
                    </Form.Item>
                  </div>
                )} */}
              </div>
            </div>
          </Col>
          <Col span={18}>
            <Row gutter={[24, 24]}>
              <Col span={24}>
                <div className={styles.sortContainer}>
                  <div className={styles.left}>
                    <span>Sắp xếp</span>
                    <Form.Item name='sort'>
                      <Select
                        placeholder='Sắp xếp theo...'
                        size='large'
                        options={[
                          {
                            label: 'Mới nhất',
                            value: '-createdAt'
                          },
                          {
                            label: 'A-Z',
                            value: 'title'
                          },
                          {
                            label: 'Z-A',
                            value: '-title'
                          },
                          {
                            label: 'Giá thấp đến cao',
                            value: 'price'
                          },
                          {
                            label: 'Giá cao đến thấp',
                            value: '-price'
                          }
                        ]}
                      />
                    </Form.Item>
                  </div>
                  <div className={styles.right}>{products.length} sản phẩm</div>
                </div>
              </Col>
              <Col span={24}>
                <div className={styles.productList}>
                  <Spin spinning={isLoadingProducts}>
                    <div className={styles.productContainer}>
                      {productsPerPage.map((product) => (
                        <ProductItem key={product._id} data={product} />
                      ))}
                    </div>
                    <Pagination
                      pageSize={pageSize}
                      current={page}
                      onChange={(p, l) => {
                        goToTop()
                        setPage(p)
                        setPageSize(l)
                      }}
                      total={products.length}
                    />
                  </Spin>
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form>
    </div>
  )
}

export default Products
