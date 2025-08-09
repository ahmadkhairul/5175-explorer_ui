import fetch from '@/utils/fetch'
import { getToken } from '@/utils/storage'

const API_BASE_URL = import.meta.env.VITE_APP_API_URL || 'http://localhost:3000/api/v1'
const BASIC_AUTH_USER = import.meta.env.VITE_APP_BASIC_AUTH_USERNAME || 'your_username'
const BASIC_AUTH_PASS = import.meta.env.VITE_APP_BASIC_AUTH_PASSWORD || 'your_password'

const loginConfig = {
  headers: {
    Authorization: `Basic ${btoa(`${BASIC_AUTH_USER}:${BASIC_AUTH_PASS}`)}`
  }
}

const authConfig = {
  headers: { Authorization: `Bearer ${getToken()}` }
}

export const login = async (params: {
  username: string
  password: string
  rememberMe: boolean
}) => {
  const response = await fetch.post(`${API_BASE_URL}/login`, params, { ...loginConfig })
  return response.data
}

export const auth = async () => {
  const response = await fetch.get(`${API_BASE_URL}/auth`, { ...authConfig })
  return response.data
}
