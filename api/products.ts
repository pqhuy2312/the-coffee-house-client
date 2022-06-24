import queryString from 'query-string'
import { api } from './api'
import {
    ICreateProductParams,
    IProduct,
    IApiResponse,
    IPaginationParams,
    IPaginationResponse,
} from 'types'

export const productsApi = {
    createProduct: async (params: ICreateProductParams) => {
        const res: IApiResponse<Array<IProduct>> = await api.post(
            '/products',
            params,
        )
        return res.data
    },
    getProducts: async (params: IPaginationParams) => {
        const paramsString = queryString.stringify(params)
        const res: IApiResponse<IPaginationResponse<IProduct[]>> =
            await api.get(`/products?${paramsString}`)
        return res.data
    },
    getProduct: async (slug: string) => {
        const res: IApiResponse<IProduct> = await api.get(`/products/${slug}`)
        return res.data
    },
    getProductsByCategory: async (
        categoryId: number,
        params: IPaginationParams,
    ) => {
        const paramsString = queryString.stringify(params)
        const res: IApiResponse<IPaginationResponse<IProduct[]>> =
            await api.get(`/categories/${categoryId}/products?${paramsString}`)
        return res.data
    },
}
