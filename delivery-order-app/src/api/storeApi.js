import axiosInstance from './axiosInstance'

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
    image: store.imageUrl,
  }
}

function normalizeStoreDetail(store) {
  return {
    id: store.storeId,
    storeId: store.storeId,
    category: store.categoryName,
    name: store.storeName,
    rating: store.storeRating,
    image: store.imageUrl,
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