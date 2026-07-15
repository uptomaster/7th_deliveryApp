import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageHeader from '../components/common/PageHeader'
import Button from '../components/common/Button'
import CreditPresetButton from '../components/payment/CreditPresetButton'
import { useCredit } from '../hooks/useCredit'
import { formatCredit, formatWon } from '../utils/format'

const CREDIT_PRESETS = [1000, 3000, 5000, 10000]

function CreditCharge() {
  const { credit, chargeCredit } = useCredit()
  const [selectedAmount, setSelectedAmount] = useState(null)
  const navigate = useNavigate()

  const creditAfterCharge = credit + (selectedAmount ?? 0)

  // 서버 충전을 기다리도록 async 달기
  const handleCharge = async () => {
    if (!selectedAmount) return
    const isSuccess = await chargeCredit(selectedAmount)
    if (isSuccess) {
      navigate(-1) 
    }
  }

  return (
    <div className="min-h-screen bg-gray-1">
      <PageHeader title="크레딧 충전" />
      <main className="flex justify-center px-5 py-24">
        <section className="w-full max-w-[568px] rounded-modal border border-gray-2 bg-gray-0 px-12 py-14">
          <h2 className="text-center text-[36px] font-bold text-gray-5">크레딧 충전하기</h2>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-2">
            {CREDIT_PRESETS.map((amount) => (
              <CreditPresetButton key={amount} amount={amount} selected={selectedAmount === amount} onClick={() => setSelectedAmount(amount)} />
            ))}
          </div>
          <div className="mt-11 flex flex-col gap-4 rounded-small bg-gray-1 px-3 py-6">
            <div className="flex items-center justify-between text-[16px] font-bold text-gray-5">
              <span>보유 크레딧</span><span>{formatCredit(credit)}</span>
            </div>
            <div className="flex items-center justify-between text-[20px] font-bold text-primary">
              <span>충전 후 크레딧</span><span>{formatCredit(creditAfterCharge)}</span>
            </div>
          </div>
          <div className="mt-11 flex items-center justify-between text-[20px] font-bold text-gray-5">
            <span>결제금액</span><span>{formatWon(selectedAmount ?? 0)}</span>
          </div>
          <Button size="full" className="mt-8" disabled={!selectedAmount} onClick={handleCharge}>
            충전하기
          </Button>
        </section>
      </main>
    </div>
  )
}
export default CreditCharge