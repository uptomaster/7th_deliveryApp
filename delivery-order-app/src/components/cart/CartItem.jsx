import QuantityControl from '../common/QuantityControl'

function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  const parsePrice = (price) => {
    if (typeof price === 'number') return price
    return Number(price.toString().replace(/[^0-9]/g, ''))
  }

  const formatPrice = (price) => {
    return `${parsePrice(price).toLocaleString()}원`
  }

  return (
    <article className="flex items-start justify-between gap-4 border-b border-gray-2 py-4">
      <div>
        <p className="text-[12px] font-medium text-primary">
          {item.storeName}
        </p>

        <h3 className="mt-1 text-[20px] font-bold text-gray-5">
          {item.name}
        </h3>

        <p className="mt-1 text-[12px] font-medium text-gray-3">
          {item.description}
        </p>

        {item.selectedOptions?.length > 0 && (
          <ul className="mt-3 space-y-1">
            {item.selectedOptions.map((option) => (
              <li
                key={option.id}
                className="text-[12px] font-medium text-gray-3"
              >
                ㄴ {option.groupTitle}: {option.name}{' '}
                {formatPrice(option.price)}
              </li>
            ))}
          </ul>
        )}

        <p className="mt-3 text-[20px] font-bold text-primary">
          {formatPrice(item.unitPrice || item.price)}
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