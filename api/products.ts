import queryString from 'query-string'
import { api } from './api'
import {
    ICreateProductParams,
    IProduct,
    IApiResponse,
    IPaginationParams,
    IPaginationResponse,
} from 'types'
import { QueryFunctionContext } from 'react-query'

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
    getProductBySlug: async (slug: string) => {
        const res: IApiResponse<IProduct> = await api.get(`/products/${slug}`)
        return res.data
    },
    getProductsByCategory: async ({
        queryKey,
        pageParam,
    }: QueryFunctionContext) => {
        const res: IApiResponse<IPaginationResponse<IProduct[]>> =
            await api.get(`${queryKey}&page=${pageParam ? pageParam : 1}`)
        return res.data
    },
    getRelatedProducts: async (slug: string, params: IPaginationParams) => {
        const paramsString = queryString.stringify(params)
        const res: IApiResponse<IPaginationResponse<IProduct[]>> =
            await api.get(`/products/${slug}/related?${paramsString}`)
        return res.data
    },
}
