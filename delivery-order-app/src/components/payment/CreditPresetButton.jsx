import { formatCredit } from '../../utils/format'

function CreditPresetButton({ amount, selected, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`h-10 min-w-[110px] rounded-small border px-4 text-[16px] font-bold transition ${
        selected
          ? 'border-primary bg-primary text-gray-0'
          : 'border-gray-2 bg-gray-0 text-gray-5 hover:border-primary'
      }`}
    >
      +{formatCredit(amount)}
    </button>
  )
}

export default CreditPresetButton