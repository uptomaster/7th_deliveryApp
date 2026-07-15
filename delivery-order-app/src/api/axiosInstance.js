import axios from 'axios'

const ACCESS_TOKEN_KEY = 'accessToken'

export function getAccessToken() {
  return localStorage.getItem(ACCESS_TOKEN_KEY)
}

export function setAccessToken(token) {
  localStorage.setItem(ACCESS_TOKEN_KEY, token)
}

export function clearAccessToken() {
  localStorage.removeItem(ACCESS_TOKEN_KEY)
}

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

axiosInstance.interceptors.request.use((config) => {
  const token = getAccessToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status
    const currentPath = window.location.pathname

    if (status === 401) {
      clearAccessToken()
      localStorage.removeItem('isLoggedIn')

      const isAuthPage =
        currentPath === '/login' || currentPath === '/signup'

      if (!isAuthPage) {
        window.location.replace('/login')
      }
    }

    return Promise.reject(error)
  },
)

export default axiosInstance