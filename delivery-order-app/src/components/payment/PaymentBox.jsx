import { Link } from 'react-router-dom'
import Button from '../common/Button'
import { useCredit } from '../../hooks/useCredit'
import { formatCredit, formatWon } from '../../utils/format'

function PaymentBox({ totalPrice = 0, onPayment }) {
  const { credit } = useCredit()
  const remainingCredit = credit - totalPrice
  const isInsufficient = remainingCredit < 0

  return (
    <section className="rounded-modal border border-gray-2 bg-gray-0 px-12 py-14">
      <h2 className="text-center text-[36px] font-bold text-gray-5">결제하기</h2>

      <div className="mt-12 flex items-center justify-between text-[20px] font-bold text-gray-5">
        <span>총 결제금액</span>
        <span>{formatWon(totalPrice)}</span>
      </div>

      <div className="mt-4 flex flex-col gap-4 rounded-small bg-gray-1 px-3 py-6">
        <div className="flex items-center justify-between text-[20px] font-bold text-gray-5">
          <span>보유 크레딧</span>
          <span>{formatCredit(credit)}</span>
        </div>

        <div className="flex items-center justify-between text-[16px] font-medium text-gray-5">
          <span>차감 예정 크레딧</span>
          <span>-{formatCredit(totalPrice)}</span>
        </div>

        <div className="flex items-center justify-between text-[16px] font-bold text-green-primary">
          <span>차감 후 잔액</span>
          <span>{formatCredit(remainingCredit)}</span>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-end gap-[10px]">
        <span className="text-[12px] font-medium text-gray-3">
          크레딧이 부족한가요?
        </span>

        <Link
          to="/credit/charge"
          className="flex h-6 w-[100px] items-center justify-center rounded-small bg-green-primary px-6 py-3 text-[12px] font-medium text-gray-0"
        >
          크레딧 충전
        </Link>
      </div>

      <Button
        size="full"
        className="mt-12"
        disabled={isInsufficient}
        onClick={onPayment}
      >
        결제하기
      </Button>
    </section>
  )
}

export default PaymentBox
