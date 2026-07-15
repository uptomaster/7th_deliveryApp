import axiosInstance from './axiosInstance'

import img1 from '../assets/images/왕꼬치.jpg'
import img2 from '../assets/images/떡고치.webp'
import img3 from '../assets/images/물떡꼬치.jpg'
import img4 from '../assets/images/소떡소떡.jpg'
import img5 from '../assets/images/소시지꼬치.jpg'
import img6 from '../assets/images/오뎅꼬치.jpg'
import img7 from '../assets/images/은행꼬치.jpg'
import img8 from '../assets/images/꼬치전.jpg'

const fallbackImages = [img1, img2, img3, img4, img5, img6, img7, img8]

function getFallbackImage(storeId) {
  return fallbackImages[(Number(storeId) - 1) % fallbackImages.length]
}

function normalizeImageUrl(imageUrl, storeId) {
  if (!imageUrl) return getFallbackImage(storeId)

  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    if (imageUrl.includes('store1.jpg') || imageUrl.includes('store2.jpg') || imageUrl.includes('store3.jpg')) {
      return getFallbackImage(storeId)
    }

    return imageUrl
  }

  if (imageUrl.startsWith('/')) {
    return `${import.meta.env.VITE_API_BASE_URL}${imageUrl}`
  }

  return getFallbackImage(storeId)
}

function normalizeSelectionType(selectionType) {
  const upperType = String(selectionType).toUpperCase()

  if (
    upperType === 'SINGLE' ||
    upperType === 'RADIO' ||
    upperType === 'REQUIRED'
  ) {
    return 'radio'
  }

  return 'checkbox'
}

function normalizeStore(store) {
  return {
    id: store.storeId,
    storeId: store.storeId,
    category: store.categoryName,
    name: store.storeName,
    rating: store.storeRating,
    image: normalizeImageUrl(store.imageUrl, store.storeId),
  }
}

function normalizeStoreDetail(store) {
  return {
    id: store.storeId,
    storeId: store.storeId,
    category: store.categoryName,
    name: store.storeName,
    rating: store.storeRating,
    image: normalizeImageUrl(store.imageUrl, store.storeId),
    menus: store.menus?.map((menu) => ({
      id: menu.menuId,
      menuId: menu.menuId,
      name: menu.menuName,
      description: '',
      price: menu.menuPrice,
      optionGroups: menu.optionGroups?.map((group) => ({
        id: group.optionGroupId,
        optionGroupId: group.optionGroupId,
        title: group.groupName,
        type: normalizeSelectionType(group.selectionType),
        required: group.required,
        options: group.options?.map((option) => ({
          id: option.optionId,
          optionId: option.optionId,
          name: option.optionName,
          price: option.extraPrice,
          extraPrice: option.extraPrice,
        })) ?? [],
      })) ?? [],
    })) ?? [],
  }
}

export async function fetchStores(category) {
  const { data } = await axiosInstance.get('/stores', {
    params: category && category !== '전체' ? { category } : undefined,
  })

  return {
    ...data,
    result: data.result?.map(normalizeStore) ?? [],
  }
}

export async function fetchStoreDetail(storeId) {
  const { data } = await axiosInstance.get(`/stores/${storeId}`)

  return {
    ...data,
    result: normalizeStoreDetail(data.result),
  }
}