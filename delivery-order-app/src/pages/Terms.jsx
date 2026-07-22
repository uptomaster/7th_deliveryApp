import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/common/Button'

function Terms() {
  const navigate = useNavigate()
  const [isServiceAgreed, setIsServiceAgreed] = useState(false)
  const [isPrivacyAgreed, setIsPrivacyAgreed] = useState(false)

  const isAllAgreed = isServiceAgreed && isPrivacyAgreed

  const handleSubmit = () => {
    if (!isAllAgreed) return

    localStorage.setItem('isTermsAgreed', 'true')
    navigate('/main', { replace: true })
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-1 px-5">
      <div className="w-full max-w-[625px] rounded-modal bg-gray-0 px-5 py-20 shadow-[0px_0px_5px_rgba(0,0,0,0.11)]">
        <h1 className="mb-8 text-center text-[36px] font-bold text-primary">
          약관 동의
        </h1>

        <p className="mb-10 text-center text-[16px] font-medium text-gray-4">
          서비스 이용을 위해 약관 동의가 필요합니다.
        </p>

        <div className="flex flex-col gap-4 px-4">
          <label className="flex cursor-pointer items-center gap-3 rounded-small border border-gray-2 px-4 py-4">
            <input
              type="checkbox"
              checked={isServiceAgreed}
              onChange={(e) => setIsServiceAgreed(e.target.checked)}
              className="h-5 w-5"
            />
            <span className="text-[16px] font-medium text-gray-5">
              서비스 이용약관 동의
            </span>
          </label>

          <label className="flex cursor-pointer items-center gap-3 rounded-small border border-gray-2 px-4 py-4">
            <input
              type="checkbox"
              checked={isPrivacyAgreed}
              onChange={(e) => setIsPrivacyAgreed(e.target.checked)}
              className="h-5 w-5"
            />
            <span className="text-[16px] font-medium text-gray-5">
              개인정보 수집 및 이용 동의
            </span>
          </label>
        </div>

        <div className="mt-10">
          <Button
            type="button"
            variant={isAllAgreed ? 'primary' : 'secondary'}
            size="full"
            disabled={!isAllAgreed}
            onClick={handleSubmit}
          >
            동의하고 시작하기
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Terms