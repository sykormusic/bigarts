import { Result as AntdResult } from 'antd'
const Result = ({ extra, title = '', subTitle = '', status = 'success' }) => (
  <AntdResult status={status} title={title} subTitle={subTitle} extra={extra} />
)
export default Result
