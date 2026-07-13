import axiosInstance from './axiosInstance'

export async function signup({ email, password, nickname }) {
  const { data } = await axiosInstance.post('/users/signup', {
    email,
    password,
    nickname,
  })

  return data
}

export async function login({ email, password }) {
  const { data } = await axiosInstance.post('/users/login', {
    email,
    password,
  })

  return data
}

// 로그인 응답의 토큰 필드명이 API 명세서에 아직 확정되어 있지 않아
// 흔히 쓰이는 위치들을 순서대로 확인한다. 실제 응답 확인되면 이 함수만 수정하면 된다.
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
