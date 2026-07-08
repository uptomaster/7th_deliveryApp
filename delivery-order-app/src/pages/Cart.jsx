import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import CartList from '../components/cart/CartList'
import Button from '../components/common/Button'
import { useCart } from '../context/CartContext'

// 💡 주의: 정후 형이 만든 크레딧 관련 전역 상태(Context)가 있다면 꼭 여기서 불러와야 합니다!
// import { useCredit } from '../context/CreditContext'

function Cart() {
  const navigate = useNavigate()
  const { cartItems, handleIncrease, handleDecrease, handleRemove } = useCart()

  // 💡 정후 형의 코드와 연결하기 전까지 테스트를 위해 임시로 15,000C를 보유했다고 가정합니다.
  // 나중에 정후 형이 만든 상태 값(myCredit)으로 교체해 주세요!
  const [myCredit, setMyCredit] = useState(15000) 

  const parsePrice = (price) => {
    if (typeof price === 'number') return price;
    return Number(price.replaceAll(',', '').replace('원', ''))
  }

  const formatPrice = (price) => `${price.toLocaleString()}원`
  const formatCredit = (credit) => `${credit.toLocaleString()}C`

  // 1. 총 결제 금액 계산: 문자열 대신 unitPrice(숫자)가 있으면 그걸 사용합니다.
  const totalPrice = cartItems.reduce((sum, item) => {
    const itemPrice = item.unitPrice || parsePrice(item.price)
    return sum + itemPrice * item.count
  }, 0)

  // 2. 크레딧 계산 로직
  const remainingCredit = myCredit - totalPrice
  const isCreditInsufficient = remainingCredit < 0

  const handlePayment = () => {
    if (cartItems.length === 0) return

    if (isCreditInsufficient) {
      // 크레딧 부족 시 충전 페이지나 로직으로 이동합니다.
      // 💡 정후 형이 만든 라우터 경로에 맞게 수정하세요! (예: navigate('/charge'))
      alert('크레딧이 부족합니다. 충전 페이지로 이동해야 합니다!')
      return
    }

    // 💡 실제 결제 시 정후 형이 만든 크레딧 차감 함수를 여기서 호출해야 합니다.
    // deductCredit(totalPrice)

    // TODO: 결제 성공 시 CartContext에 장바구니를 비우는 로직(clearCart)도 추가해야 합니다.
    
    navigate('/order-complete')
  }

  const isCartEmpty = cartItems.length === 0

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
          {isCartEmpty ? (
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

          {/* 3. 결제 방법 버튼을 지우고 피그마 디자인에 맞춰 크레딧 정보로 교체했습니다. */}
          <div className="mt-10 flex flex-col gap-5">
            <div className="flex items-center justify-between">
              <span className="text-[16px] font-medium text-gray-5">총 결제금액</span>
              <strong className="text-[16px] font-bold text-gray-5">
                {formatPrice(totalPrice)}
              </strong>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[16px] font-medium text-gray-5">보유 크레딧</span>
              <strong className="text-[16px] font-bold text-primary">
                {formatCredit(myCredit)}
              </strong>
            </div>

            <div className="my-2 h-px bg-gray-2" />

            <div className="flex items-center justify-between">
              <span className="text-[16px] font-bold text-gray-5">결제 후 잔액</span>
              <strong className={`text-[16px] font-bold ${isCreditInsufficient ? 'text-primary' : 'text-gray-5'}`}>
                {formatCredit(remainingCredit)}
              </strong>
            </div>
          </div>

          <Button
            size="full"
            disabled={isCartEmpty}
            onClick={handlePayment}
            className="mt-8"
            // 크레딧이 부족하면 버튼 스타일과 텍스트를 바꿉니다.
            variant={isCreditInsufficient && !isCartEmpty ? 'outline' : 'primary'} 
          >
            {isCartEmpty 
              ? '메뉴를 담아주세요' 
              : isCreditInsufficient 
                ? '크레딧 충전하기' 
                : `${formatPrice(totalPrice)} 결제하기`}
          </Button>
        </section>
      </main>
    </div>
  )
}

export default Cart