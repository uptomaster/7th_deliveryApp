import { useNavigate } from 'react-router-dom'

function OrderComplete() {
  const navigate = useNavigate()

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-1 px-5">
      <section className="flex flex-col items-center text-center">
        <h1 className="text-[24px] font-bold text-gray-5">주문 완료!</h1>

        <p className="mt-2 text-[12px] font-medium text-gray-3">
          음식이 배달 됩니다 ...
        </p>

        <button
          type="button"
          onClick={() => navigate('/main')}
          className="mt-10 h-10 w-[140px] rounded-button bg-primary text-[12px] font-bold text-gray-0 transition hover:brightness-95"
        >
          홈으로
        </button>
      </section>
    </main>
  )
}

export default OrderComplete