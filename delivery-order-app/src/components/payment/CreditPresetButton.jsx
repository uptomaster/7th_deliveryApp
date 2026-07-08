function CreditPresetButton({ amount, selected = false, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-small px-3 py-2 text-[20px] font-medium transition ${
        selected
          ? 'border border-green-primary bg-green-secondary text-gray-0'
          : 'bg-gray-1 text-gray-5 hover:bg-gray-2'
      }`}
    >
      +{amount.toLocaleString('ko-KR')}C
    </button>
  )
}

export default CreditPresetButton
