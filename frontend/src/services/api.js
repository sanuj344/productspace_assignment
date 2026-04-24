import axios from 'axios'

const envUrl = import.meta.env.VITE_API_URL || '';
const baseURL = envUrl.endsWith('/api') ? envUrl : `${envUrl.replace(/\/$/, '')}/api`;

const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
})

// Attach JWT token to every request automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      window.location.href = '/login'
    } else if (!error.response) {
      // Network Error (e.g. CORS failed, Server down)
      error.response = { data: { message: 'Network error. Please check your connection.' } }
    } else if (error.response.status >= 500) {
      // Server Error
      error.response.data.message = error.response.data.message || 'Server error. Please try again later.'
    }
    return Promise.reject(error)
  }
)

export default api
