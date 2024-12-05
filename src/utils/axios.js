import axios from 'axios'
import store from '../store'
import router from '../router'

const baseURL = import.meta.env.VITE_API_URL || '/api'

// Create axios instance
const api = axios.create({
  baseURL,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add request interceptor to include auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Add response interceptor
api.interceptors.response.use(
  response => response,
  error => {
    return Promise.reject(error)
  }
)

console.log('Creating axios instance with baseURL:', import.meta.env.VITE_API_URL);

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',  // Add fallback for debugging
  withCredentials: true
});

// Add request interceptor for debugging
instance.interceptors.request.use(config => {
  console.log('Making request to:', config.baseURL + config.url);
  return config;
});

export default instance 