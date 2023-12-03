import { Breadcrumb as AntdBreadcrumb } from 'antd'
import styles from './index.module.scss'
import { useMatches } from 'react-router-dom'

const Breadcrumb = () => {
  let matches = useMatches()
  let crumbs = matches
    // first get rid of any matches that don't have handle and crumb
    .filter((match) => Boolean(match.handle?.crumb))
    // now map them into an array of elements, passing the loader
    // data to each one
    .map((match) => ({
      name: match.handle.crumb(match.data),
      path: match.pathname
    }))

  if (crumbs.length === 1) {
    return null
  }
  return (
    <div className={styles.Breadcrumb}>
      <div className={styles.container}>
        <AntdBreadcrumb
          items={crumbs.map((crumb, index) => ({
            title: crumb.name,
            ...(index < crumbs.length - 1
              ? {
                  href: crumb.path
                }
              : null)
          }))}
        />
      </div>
    </div>
  )
}

export default Breadcrumb
