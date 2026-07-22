import axiosInstance from './axiosInstance'

export async function signup({ email, password, nickname }) {
  const payload = {
    email,
    password,
    nickname,
  }

  console.log('POST /auth/signup payload:', payload)

  try {
    const { data } = await axiosInstance.post('/auth/signup', payload)
    return data
  } catch (error) {
    console.error('회원가입 실패:', error)
    console.error('회원가입 실패 응답:', error.response?.data)

    throw error
  }
}

export async function login({ email, password }) {
  const payload = {
    email,
    password,
  }

  console.log('POST /auth/login payload:', payload)

  try {
    const { data } = await axiosInstance.post('/auth/login', payload)
    return data
  } catch (error) {
    console.error('로그인 실패:', error)
    console.error('로그인 실패 응답:', error.response?.data)

    throw error
  }
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