import axios from 'axios'
import { notification } from 'antd'

export const BASE_API = 'https://bigarts-be.onrender.com/api'
// export const BASE_API = 'http://localhost:5000/api'

const createAxiosInstance = () => {
  const token = localStorage.getItem('token')
  return axios.create({
    baseURL: BASE_API,
    headers: {
      // 'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
}

const handleResponse = (response) => {
  if (response.status >= 200 && response.status < 300) {
    return {
      status: response.status,
      data: response.data
    }
  } else {
    throw new Error(`Request failed with status ${response.status}`)
  }
}

const handleError = (error) => {
  console.log('🚀 ~ file: index.js:30 ~ handleError ~ error:', error)
  notification.error({ message: 'Error', description: error?.response?.data?.message })
  return {
    data: undefined,
    status: 500
  }
}

const api = {
  get: (url, params = {}) => createAxiosInstance().get(url, params).then(handleResponse).catch(handleError),
  post: (url, data = {}) => createAxiosInstance().post(url, data).then(handleResponse).catch(handleError),
  put: (url, data = {}) => createAxiosInstance().put(url, data).then(handleResponse).catch(handleError),
  delete: (url) => createAxiosInstance().delete(url).then(handleResponse).catch(handleError),
  patch: (url, data = {}) => createAxiosInstance().patch(url, data).then(handleResponse).catch(handleError)
}

export default api
