import { IApiResponse, ICategory } from 'types'
import api from './api'

export const categoriesApi = {
    getCategories: async () => {
        const res: IApiResponse<Array<ICategory>> = await api.get('/categories')
        return res.data
    },
}
