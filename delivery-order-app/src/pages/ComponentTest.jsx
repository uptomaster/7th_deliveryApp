import { useState } from 'react'
import Button from '../components/common/Button'
import Input from '../components/common/Input'
import Badge from '../components/common/Badge'
import QuantityControl from '../components/common/QuantityControl'
import MenuModal from '../components/restaurant/MenuModal'

const sampleRestaurant = {
  id: 1,
  name: '왕꼬치',
  category: '꼬치',
  rating: 4.6,
  description: '따뜻하게 구운 꼬치 전문점',
  menus: [
    {
      id: 1,
      name: '소고기 꼬치 세트 (5ea)',
      description: '육즙 소고기 꼬치 5개 세트',
      price: '15,000원',
    },
    {
      id: 2,
      name: '닭꼬치 세트 (5ea)',
      description: '간장 닭꼬치 5개 세트',
      price: '12,000원',
    },
    {
      id: 3,
      name: '떡꼬치 (3ea)',
      description: '매콤달콤 떡꼬치',
      price: '5,000원',
    },
  ],
}

function ComponentTest() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [count, setCount] = useState(1)

  return (
    <main className="min-h-screen bg-gray-1 p-8">
      <section className="mx-auto max-w-[900px] rounded-modal bg-gray-0 p-8">
        <h1 className="text-[36px] font-bold text-gray-5">
          공통 컴포넌트 테스트
        </h1>

        <p className="mt-2 text-[20px] font-medium text-gray-3">
          팀원들이 Button, Input, Badge, QuantityControl, MenuModal을 확인하는 페이지입니다.
        </p>

        <div className="mt-8 space-y-10">
          <section>
            <h2 className="mb-4 text-[24px] font-medium text-gray-5">Input</h2>

            <div className="max-w-[360px] space-y-3">
              <Input placeholder="아이디를 입력하세요" />
              <Input value="yiyoonseo" onChange={() => {}} />
              <Input value="leeyoonseo" onChange={() => {}} error />
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-[24px] font-medium text-gray-5">Button</h2>

            <div className="flex flex-wrap gap-3">
              <Button disabled>로그인</Button>
              <Button variant="yellow">로그인</Button>
              <Button>로그인</Button>
              <Button variant="outline">로그인</Button>
              <Button variant="secondary">보조 버튼</Button>
              <Button variant="dark">다크 버튼</Button>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-[24px] font-medium text-gray-5">Badge</h2>

            <div className="flex flex-wrap gap-3">
              <Badge>1</Badge>
              <Badge variant="yellow">전체</Badge>
              <Badge variant="gray">카테고리</Badge>
              <Badge variant="assistive">옵션</Badge>
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-[24px] font-medium text-gray-5">
              QuantityControl
            </h2>

            <QuantityControl
              count={count}
              onDecrease={() => setCount((prev) => Math.max(1, prev - 1))}
              onIncrease={() => setCount((prev) => prev + 1)}
            />
          </section>

          <section>
            <h2 className="mb-4 text-[24px] font-medium text-gray-5">
              MenuModal
            </h2>

            <Button onClick={() => setIsModalOpen(true)}>
              메뉴 모달 열기
            </Button>
          </section>
        </div>
      </section>

      {isModalOpen && (
        <MenuModal
          restaurant={sampleRestaurant}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </main>
  )
}

export default ComponentTest