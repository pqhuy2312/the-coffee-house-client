import { destroyCookie, parseCookies, setCookie } from 'nookies'
import jwtDecode, { JwtPayload } from 'jwt-decode'

import { GetServerSidePropsContext } from 'next'

import nookies from 'nookies'
import { userApi } from 'api'
import { setToken } from './setToken'

export const refreshToken = async (ctx?: GetServerSidePropsContext) => {
    try {
        if (ctx) {
            const Cookie = ctx?.req.headers.cookie

            const res = await userApi.refreshToken(Cookie)

            nookies.set(ctx, 'accessToken', res.accessToken, {
                maxAge: 3 * 24 * 60 * 60,
                path: '/',
            })
            nookies.set(ctx, 'refreshToken', res.refreshToken, {
                maxAge: 7 * 24 * 60 * 60,
                path: '/',
            })

            return res.accessToken
        } else {
            const res = await userApi.refreshToken()

            setToken(res.accessToken, res.refreshToken)

            return res.accessToken
        }
    } catch (error) {
        if (ctx) {
            nookies.destroy(ctx, 'accessToken')
            nookies.destroy(ctx, 'refreshToken')
        } else {
            destroyCookie(null, 'accessToken')
            destroyCookie(null, 'refreshToken')
        }
        return null
    }
}

export const getToken = async (ctx?: GetServerSidePropsContext) => {
    let cookies: { [key: string]: string }
    if (ctx) {
        cookies = parseCookies(ctx)
    } else {
        cookies = parseCookies()
    }

    const accessToken = cookies.accessToken

    if (!accessToken) return null
    let currentDate = new Date().getTime()

    try {
        const { exp } = jwtDecode<JwtPayload>(accessToken)
        if (exp && currentDate > exp * 1000) {
            const newAccessToken = await refreshToken(
                ctx ? (ctx as GetServerSidePropsContext) : undefined,
            )
            if (!newAccessToken) return null

            return newAccessToken
        }
    } catch (error) {
        return null
    }
    return accessToken
}
