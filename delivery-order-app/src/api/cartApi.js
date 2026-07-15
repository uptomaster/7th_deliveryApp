import axiosInstance from './axiosInstance'

function normalizeCartItem(item) {
  const options = item.options ?? []

  const optionsPrice = options.reduce((sum, option) => {
    return sum + Number(option.extraPrice ?? 0)
  }, 0)

  const unitPrice = Number(item.menuPrice ?? 0) + optionsPrice

  return {
    id: item.cartItemId,
    cartItemId: item.cartItemId,
    menuId: item.menuId,
    name: item.menuName,
    menuName: item.menuName,
    description: '',
    count: item.itemQuantity,
    itemQuantity: item.itemQuantity,
    price: item.menuPrice,
    menuPrice: item.menuPrice,
    unitPrice,
    selectedOptions: options.map((option) => ({
      id: option.optionId,
      optionId: option.optionId,
      name: option.optionName,
      optionName: option.optionName,
      price: option.extraPrice,
      extraPrice: option.extraPrice,
      groupTitle: '옵션',
    })),
  }
}

function normalizeCart(cart) {
  return {
    cartId: cart.cartId,
    items: cart.items?.map(normalizeCartItem) ?? [],
    totalCartPrice: cart.totalCartPrice ?? 0,
  }
}

export async function fetchCart() {
  const { data } = await axiosInstance.get('/carts')

  return {
    ...data,
    result: normalizeCart(data.result),
  }
}

export async function addCartItem({ menuId, itemQuantity, optionIds }) {
  const { data } = await axiosInstance.post('/carts/items', {
    menuId,
    itemQuantity,
    optionIds,
  })

  return data
}

export async function updateCartItemQuantity(cartItemId, itemQuantity) {
  const { data } = await axiosInstance.patch(`/carts/items/${cartItemId}`, {
    itemQuantity,
  })

  return data
}

export async function deleteCartItem(cartItemId) {
  const { data } = await axiosInstance.delete(`/carts/items/${cartItemId}`)

  return data
}