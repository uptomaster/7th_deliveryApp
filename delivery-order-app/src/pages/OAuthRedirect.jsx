import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { setAccessToken } from '../api/axiosInstance'

function OAuthRedirect() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  useEffect(() => {
    const accessToken =
      searchParams.get('accessToken') ||
      searchParams.get('access_token') ||
      searchParams.get('token')

    const error = searchParams.get('error')

    console.log('카카오 로그인 리다이렉트 URL:', window.location.href)
    console.log('accessToken:', accessToken)
    console.log('error:', error)

    if (error) {
      alert('카카오 로그인에 실패했습니다. 다시 시도해주세요.')
      navigate('/login', { replace: true })
      return
    }

    if (!accessToken) {
      alert('로그인 토큰을 받지 못했습니다. 다시 로그인해주세요.')
      navigate('/login', { replace: true })
      return
    }

    setAccessToken(accessToken)
    localStorage.setItem('isLoggedIn', 'true')

    navigate('/main', { replace: true })
  }, [navigate, searchParams])

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-1">
      <p className="text-[20px] font-bold text-gray-5">
        카카오 로그인 처리 중입니다.
      </p>
    </div>
  )
}

export default OAuthRedirect