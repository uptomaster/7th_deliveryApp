import QuantityControl from '../common/QuantityControl'

function CartItem({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}) {
  // 옵션 가격 포맷팅 유틸 (숫자 추출 후 '원' 붙이기)
  const formatOptionPrice = (price) => {
    const num = Number(price.toString().replace(/[^0-9]/g, ''));
    return num > 0 ? ` (+${num.toLocaleString()}원)` : '';
  }

  return (
    <article className="flex items-center justify-between gap-4 border-b border-gray-2 py-4">
      <div>
        <h3 className="text-[20px] font-bold text-gray-5">{item.name}</h3>

        <p className="mt-1 text-[12px] font-medium text-gray-3">
          {item.description}
        </p>

        {/* 👈 추가된 부분: 선택된 옵션이 존재하면 리스트 형태로 보여줍니다 */}
        {item.selectedOptions && item.selectedOptions.length > 0 && (
          <ul className="mt-2 space-y-1">
            {item.selectedOptions.map((opt, idx) => (
              <li key={idx} className="text-[12px] font-medium text-primary">
                ✓ {opt.name}{formatOptionPrice(opt.price)}
              </li>
            ))}
          </ul>
        )}

        {/* 👈 수정된 부분: 계산된 최종 가격(unitPrice)을 텍스트로 포맷팅해서 보여줍니다 */}
        <p className="mt-2 text-[20px] font-bold text-primary">
          {item.unitPrice ? `${item.unitPrice.toLocaleString()}원` : item.price}
        </p>
      </div>

      <div className="flex flex-col items-end gap-3">
        <button
          type="button"
          onClick={() => onRemove(item.id)}
          className="text-[12px] font-medium text-gray-3 transition hover:text-primary"
        >
          삭제
        </button>

        <QuantityControl
          count={item.count}
          onDecrease={() => onDecrease(item.id)}
          onIncrease={() => onIncrease(item.id)}
        />
      </div>
    </article>
  )
}

export default CartItem