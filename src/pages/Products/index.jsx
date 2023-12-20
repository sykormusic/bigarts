import ProductItem from '@/components/ProductItem'
import styles from './index.module.scss'

import { getBrandsAPI } from '@/store/reducers/brandSlice'
import { getProductsAPI } from '@/store/reducers/productSlice'
import { goToTop } from '@/utils/functions'
import { CloseOutlined } from '@ant-design/icons'
import { Alert, Button, Checkbox, Col, Form, InputNumber, Pagination, Row, Select, Space, Spin } from 'antd'
import { debounce, isEmpty, omit } from 'lodash'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
const Products = () => {
  const [form] = Form.useForm()
  const { isLoadingProducts, totalProduct = 0, products = [] } = useSelector((state) => state.product)
  const { brands = [] } = useSelector((state) => state.brand)
  const { categories = [] } = useSelector((state) => state.category)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { state } = useLocation()

  const { categoryName, tags, searchKey } = state || {}

  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(12)
  const [formValues, setFormValues] = useState({
    category: categoryName ? [categoryName] : undefined,
    tags: tags ? [tags] : undefined,
    searchKey: searchKey ? searchKey : undefined
  })

  const isFormEmpty = Object.values(omit(formValues, 'searchKey')).every((value) => isEmpty(value))

  useEffect(() => {
    if (categoryName !== formValues?.category?.[0]) {
      setFormValues({
        category: [categoryName]
      })
      form.setFieldsValue({
        category: [categoryName]
      })
    }
  }, [categoryName])

  useEffect(() => {
    if (tags !== formValues.tags) {
      setFormValues({
        tags: [tags]
      })
      form.setFieldsValue({
        tags: [tags]
      })
    }
  }, [tags])

  useEffect(() => {
    if (searchKey !== formValues.searchKey) {
      setFormValues({
        searchKey: searchKey
      })
    }
  }, [searchKey])

  const getBrands = () => {
    dispatch(getBrandsAPI())
  }

  const getData = (params) => {
    console.log('🚀 ~ file: index.jsx:68 ~ getData ~ params:', params)
    dispatch(getProductsAPI(params))
    getBrands()
  }

  const debounceSaveFormValues = debounce((values) => {
    setFormValues((prev) => ({ ...prev, ...values }))
  }, 500)

  useEffect(() => {
    getData({ ...formValues, page, limit: pageSize })
  }, [JSON.stringify(formValues), page, pageSize])

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
      <Form initialValues={formValues} form={form} onValuesChange={(_, values) => debounceSaveFormValues(values)}>
        <Row gutter={[24, 24]}>
          <Col span={6}>
            <div className={styles.filterContainer}>
              <div className={styles.header}>
                <span className={styles.title}>Lọc sản phẩm</span>
                {!isFormEmpty && (
                  <Button
                    danger
                    size='small'
                    icon={
                      <CloseOutlined
                        style={{
                          fontSize: 12
                        }}
                      />
                    }
                    onClick={() => {
                      setFormValues({})
                      form.setFieldsValue({
                        category: undefined,
                        tags: undefined,
                        'price[lte]': undefined,
                        'price[gte]': undefined,
                        brand: undefined
                      })
                    }}
                  >
                    Bỏ lọc
                  </Button>
                )}
              </div>
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
                  'Phân loại',
                  <div>
                    <Form.Item name='tags'>
                      <Checkbox.Group>
                        <Space direction='vertical'>
                          {[
                            {
                              label: 'Sản phẩm nổi bật',
                              value: 'featured'
                            },
                            {
                              label: 'Sản phẩm phổ biến',
                              value: 'popular'
                            },
                            {
                              label: 'Sản phẩm đặc biệt',
                              value: 'special'
                            }
                          ].map((item) => (
                            <Checkbox key={item.value} value={item.value}>
                              {item.label}
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
                    <Form.Item name='price[gte]'>
                      <InputNumber prefix='' min={0} placeholder='Từ' size='large' />
                    </Form.Item>
                    <Form.Item name='price[lte]'>
                      <InputNumber prefix='' min={0} placeholder='Đến' size='large' />
                    </Form.Item>
                  </div>
                )}

                {_renderFilterItem(
                  'Thương hiệu',
                  <div>
                    <Form.Item name='brand'>
                      <Checkbox.Group>
                        <Space direction='vertical'>
                          {brands.map((brand) => (
                            <Checkbox key={brand.title} value={brand.title}>
                              {brand.title}
                            </Checkbox>
                          ))}
                        </Space>
                      </Checkbox.Group>
                    </Form.Item>
                  </div>
                )}
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
                            label: 'Cũ nhất',
                            value: 'createdAt'
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
              {searchKey ? (
                <Col span={24}>
                  <Alert
                    message={
                      <span>
                        Kết quả tìm kiếm cho từ khoá <b>{searchKey}</b>
                      </span>
                    }
                    type='info'
                    showIcon
                    closeIcon
                    onClose={() => {
                      navigate('.', { replace: true })
                    }}
                  />
                </Col>
              ) : null}
              <Col span={24}>
                <div className={styles.productList}>
                  <Spin spinning={isLoadingProducts}>
                    <div className={styles.productContainer}>
                      {products.map((product) => (
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
                      total={totalProduct}
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
