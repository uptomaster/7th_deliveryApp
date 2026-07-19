import { useNavigate } from 'react-router-dom'

function PageHeader({ title }) {
  const navigate = useNavigate()

  return (
    <header className="flex items-center gap-12 bg-primary px-10 py-5">
      <button
        type="button"
        onClick={() => navigate(-1)}
        aria-label="뒤로가기"
        className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-button bg-white/20 text-[24px] text-gray-0"
      >
        ←
      </button>

      <h1 className="text-[36px] font-bold text-gray-0">{title}</h1>
    </header>
  )
}

export default PageHeader
