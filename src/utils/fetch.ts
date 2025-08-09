import axios from 'axios'
import { clearStorages } from './storage'

const instance = axios.create({
  headers: {
    'Content-Type': 'application/json'
  }
})

instance.interceptors.request.use(function (config) {
  return config
})

export const defaultError = {
  code: 500,
  status: 'error',
  message: 'Failed to fetch data. Please contact developer.'
}

instance.interceptors.response.use(
  function (response) {
    return response.data
  },
  function (err) {
    if (err.name === 'CanceledError') {
      return Promise.reject('request canceled')
    }

    if (err.response && err.response.data) {
      if (err.response.status === 401) {
        clearStorages()
      }
      return Promise.reject(err.response.data)
    } else {
      return Promise.reject(defaultError)
    }
  }
)

export default instance
