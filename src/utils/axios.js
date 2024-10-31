import axios from 'axios'
import store from '../store'
import router from '../router'

// Create axios instance
const api = axios.create({
  baseURL: 'http://localhost:3000/api'
})

// Add response interceptor
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      // Token expired or invalid
      store.dispatch('auth/logout')
      router.push('/login')
    }
    return Promise.reject(error)
  }
)

export default api 