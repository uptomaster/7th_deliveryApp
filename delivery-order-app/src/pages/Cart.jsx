import { Link, useNavigate } from 'react-router-dom'
import CartList from '../components/cart/CartList'
import PaymentBox from '../components/payment/PaymentBox'
import { useCart } from '../context/CartContext'
import { useCredit } from '../hooks/useCredit'

function Cart() {
  const navigate = useNavigate()

  const {
    cartItems,
    handleIncrease,
    handleDecrease,
    handleRemove,
    clearCart,
  } = useCart()

  const { payWithCredit } = useCredit()

  const parsePrice = (price) => {
    if (typeof price === 'number') return price
    return Number(price.toString().replace(/[^0-9]/g, ''))
  }

  const totalPrice = cartItems.reduce((sum, item) => {
    const itemPrice = item.unitPrice || parsePrice(item.price)
    return sum + itemPrice * item.count
  }, 0)

  const isCartEmpty = cartItems.length === 0

  const handlePayment = () => {
    if (isCartEmpty) return

    const isPaid = payWithCredit(totalPrice)

    if (!isPaid) {
      navigate('/credit/charge')
      return
    }

    clearCart()
    navigate('/order-complete')
  }

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

        <PaymentBox totalPrice={totalPrice} onPayment={handlePayment} />
      </main>
    </div>
  )
}

export default Cart