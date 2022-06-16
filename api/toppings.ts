import { IApiResponse, ITopping } from 'types'
import api from './api'

export const toppingsApi = {
    getToppings: async () => {
        const res: IApiResponse<Array<ITopping>> = await api.get('/toppings')
        return res.data
    },
}
