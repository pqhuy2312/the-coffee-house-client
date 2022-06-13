import { setCookie } from 'nookies'

export const setToken = (at: string, rt: string) => {
    setCookie(null, 'accessToken', at, {
        maxAge: 3 * 24 * 60 * 60,
        path: '/',
    })
    setCookie(null, 'refreshToken', rt, {
        maxAge: 7 * 24 * 60 * 60,
        path: '/',
    })
}
