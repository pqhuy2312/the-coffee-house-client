import { IApiResponse, ICategory } from 'types'
import api from './api'

export const categoriesApi = {
    getCategories: async () => {
        const res: IApiResponse<Array<ICategory>> = await api.get('/categories')
        return res.data
    },
    getCategoryBySlug: async (slug: string) => {
        const res: IApiResponse<ICategory> = await api.get(
            `/categories/${slug}`,
        )
        return res.data
    },
}
