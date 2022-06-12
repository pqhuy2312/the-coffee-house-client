import { IApiResponse, ITopic } from 'types'
import api from './api'

export const topicsApi = {
    getTopics: async () => {
        const res: IApiResponse<Array<ITopic>> = await api.get('/topics')
        return res.data
    },
}
