import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Input from '../components/common/Input'
import Button from '../components/common/Button'

function Signup() {
  const [userId, setUserId] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const navigate = useNavigate()

  const isPasswordMismatch =
    passwordConfirm !== '' && password !== passwordConfirm
  const isFormFilled =
    userId.trim() !== '' &&
    password.trim() !== '' &&
    passwordConfirm.trim() !== '' &&
    !isPasswordMismatch

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!isFormFilled) return
    navigate('/login')
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
              <label className="text-[20px] font-medium text-gray-5">아이디</label>
              <Input
                type="text"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                placeholder="아이디를 입력하세요"
              />
            </div>

            <div className="flex flex-col gap-3">
              <label className="text-[20px] font-medium text-gray-5">비밀번호</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="비밀번호를 입력하세요"
              />
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
          </div>

          <Button
            type="submit"
            variant={isFormFilled ? 'primary' : 'secondary'}
            size="full"
            disabled={!isFormFilled}
          >
            회원가입하기
          </Button>
        </form>
      </div>
    </div>
  )
}

export default Signup
