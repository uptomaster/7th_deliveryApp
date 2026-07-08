import { useState, useEffect } from 'react' // 👈 1. useEffect 추가
import Button from '../common/Button'
import QuantityControl from '../common/QuantityControl'
import { useCart } from '../../context/CartContext'

// 💡 남혁 형이 작업할 부분: 나중에 실제 식당 데이터(restaurants.js)에 옵션이 추가되면 이 더미 데이터를 지우고 실제 데이터를 쓰면 됩니다!
const DUMMY_OPTIONS = [
  { id: 'opt1', name: '사이즈 업', price: 1000 },
  { id: 'opt2', name: '치즈 토핑', price: 500 },
  { id: 'opt3', name: '매운맛 변경', price: 500 },
]

function MenuModal({ restaurant, onClose }) {
  const { addToCart } = useCart()

  // 1. 화면 전환 상태: null이면 '메뉴 목록', 특정 메뉴 객체면 '옵션 선택 화면'
  const [activeMenu, setActiveMenu] = useState(null)
  
  // 2. 옵션 선택 화면용 상태 (선택한 옵션 배열, 수량)
  const [selectedOptions, setSelectedOptions] = useState([])
  const [count, setCount] = useState(1)

  if (!restaurant) return null

  // 옵션 체크박스 클릭 시 추가/해제하는 함수
  const toggleOption = (option) => {
    setSelectedOptions((prev) => {
      const isExist = prev.find((opt) => opt.id === option.id)
      if (isExist) {
        return prev.filter((opt) => opt.id !== option.id) // 이미 있으면 해제
      }
      return [...prev, option] // 없으면 추가
    })
  }

  // 장바구니 담기 버튼
  const handleAddToCart = () => {
    // 💡 민서 님이 수정한 CartContext의 addToCart 함수에 맞게 데이터(selectedOptions)를 넘겨줍니다!
    addToCart(restaurant.name, activeMenu, count, selectedOptions)
    onClose() // 담은 후에는 모달을 닫습니다.
  }

  // ==========================================
  // [화면 A] 특정 메뉴를 클릭했을 때 나오는 '옵션 선택 화면'
  // ==========================================
  if (activeMenu) {
    const parsePrice = (price) => Number(price.toString().replace(/[^0-9]/g, ''))
    const basePrice = parsePrice(activeMenu.price)
    const optionsPrice = selectedOptions.reduce((sum, opt) => sum + opt.price, 0)
    const totalPrice = (basePrice + optionsPrice) * count

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-5">
        <section className="flex w-full max-w-[420px] flex-col rounded-modal bg-gray-0 p-7 shadow-2xl">
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-[24px] font-bold text-gray-5">{activeMenu.name}</h2>
            <button type="button" onClick={() => setActiveMenu(null)} className="text-[24px] font-medium text-gray-4 transition hover:text-primary">
              ←
            </button>
          </div>
          <p className="mt-1 text-[12px] font-medium text-gray-3">{activeMenu.description}</p>
          <p className="mt-2 text-[20px] font-bold text-gray-5">{activeMenu.price}</p>

          <div className="my-6 h-px bg-gray-2" />

          {/* 남혁 형이 주로 작업할 옵션 리스트 UI 영역 */}
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            <h3 className="text-[16px] font-bold text-gray-5">추가 옵션</h3>
            {DUMMY_OPTIONS.map((opt) => (
              <label key={opt.id} className="flex cursor-pointer items-center justify-between">
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    className="h-4 w-4 accent-primary"
                    checked={selectedOptions.some((s) => s.id === opt.id)}
                    onChange={() => toggleOption(opt)}
                  />
                  <span className="text-[14px] font-medium text-gray-5">{opt.name}</span>
                </div>
                <span className="text-[14px] font-medium text-gray-5">
                  +{opt.price.toLocaleString()}원
                </span>
              </label>
            ))}
          </div>

          <div className="my-6 h-px bg-gray-2" />

          <div className="mb-6 flex items-center justify-between">
            <span className="text-[16px] font-bold text-gray-5">수량</span>
            <QuantityControl
              count={count}
              onDecrease={() => setCount(Math.max(1, count - 1))}
              onIncrease={() => setCount(count + 1)}
            />
          </div>

          <Button variant="primary" size="full" onClick={handleAddToCart}>
            {totalPrice.toLocaleString()}원 담기
          </Button>
        </section>
      </div>
    )
  }

  // ==========================================
  // [화면 B] 기존과 같은 '메뉴 목록 화면'
  // ==========================================
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-5">
      <section className="flex w-full max-w-[420px] flex-col rounded-modal bg-gray-0 p-7 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[12px] font-medium text-primary">{restaurant.category}</p>
            <h2 className="mt-1 text-[36px] font-bold text-gray-5">{restaurant.name}</h2>
            <p className="mt-2 text-[12px] font-medium text-gray-3">⭐ {restaurant.rating}</p>
          </div>
          <button type="button" onClick={onClose} className="text-[24px] font-medium text-gray-4 transition hover:text-primary" aria-label="모달 닫기">
            ×
          </button>
        </div>

        <div className="my-6 h-px bg-gray-2" />

        <div className="max-h-[50vh] space-y-9 overflow-y-auto pr-2">
          {restaurant.menus?.map((menu) => (
            <div key={menu.id} className="flex items-center justify-between gap-4">
              <div>
                <h3 className="text-[20px] font-bold text-gray-5">{menu.name}</h3>
                <p className="mt-1 text-[12px] font-medium text-gray-3">{menu.description}</p>
                <p className="mt-1 text-[20px] font-bold text-gray-5">{menu.price}</p>
              </div>
              
              {/* + 버튼 대신 '선택' 버튼으로 옵션 화면에 진입하도록 변경 */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setActiveMenu(menu)
                  setCount(1)
                  setSelectedOptions([])
                }}
              >
                선택
              </Button>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default MenuModal