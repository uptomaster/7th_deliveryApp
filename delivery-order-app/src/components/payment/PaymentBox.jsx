import { Link, useNavigate } from 'react-router-dom'
import Button from '../common/Button'
import { useCredit } from '../../hooks/useCredit'
import { formatCredit } from '../../utils/format'

function PaymentBox({ totalPrice = 0, onPayment }) {
  const navigate = useNavigate()
  const { credit } = useCredit()

  const remainingCredit = credit - totalPrice
  const isInsufficient = remainingCredit < 0
  const isEmptyPrice = totalPrice <= 0

  const handleButtonClick = () => {
    if (isEmptyPrice) return

    if (isInsufficient) {
      navigate('/credit/charge')
      return
    }

    onPayment()
  }

  return (
    <section className="rounded-modal border border-gray-2 bg-gray-0 px-8 py-10">
      <h2 className="text-center text-[36px] font-bold text-gray-5">
        크레딧 결제
      </h2>

      <div className="mt-10 flex items-center justify-between text-[20px] font-bold text-gray-5">
        <span>총 결제 크레딧</span>
        <span>{formatCredit(totalPrice)}</span>
      </div>

      <div className="mt-4 flex flex-col gap-4 rounded-small bg-gray-1 px-4 py-6">
        <div className="flex items-center justify-between text-[20px] font-bold text-gray-5">
          <span>보유 크레딧</span>
          <span>{formatCredit(credit)}</span>
        </div>

        <div className="flex items-center justify-between text-[16px] font-medium text-gray-5">
          <span>차감 예정 크레딧</span>
          <span>-{formatCredit(totalPrice)}</span>
        </div>

        <div
          className={`flex items-center justify-between text-[16px] font-bold ${
            isInsufficient ? 'text-primary' : 'text-gray-5'
          }`}
        >
          <span>결제 후 잔액</span>
          <span>{formatCredit(remainingCredit)}</span>
        </div>
      </div>

      {isInsufficient && !isEmptyPrice && (
        <div className="mt-4 flex items-center justify-end gap-3">
          <span className="text-[12px] font-medium text-gray-3">
            크레딧이 부족합니다.
          </span>

          <Link
            to="/credit/charge"
            className="flex h-8 w-[100px] items-center justify-center whitespace-nowrap rounded-small bg-primary text-[12px] font-medium text-gray-0"
          >
            충전하기
          </Link>
        </div>
      )}

      <Button
        size="full"
        className="mt-10"
        disabled={isEmptyPrice}
        variant={isInsufficient ? 'outline' : 'primary'}
        onClick={handleButtonClick}
      >
        {isEmptyPrice
          ? '메뉴를 담아주세요'
          : isInsufficient
            ? '크레딧 충전하기'
            : '크레딧으로 결제하기'}
      </Button>
    </section>
  )
}

export default PaymentBox