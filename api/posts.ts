import queryString from 'query-string'
import {
    IApiResponse,
    ICreatePostParams,
    IPaginationParams,
    IPaginationResponse,
    IPost,
} from 'types'
import api from './api'

export const postsApi = {
    createPost: async (params: ICreatePostParams) => {
        const res: IApiResponse<Array<IPost>> = await api.post('/posts', params)
        return res.data
    },
    getPostsByTopic: async (slug: string, params: IPaginationParams) => {
        const paramsString = queryString.stringify(params)
        const res: IApiResponse<IPaginationResponse<IPost[]>> = await api.get(
            `/topics/${slug}/posts?${paramsString}`,
        )
        return res.data
    },
}
