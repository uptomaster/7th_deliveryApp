import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CartList from '../components/cart/CartList'
import PaymentMethodButton from '../components/payment/PaymentMethodButton'
import Button from '../components/common/Button'
import { useCart } from '../context/CartContext' // 👈 1. 전역 상태 불러오기

function Cart() {
  const navigate = useNavigate()
  const [selectedMethod, setSelectedMethod] = useState('')

  // 👈 2. 기존의 하드코딩된 useState 데이터를 지우고 전역 상태 함수로 교체
  const { cartItems, handleIncrease, handleDecrease, handleRemove } = useCart()

  const parsePrice = (price) => {
    return Number(price.replaceAll(',', '').replace('원', ''))
  }

  const formatPrice = (price) => {
    return `${price.toLocaleString()}원`
  }

  const totalPrice = cartItems.reduce((sum, item) => {
    return sum + parsePrice(item.price) * item.count
  }, 0)

  const handlePayment = () => {
    if (cartItems.length === 0) return
    if (!selectedMethod) return

    navigate('/order-complete')
  }

  const isPaymentDisabled = cartItems.length === 0 || !selectedMethod

  return (
    <div className="min-h-screen bg-gray-1">
      <header className="sticky top-0 z-50 bg-primary">
        <div className="mx-auto flex h-14 max-w-[1725px] items-center gap-4 px-5 dt:px-10">
          <Link
            to="/main"
            className="flex h-7 w-7 items-center justify-center rounded-small bg-secondary text-[20px] font-bold text-gray-0"
            aria-label="뒤로가기"
          >
            ←
          </Link>

          <h1 className="text-[24px] font-bold text-gray-0">장바구니</h1>
        </div>
      </header>

      <main className="mx-auto grid max-w-[1100px] grid-cols-1 gap-10 px-5 py-16 dt:grid-cols-[1fr_380px]">
        <section>
          {cartItems.length === 0 ? (
            <div className="flex min-h-[300px] flex-col items-center justify-center">
              <p className="text-[20px] font-medium text-gray-5">
                장바구니가 비어있습니다.
              </p>

              <Link
                to="/main"
                className="mt-5 rounded-button bg-yellow-primary px-8 py-3 text-[20px] font-bold text-gray-5"
              >
                쇼핑하러 가기
              </Link>
            </div>
          ) : (
            <>
              <CartList
                items={cartItems}
                onIncrease={handleIncrease}
                onDecrease={handleDecrease}
                onRemove={handleRemove}
              />
              {/* 👈 3. 피그마에 있던 '+ 더 담으러 가기' 텍스트 버튼 추가 */}
              <div className="mt-6 flex justify-center">
                <Link
                  to="/main"
                  className="text-[16px] font-bold text-primary transition-colors hover:text-secondary"
                >
                  + 더 담으러 가기
                </Link>
              </div>
            </>
          )}
        </section>

        <section className="rounded-modal bg-gray-0 p-8">
          <h2 className="text-center text-[36px] font-bold text-gray-5">
            결제하기
          </h2>

          <div className="mt-10">
            <p className="mb-4 text-[12px] font-medium text-primary">
              결제 방법
            </p>

            {/* 디자인 원상 복구: 기존 4개 버튼 그대로 유지 */}
            <div className="grid grid-cols-2 gap-4">
              {['카카오페이', '네이버페이', '카드 결제', '무통장 입금'].map(
                (method) => (
                  <PaymentMethodButton
                    key={method}
                    selected={selectedMethod === method}
                    onClick={() => setSelectedMethod(method)}
                  >
                    {method}
                  </PaymentMethodButton>
                ),
              )}
            </div>
          </div>

          <div className="mt-14 flex items-center justify-between">
            <span className="text-[12px] font-bold text-gray-5">
              총 결제금액
            </span>

            <strong className="text-[12px] font-bold text-gray-5">
              {formatPrice(totalPrice)}
            </strong>
          </div>

          <Button
            size="full"
            disabled={isPaymentDisabled}
            onClick={handlePayment}
            className="mt-8"
          >
            {formatPrice(totalPrice)} 결제하기
          </Button>
        </section>
      </main>
    </div>
  )
}

export default Cart