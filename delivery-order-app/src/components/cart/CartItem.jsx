import QuantityControl from '../common/QuantityControl'
import { formatCredit } from '../../utils/format'

function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  return (
    <article className="rounded-modal border border-gray-2 bg-gray-0">
      <div className="rounded-t-modal bg-assistive px-4 py-3">
        <p className="text-[16px] font-bold text-gray-5">{item.storeName}</p>
      </div>

      <div className="px-4 py-4">
        <h3 className="text-[20px] font-bold text-gray-5">{item.name}</h3>

        <p className="mt-1 text-[12px] font-medium text-gray-3">
          {item.description}
        </p>

        {item.selectedOptions?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {item.selectedOptions.map((option) => (
              <span
                key={option.id}
                className="rounded-small border border-primary px-2 py-1 text-[12px] font-medium text-primary"
              >
                {option.name}
              </span>
            ))}
          </div>
        )}

        <p className="mt-4 text-[20px] font-bold text-gray-5">
          {formatCredit(item.unitPrice || item.price)}
        </p>

        <div className="mt-4 flex items-center justify-between">
          <QuantityControl
            count={item.count}
            onDecrease={() => onDecrease(item.id)}
            onIncrease={() => onIncrease(item.id)}
          />

          <button
            type="button"
            onClick={() => onRemove(item.id)}
            className="text-[20px] font-medium text-gray-5 transition hover:text-primary"
            aria-label="삭제"
          >
            ×
          </button>
        </div>
      </div>
    </article>
  )
}

export default CartItem