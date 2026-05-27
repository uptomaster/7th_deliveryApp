import { useState } from 'react'
import Button from '../common/Button'
import QuantityControl from '../common/QuantityControl'
import { useCart } from '../../context/CartContext' // 👈 1. 추가

function MenuModal({ restaurant, onClose }) {
  const [selectedMenus, setSelectedMenus] = useState({})
  const { addToCart } = useCart() // 👈 2. 추가

  if (!restaurant) return null

  const totalCount = Object.values(selectedMenus).reduce((acc, cur) => acc + cur, 0)

  const handleAddMenu = (menuId) => {
    setSelectedMenus((prev) => ({ ...prev, [menuId]: 1 }))
  }

  const handleIncrease = (menuId) => {
    setSelectedMenus((prev) => ({ ...prev, [menuId]: prev[menuId] + 1 }))
  }

  const handleDecrease = (menuId) => {
    setSelectedMenus((prev) => {
      const currentCount = prev[menuId]
      if (currentCount <= 1) {
        const next = { ...prev }
        delete next[menuId]
        return next
      }
      return { ...prev, [menuId]: currentCount - 1 }
    })
  }

  // 👈 3. 장바구니에 담는 함수 추가
  const handleSubmit = () => {
    restaurant.menus?.forEach((menu) => {
      const count = selectedMenus[menu.id]
      if (count > 0) {
        addToCart(restaurant.name, menu, count)
      }
    })
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-5">
      <section className="flex w-full max-w-[420px] flex-col rounded-modal bg-gray-0 p-7 shadow-2xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[12px] font-medium text-primary">{restaurant.category}</p>
            <h2 className="mt-1 text-[36px] font-bold text-gray-5">{restaurant.name}</h2>
            <p className="mt-2 text-[12px] font-medium text-gray-3">⭐ {restaurant.rating}</p>
          </div>
          <button type="button" onClick={onClose} className="text-[24px] font-medium text-gray-4 transition hover:text-primary" aria-label="모달 닫기">×</button>
        </div>

        <div className="my-6 h-px bg-gray-2" />

        <div className="max-h-[50vh] overflow-y-auto space-y-9 pr-2">
          {restaurant.menus?.map((menu) => {
            const count = selectedMenus[menu.id]
            return (
              <div key={menu.id} className="flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-[20px] font-bold text-gray-5">{menu.name}</h3>
                  <p className="mt-1 text-[12px] font-medium text-gray-3">{menu.description}</p>
                  <p className="mt-1 text-[20px] font-bold text-gray-5">{menu.price}</p>
                </div>
                {count ? (
                  <QuantityControl count={count} onDecrease={() => handleDecrease(menu.id)} onIncrease={() => handleIncrease(menu.id)} />
                ) : (
                  <button type="button" onClick={() => handleAddMenu(menu.id)} className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-3 text-[20px] text-gray-4 transition hover:border-primary hover:text-primary">+</button>
                )}
              </div>
            )
          })}
        </div>

        <div className="mt-8 border-t border-gray-2 pt-6">
          {/* 👈 4. onClick을 handleSubmit으로 변경 */}
          <Button variant="yellow" className="w-full py-4 text-[16px] font-bold" onClick={handleSubmit} disabled={totalCount === 0}>
            {totalCount > 0 ? `${totalCount}개 담기` : '메뉴를 선택해주세요'}
          </Button>
        </div>
      </section>
    </div>
  )
}

export default MenuModal