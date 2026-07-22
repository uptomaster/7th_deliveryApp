import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../components/common/Input'
import Button from '../components/common/Button'
import { login, extractAccessToken } from '../api/authApi'
import { setAccessToken } from '../api/axiosInstance'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const isFormFilled = email.trim() !== '' && password.trim() !== ''

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isFormFilled || isSubmitting) return

    setErrorMessage('')
    setIsSubmitting(true)

    try {
      const data = await login({ email, password })
      const accessToken = extractAccessToken(data)

      if (accessToken) {
        setAccessToken(accessToken)
      }

      localStorage.setItem('isLoggedIn', 'true')
      navigate('/main')
    } catch {
      setErrorMessage('아이디 또는 비밀번호를 확인해주세요.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleKakaoLogin = () => {
    window.location.href = `${import.meta.env.VITE_API_BASE_URL}/oauth2/authorization/kakao`
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-1 px-5">
      <div className="w-full max-w-[625px] rounded-modal bg-gray-0 px-5 py-20 shadow-[0px_0px_5px_rgba(0,0,0,0.11)]">
        <h1 className="mb-[52px] text-center text-[36px] font-bold text-primary">
          어쩌구저쩌구
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-[32px]">
          <div className="flex flex-col gap-[48px] px-4">
            <div className="flex flex-col gap-3">
              <label className="text-[20px] font-medium text-gray-5">
                이메일
              </label>

              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일을 입력하세요"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-[20px] font-medium text-gray-5">
                비밀번호
              </label>

              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
              />
            </div>

            {errorMessage && (
              <p className="text-[14px] font-medium text-primary">
                {errorMessage}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-4">
            <Button
              type="submit"
              variant={isFormFilled ? 'primary' : 'secondary'}
              size="full"
              disabled={!isFormFilled || isSubmitting}
            >
              {isSubmitting ? '로그인 중...' : '로그인'}
            </Button>

            <button
              type="button"
              onClick={handleKakaoLogin}
              className="flex h-12 w-full items-center justify-center rounded-button bg-[#FEE500] text-[16px] font-bold text-[#191919] transition hover:brightness-95"
            >
              카카오로 로그인
            </button>
          </div>

          <p className="text-center text-[15px] font-medium">
            <span className="text-gray-2">계정이 없나요? </span>
            <Link to="/signup" className="text-primary">
              회원가입 하기
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login