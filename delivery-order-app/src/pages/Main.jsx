import Button from '../components/common/Button'

function Main() {
  return (
    <main className="min-h-screen bg-gray-1 px-6 py-10">
      <section className="mx-auto max-w-[900px] rounded-modal bg-gray-0 p-8">
        <h1 className="text-[36px] font-bold text-gray-5">
          디자인 시스템 테스트
        </h1>

        <p className="mt-3 text-[20px] font-medium text-gray-3">
          컬러, 버튼, radius, 텍스트 스타일이 적용되는지 확인하는 화면입니다.
        </p>

        <div className="mt-8">
          <h2 className="text-[24px] font-medium text-gray-5">Button</h2>

          <div className="mt-4 flex flex-wrap gap-3">
            <Button>Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="assistive">Assistive</Button>
            <Button variant="yellow">Yellow</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="dark">Dark</Button>
          </div>

          <div className="mt-4 flex flex-wrap gap-3">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
            <Button disabled>Disabled</Button>
          </div>

          <div className="mt-4">
            <Button size="full">Full Width Button</Button>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-[24px] font-medium text-gray-5">Color</h2>

          <div className="mt-4 grid grid-cols-2 gap-3 ph:grid-cols-2 dt:grid-cols-6">
            <div className="h-24 rounded-small bg-gray-0 p-3 text-[12px] font-medium shadow">
              gray-0
            </div>
            <div className="h-24 rounded-small bg-gray-1 p-3 text-[12px] font-medium shadow">
              gray-1
            </div>
            <div className="h-24 rounded-small bg-gray-2 p-3 text-[12px] font-medium">
              gray-2
            </div>
            <div className="h-24 rounded-small bg-gray-3 p-3 text-[12px] font-medium text-gray-0">
              gray-3
            </div>
            <div className="h-24 rounded-small bg-gray-4 p-3 text-[12px] font-medium text-gray-0">
              gray-4
            </div>
            <div className="h-24 rounded-small bg-gray-5 p-3 text-[12px] font-medium text-gray-0">
              gray-5
            </div>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 ph:grid-cols-2 dt:grid-cols-5">
            <div className="h-24 rounded-small bg-primary p-3 text-[12px] font-medium text-gray-0">
              primary
            </div>
            <div className="h-24 rounded-small bg-secondary p-3 text-[12px] font-medium">
              secondary
            </div>
            <div className="h-24 rounded-small bg-assistive p-3 text-[12px] font-medium">
              assistive
            </div>
            <div className="h-24 rounded-small bg-yellow-primary p-3 text-[12px] font-medium">
              yellow-primary
            </div>
            <div className="h-24 rounded-small bg-yellow-secondary p-3 text-[12px] font-medium">
              yellow-secondary
            </div>
          </div>
        </div>

        <div className="mt-10">
          <h2 className="text-[24px] font-medium text-gray-5">Radius</h2>

          <div className="mt-4 flex flex-wrap gap-4">
            <div className="h-24 w-40 rounded-modal bg-gray-2 p-4 text-[12px] font-medium">
              rounded-modal
            </div>
            <div className="h-24 w-40 rounded-button bg-secondary p-4 text-[12px] font-medium">
              rounded-button
            </div>
            <div className="h-24 w-40 rounded-small bg-yellow-primary p-4 text-[12px] font-medium">
              rounded-small
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}

export default Main