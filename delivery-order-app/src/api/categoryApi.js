import axiosInstance from './axiosInstance'

export async function fetchCategories() {
  const { data } = await axiosInstance.get('/categories')

  return {
    ...data,
    result: data.result?.map((category) => ({
      id: category.categoryId,
      categoryId: category.categoryId,
      name: category.tagName,
      tagName: category.tagName,
    })) ?? [],
  }
}