import { useState } from 'react'
import Button from '../common/Button'
import QuantityControl from '../common/QuantityControl'

function MenuModal({ restaurant, onClose }) {
  const [selectedMenus, setSelectedMenus] = useState({})

  if (!restaurant) return null

  // 총 선택된 수량 계산
  const totalCount = Object.values(selectedMenus).reduce((acc, cur) => acc + cur, 0)

  const handleAddMenu = (menuId) => {
    setSelectedMenus((prev) => ({
      ...prev,
      [menuId]: 1,
    }))
  }

  const handleIncrease = (menuId) => {
    setSelectedMenus((prev) => ({
      ...prev,
      [menuId]: prev[menuId] + 1,
    }))
  }

  const handleDecrease = (menuId) => {
    setSelectedMenus((prev) => {
      const currentCount = prev[menuId]

      if (currentCount <= 1) {
        const next = { ...prev }
        delete next[menuId]
        return next
      }

      return {
        ...prev,
        [menuId]: currentCount - 1,
      }
    })
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-5">
      <section className="flex w-full max-w-[420px] flex-col rounded-modal bg-gray-0 p-7 shadow-2xl">
        {/* 상단 타이틀 영역 */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[12px] font-medium text-primary">
              {restaurant.category}
            </p>
            <h2 className="mt-1 text-[36px] font-bold text-gray-5">
              {restaurant.name}
            </h2>
            <p className="mt-2 text-[12px] font-medium text-gray-3">
              ⭐ {restaurant.rating}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-[24px] font-medium text-gray-4 transition hover:text-primary"
            aria-label="모달 닫기"
          >
            ×
          </button>
        </div>

        <div className="my-6 h-px bg-gray-2" />

        {/* 메뉴 리스트 영역 (스크롤 가능하도록 설정) */}
        <div className="max-h-[50vh] overflow-y-auto space-y-9 pr-2">
          {restaurant.menus?.map((menu) => {
            const count = selectedMenus[menu.id]

            return (
              <div
                key={menu.id}
                className="flex items-center justify-between gap-4"
              >
                <div>
                  <h3 className="text-[20px] font-bold text-gray-5">
                    {menu.name}
                  </h3>
                  <p className="mt-1 text-[12px] font-medium text-gray-3">
                    {menu.description}
                  </p>
                  <p className="mt-1 text-[20px] font-bold text-gray-5">
                    {menu.price}
                  </p>
                </div>

                {/* 우측 수량 조절 또는 추가 버튼 */}
                {count ? (
                  <QuantityControl
                    count={count}
                    onDecrease={() => handleDecrease(menu.id)}
                    onIncrease={() => handleIncrease(menu.id)}
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => handleAddMenu(menu.id)}
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-3 text-[20px] text-gray-4 transition hover:border-primary hover:text-primary"
                    aria-label="메뉴 추가"
                  >
                    +
                  </button>
                )}
              </div>
            )
          })}
        </div>

        {/* 하단 담기 버튼 통합 영역 */}
        <div className="mt-8 border-t border-gray-2 pt-6">
          <Button
            variant="yellow"
            className="w-full py-4 text-[16px] font-bold"
            onClick={onClose} // 실제 데이터 넘기는 로직은 팀장님이 이 부분에 연결하실 겁니다.
            disabled={totalCount === 0} // 선택한 메뉴가 없으면 비활성화
          >
            {totalCount > 0 ? `${totalCount}개 담기` : '메뉴를 선택해주세요'}
          </Button>
        </div>
      </section>
    </div>
  )
}

export default MenuModal