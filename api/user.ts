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
        const res: IApiResponse<{ accessToken: string; refreshToken: string }> =
            await api.post('/auth/login', params)
        return res.data
    },
    refreshToken: async (token: string) => {
        const res: IApiResponse<{ accessToken: string; refreshToken: string }> =
            await (
                await fetch(
                    `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh-token`,
                    {
                        method: 'POST',
                        headers: {
                            Accept: 'application/json, text/plain, */*',
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ refreshToken: token }),
                    },
                )
            ).json()

        return res.data
    },
}
