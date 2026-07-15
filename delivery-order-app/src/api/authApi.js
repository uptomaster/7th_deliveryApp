import axiosInstance from './axiosInstance'

export async function signup({ email, password, nickname }) {
  const { data } = await axiosInstance.post('/auth/signup', {
    email,
    password,
    nickname,
  })

  return data
}

export async function login({ email, password }) {
  const { data } = await axiosInstance.post('/auth/login', {
    email,
    password,
  })

  return data
}

export function extractAccessToken(loginResponse) {
  return (
    loginResponse?.result?.accessToken ??
    loginResponse?.result?.token ??
    loginResponse?.accessToken ??
    loginResponse?.token ??
    null
  )
}

export async function fetchMyInfo() {
  const { data } = await axiosInstance.get('/users/me')

  return data
}