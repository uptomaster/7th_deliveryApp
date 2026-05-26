import { useState } from 'react'
import Navbar from '../components/common/Navbar'
import CartList from '../components/cart/CartList'
import PaymentMethodButton from '../components/payment/PaymentMethodButton'
import PaymentBox from '../components/payment/PaymentBox'

function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: '소고기 꼬치 세트 (5ea)',
      description: '육즙 소고기 꼬치 5개 세트',
      price: '15,000원',
      count: 1,
    },
    {
      id: 2,
      name: '닭꼬치 세트 (5ea)',
      description: '간장 닭꼬치 5개 세트',
      price: '12,000원',
      count: 2,
    },
  ])

  const [selectedMethod, setSelectedMethod] = useState('')

  const handleCartIncrease = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, count: item.count + 1 } : item,
      ),
    )
  }

  const handleCartDecrease = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, count: Math.max(1, item.count - 1) }
          : item,
      ),
    )
  }

  const handleCartRemove = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-1">
      <Navbar />
      <main className="mx-auto max-w-[800px] px-5 py-10">
        <section className="mb-12">
          <h2 className="mb-6 text-[24px] font-bold text-gray-5">장바구니</h2>
          <CartList
            items={cartItems}
            onIncrease={handleCartIncrease}
            onDecrease={handleCartDecrease}
            onRemove={handleCartRemove}
          />
        </section>

        <section>
          <h2 className="mb-6 text-[24px] font-bold text-gray-5">결제 수단</h2>
          <div className="mb-6 flex flex-wrap gap-3">
            <PaymentMethodButton
              selected={selectedMethod === '카드 결제'}
              onClick={() => setSelectedMethod('카드 결제')}
            >
              카드 결제
            </PaymentMethodButton>
            <PaymentMethodButton
              selected={selectedMethod === '현장 결제'}
              onClick={() => setSelectedMethod('현장 결제')}
            >
              현장 결제
            </PaymentMethodButton>
          </div>
          <PaymentBox
            totalPrice="39,000원"
            selectedMethod={selectedMethod}
            onPayment={() => alert('결제 기능은 추후 구현 예정입니다.')}
          />
        </section>
      </main>
    </div>
  )
}

export default Cart