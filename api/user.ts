import { IApiResponse, ILoginParams, IUser } from 'types'
import api from './api'

export const userApi = {
    me: async (token?: string) => {
        const options = token
            ? {
                  headers: {
                      Authorization: `Bearer ${token}`,
                  },
              }
            : undefined

        const res: IApiResponse<IUser> = await api.get('/user/me', options)
        return res.data
    },
    login: async (params: ILoginParams) => {
        const res: IApiResponse<string> = await api.post('/auth/login', params)
        return res.data
    },
    refreshToken: async (Cookie?: string) => {
        const options = Cookie
            ? {
                  headers: {
                      Cookie,
                  },
              }
            : undefined
        const res: IApiResponse<string> = await api.get(
            '/auth/refresh-token',
            options,
        )

        return res.data
    },
}
