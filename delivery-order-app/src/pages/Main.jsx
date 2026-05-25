import Navbar from '../components/common/Navbar'

function Main() {
  return (
    <div className="min-h-screen bg-gray-1">
      <Navbar />

      <main className="mx-auto max-w-[1725px] px-5 py-10 dt:px-10">
        <section>
          <h1 className="text-[36px] font-bold text-gray-5">Main Page</h1>

          <p className="mt-2 text-[20px] font-medium text-gray-3">
            메인 페이지 작업 영역입니다.
          </p>
        </section>
      </main>
    </div>
  )
}

export default Main