import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import queryString from 'query-string'
import jwt_decode, { JwtPayload } from 'jwt-decode'
import { parseCookies, setCookie } from 'nookies'
import { getToken } from 'utils'

export const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
    paramsSerializer: (params) => queryString.stringify(params),
})

api.interceptors.request.use(async (config: any) => {
    try {
        let accessToken = await getToken()

        accessToken && (config.headers.Authorization = 'Bearer ' + accessToken)
    } catch (error) {}

    return config
})

api.interceptors.response.use(
    (response: AxiosResponse) => {
        console.log(response)
        if (response && response.data) {
            return response.data
        }
        return response
    },
    (error) => {
        // Handle errors
        throw error
    },
)
export default api
