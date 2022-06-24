import { IApiResponse, ICreateStoreParams, IStore } from 'types'
import api from './api'

export const storesApi = {
    createStore: async (params: ICreateStoreParams) => {
        const res: IApiResponse<IStore> = await api.post('/stores', params)
        return res.data
    },
    getStores: async () => {
        const res: IApiResponse<Array<IStore>> = await api.get('/stores')
        return res.data
    },
}
