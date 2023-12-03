import styles from './index.module.scss'

const Brands = () => {
  const items = [
    {
      key: 2,
      label: 'Sony',
      icon: '/images/brand-02.png'
    },
    {
      key: 3,
      label: 'Dell',
      icon: '/images/brand-03.png'
    },
    {
      key: 4,
      label: 'Sandisk',
      icon: '/images/brand-04.png'
    },
    {
      key: 5,
      label: 'LG',
      icon: '/images/brand-05.png'
    },
    {
      key: 6,
      label: 'Bose',
      icon: '/images/brand-06.png'
    },
    {
      key: 7,
      label: 'Samsung',
      icon: '/images/brand-07.png'
    },
    {
      key: 8,
      label: 'Canon',
      icon: '/images/brand-08.png'
    }
  ]
  return (
    <div className={styles.Brands}>
      {items.map((item) => (
        <div key={item.key} className={styles.logo}>
          <img src={item.icon} alt={item.label} />
        </div>
      ))}
    </div>
  )
}

export default Brands
