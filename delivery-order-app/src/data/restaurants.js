import img1 from '../assets/images/왕꼬치.jpg'
import img2 from '../assets/images/떡고치.webp'
import img3 from '../assets/images/물떡꼬치.jpg'
import img4 from '../assets/images/소떡소떡.jpg'
import img5 from '../assets/images/소시지꼬치.jpg'
import img6 from '../assets/images/오뎅꼬치.jpg'
import img7 from '../assets/images/은행꼬치.jpg'
import img8 from '../assets/images/꼬치전.jpg'

export const restaurants = [
  {
    id: 1,
    name: '닭꼬치',
    category: '분식',
    rating: 4.6,
    description: '숯불 향 가득한 정통 닭꼬치 전문점',
    image: img1,
    menus: [
      {
        id: 1,
        name: '매콤 달콤 닭꼬치 (3ea)',
        description: '특제 매운 소스를 바른 직화구이',
        price: '9,000원',
      },
      {
        id: 2,
        name: '단짠 데리야끼 파닭꼬치 (3ea)',
        description: '어린이도 좋아하는 순한맛 파닭',
        price: '9,500원',
      },
      {
        id: 3,
        name: '소금구이 닭꼬치 (3ea)',
        description: '담백한 육즙이 살아있는 기본 꼬치',
        price: '8,500원',
      },
    ],
  },
  {
    id: 2,
    name: '떡꼬치',
    category: '분식',
    rating: 4.7,
    description: '추억의 학교 앞 떡꼬치 맛 그대로!',
    image: img2,
    menus: [
      {
        id: 1,
        name: '옛날 떡꼬치 (4ea)',
        description: '바삭하게 튀겨 매콤달콤 소스를 바른 추억의 맛',
        price: '4,000원',
      },
      {
        id: 2,
        name: '눈꽃 치즈 떡꼬치 (4ea)',
        description: '떡꼬치 위에 고소한 치즈가 듬뿍',
        price: '5,500원',
      },
      {
        id: 3,
        name: '마라맛 떡꼬치 (4ea)',
        description: '알싸한 마라 향이 매력적인 신메뉴',
        price: '5,000원',
      },
    ],
  },
  {
    id: 3,
    name: '물떡꼬치',
    category: '기타',
    rating: 4.5,
    description: '부산에서 올라온 쫀득한 물떡 전문',
    image: img3,
    menus: [
      {
        id: 1,
        name: '부산 어묵국물 물떡 (3ea)',
        description: '진한 멸치 육수가 배어든 쫀득한 가래떡',
        price: '3,500원',
      },
      {
        id: 2,
        name: '매콤 국물 물떡 (3ea)',
        description: '얼큰한 빨간 국물에 끓인 별미',
        price: '4,000원',
      },
      {
        id: 3,
        name: '물떡 & 곤약 세트',
        description: '물떡 2개와 탱글한 곤약 꼬치 2개',
        price: '4,500원',
      },
    ],
  },
  {
    id: 4,
    name: '오뎅꼬치',
    category: '분식',
    rating: 4.8,
    description: '겨울철 필수 간식, 뜨끈한 오뎅 국물',
    image: img4,
    menus: [
      {
        id: 1,
        name: '기본 꼬불이 오뎅 (5ea)',
        description: '두툼하고 쫄깃한 사각 어묵',
        price: '4,000원',
      },
      {
        id: 2,
        name: '매운 빨간오뎅 (5ea)',
        description: '스트레스 풀리는 알싸한 매운맛',
        price: '4,500원',
      },
      {
        id: 3,
        name: '프리미엄 모듬 어묵탕',
        description: '다양한 수제 어묵이 들어간 푸짐한 한 그릇',
        price: '12,000원',
      },
    ],
  },
  {
    id: 5,
    name: '소세지꼬치',
    category: '기타',
    rating: 4.4,
    description: '육즙 팡팡 터지는 수제 소세지',
    image: img5,
    menus: [
      {
        id: 1,
        name: '뽀득 점보 소세지 (2ea)',
        description: '크기도 육즙도 두 배인 점보 사이즈',
        price: '5,000원',
      },
      {
        id: 2,
        name: '모짜렐라 치즈 소세지 (2ea)',
        description: '소세지 안에 고소한 치즈가 듬뿍',
        price: '6,000원',
      },
      {
        id: 3,
        name: '매콤 청양고추 소세지 (2ea)',
        description: '느끼함을 싹 잡아주는 청양고추 콕콕',
        price: '5,500원',
      },
    ],
  },
  {
    id: 6,
    name: '소떡소떡',
    category: '분식',
    rating: 4.9,
    description: '휴게소의 감동을 집에서 즐기세요',
    image: img6,
    menus: [
      {
        id: 1,
        name: '오리지널 소떡소떡 (2ea)',
        description: '소세지와 떡의 완벽한 1:1 비율',
        price: '6,000원',
      },
      {
        id: 2,
        name: '뿌링클 소떡소떡 (2ea)',
        description: '단짠단짠 마법의 가루가 듬뿍',
        price: '7,000원',
      },
      {
        id: 3,
        name: '불닭 소떡소떡 (2ea)',
        description: '매운맛 매니아를 위한 화끈한 소스',
        price: '6,500원',
      },
    ],
  },
  {
    id: 7,
    name: '은행꼬치',
    category: '기타',
    rating: 4.3,
    description: '가볍게 즐기는 이자카야 감성 안주',
    image: img7,
    menus: [
      {
        id: 1,
        name: '소금구이 은행꼬치 (5ea)',
        description: '짭쪼름하고 고소한 은행 본연의 맛',
        price: '4,000원',
      },
      {
        id: 2,
        name: '버터구이 은행꼬치 (5ea)',
        description: '버터의 풍미가 더해져 부드러운 맛',
        price: '4,500원',
      },
      {
        id: 3,
        name: '마늘 & 은행 꼬치 (5ea)',
        description: '구운 마늘이 번갈아 끼워져 찰떡궁합',
        price: '5,000원',
      },
    ],
  },
  {
    id: 8,
    name: '꼬치전',
    category: '분식',
    rating: 4.6,
    description: '명절에만 먹던 맛있는 전을 언제나!',
    image: img8,
    menus: [
      {
        id: 1,
        name: '명절 삼색 꼬치전 (3ea)',
        description: '맛살, 햄, 단무지, 파의 완벽한 조화',
        price: '6,000원',
      },
      {
        id: 2,
        name: '해물 파전 꼬치 (3ea)',
        description: '오징어와 파를 꽂아 바삭하게 부친 전',
        price: '7,500원',
      },
      {
        id: 3,
        name: '고기 산적 꼬치 (3ea)',
        description: '두툼한 고기가 들어간 프리미엄 꼬치전',
        price: '8,000원',
      },
    ],
  },
]