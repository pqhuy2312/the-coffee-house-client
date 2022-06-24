import { IApiResponse, ITag } from 'types'
import api from './api'

export const tagsApi = {
    getTags: async () => {
        const res: IApiResponse<Array<ITag>> = await api.get('/tags')
        return res.data
    },
}
