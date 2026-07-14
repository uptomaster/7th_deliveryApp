import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../components/common/Input'
import Button from '../components/common/Button'
import { signup } from '../api/authApi'

const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/

function Signup() {
  const [email, setEmail] = useState('')
  const [nickname, setNickname] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const navigate = useNavigate()

  const isPasswordInvalid = password !== '' && !PASSWORD_REGEX.test(password)
  const isPasswordMismatch = passwordConfirm !== '' && password !== passwordConfirm
  const isFormFilled =
    email.trim() !== '' &&
    nickname.trim() !== '' &&
    PASSWORD_REGEX.test(password) &&
    passwordConfirm.trim() !== '' &&
    !isPasswordMismatch

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!isFormFilled || isSubmitting) return

    setErrorMessage('')
    setIsSubmitting(true)

    try {
      await signup({ email, password, nickname })
      navigate('/login')
    } catch {
      setErrorMessage('회원가입에 실패했습니다. 입력 정보를 확인해주세요.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-1 px-5">
      <div className="w-full max-w-[625px] rounded-modal bg-gray-0 px-5 py-20 shadow-[0px_0px_5px_rgba(0,0,0,0.11)]">
        <h1 className="mb-[64px] text-center text-[36px] font-bold text-primary">
          어쩌구저쩌구
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-[64px]">
          <div className="flex flex-col gap-[48px] px-4">
            <div className="flex flex-col gap-3">
              <label className="text-[20px] font-medium text-gray-5">이메일</label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="이메일을 입력하세요"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-[20px] font-medium text-gray-5">닉네임</label>
              <Input
                type="text"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                placeholder="닉네임을 입력하세요"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-[20px] font-medium text-gray-5">비밀번호</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                error={isPasswordInvalid}
              />
              {isPasswordInvalid ? (
                <p className="text-[14px] font-medium text-primary">
                  영문, 숫자, 특수문자(@$!%*#?&)를 포함한 8자 이상이어야 합니다.
                </p>
              ) : (
                <p className="text-[14px] font-medium text-gray-3">
                  영문, 숫자, 특수문자 포함 8자 이상
                </p>
              )}
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-[20px] font-medium text-gray-5">비밀번호 확인</label>
              <Input
                type="password"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                placeholder="비밀번호를 입력하세요"
                error={isPasswordMismatch}
              />
              {isPasswordMismatch && (
                <p className="text-[14px] font-medium text-primary">
                  비밀번호가 일치하지 않습니다.
                </p>
              )}
            </div>

            {errorMessage && (
              <p className="text-[14px] font-medium text-primary">{errorMessage}</p>
            )}
          </div>

          <Button
            type="submit"
            variant={isFormFilled ? 'primary' : 'secondary'}
            size="full"
            disabled={!isFormFilled || isSubmitting}
          >
            {isSubmitting ? '가입 중...' : '회원가입하기'}
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Signup
