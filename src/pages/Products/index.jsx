import ProductItem from '@/components/ProductItem'
import styles from './index.module.scss'

import { Row, Col, Select, Space, InputNumber, Form, Checkbox } from 'antd'
const Products = () => {
  const [form] = Form.useForm()

  const products = [
    {
      id: 1,
      name: 'Product 1',
      image: 'https://picsum.photos/500/500',
      price: 1000000,
      brand: 'Sony'
    },
    {
      id: 2,
      name: 'Product 2',
      image: 'https://random.imagecdn.app/500/150',
      price: 3000000,
      brand: 'Toshiba'
    },
    {
      id: 3,
      name: 'Product 3',
      image: 'https://random.imagecdn.app/500/200',
      price: 6000000,
      brand: 'Samsung'
    },
    {
      id: 4,
      name: 'Product 4',
      image: 'https://picsum.photos/500/500',
      price: 1000000,
      brand: 'Sony'
    },
    {
      id: 5,
      name: 'Product 5',
      image: 'https://picsum.photos/500/500',
      price: 1000000,
      brand: 'Apple'
    },
    {
      id: 6,
      name: 'Product 6',
      image: 'https://picsum.photos/500/500',
      price: 1000000,
      brand: 'Samsung'
    },
    {
      id: 7,
      name: 'Product 7',
      image: 'https://picsum.photos/500/500',
      price: 1000000,
      brand: 'Philips'
    },
    {
      id: 8,
      name: 'Product 8',
      image: 'https://picsum.photos/500/500',
      price: 1000000,
      brand: 'Sony'
    }
  ]

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
      <Form form={form}>
        <Row gutter={[24, 24]}>
          <Col span={6}>
            <div className={styles.filterContainer}>
              <p className={styles.title}>Filter by</p>
              <div className={styles.container}>
                {_renderFilterItem(
                  'Availability',
                  <div>
                    <Form.Item name='availability'>
                      <Checkbox.Group>
                        <Space direction='vertical'>
                          <Checkbox value='In Stock'>In Stock</Checkbox>
                          <Checkbox value='Out of Stock'>Out of Stock</Checkbox>
                        </Space>
                      </Checkbox.Group>
                    </Form.Item>
                  </div>
                )}
                {_renderFilterItem(
                  'Price',
                  <div className={styles.priceContainer}>
                    <Form.Item name='priceFrom'>
                      <InputNumber prefix='$' min={0} placeholder='From' size='large' />
                    </Form.Item>
                    <Form.Item name='priceTo'>
                      <InputNumber prefix='$' min={0} placeholder='To' size='large' />
                    </Form.Item>
                  </div>
                )}

                {_renderFilterItem(
                  'Size',
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
                )}
              </div>
            </div>
          </Col>
          <Col span={18}>
            <Row gutter={[24, 24]}>
              <Col span={24}>
                <div className={styles.sortContainer}>
                  <div className={styles.left}>
                    <span>Sort by</span>
                    <Form.Item name='sort'>
                      <Select
                        placeholder='Sort by'
                        size='large'
                        options={[
                          {
                            label: 'Best selling',
                            value: 'Best selling'
                          },
                          {
                            label: 'A-Z',
                            value: 'A-Z'
                          },
                          {
                            label: 'Z-A',
                            value: 'Z-A'
                          },
                          {
                            label: 'Price, low to high',
                            value: 'Price, low to high'
                          },
                          {
                            label: 'Price, high to low',
                            value: 'Price, high to low'
                          }
                        ]}
                      />
                    </Form.Item>
                  </div>
                  <div className={styles.right}>21 products</div>
                </div>
              </Col>
              <Col span={24}>
                <div className={styles.productContainer}>
                  {products.map((product) => (
                    <ProductItem key={product.id} data={product} />
                  ))}
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
