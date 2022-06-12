import { parseCookies, setCookie } from 'nookies'
import jwtDecode, { JwtPayload } from 'jwt-decode'

import { GetServerSidePropsContext } from 'next'

import nookies from 'nookies'
import { userApi } from 'api'

export const refreshToken = async (ctx?: GetServerSidePropsContext) => {
    try {
        if (ctx) {
            const Cookie = ctx?.req.headers.cookie

            const accessToken = await userApi.refreshToken(Cookie)
            if (accessToken) {
                nookies.set(ctx, 'accessToken', accessToken, {
                    maxAge: 12 * 60,
                })
            }

            return accessToken
        } else {
            const accessToken = await userApi.refreshToken()

            if (accessToken) {
                setCookie(null, 'accessToken', accessToken, {
                    maxAge: 3 * 24 * 60 * 60,
                })
            }

            return accessToken
        }
    } catch (error) {
        console.log(error)
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
            setCookie(null, 'accessToken', newAccessToken, {
                maxAge: 12 * 60,
            })
            return newAccessToken
        }
    } catch (error) {
        console.log(error)
        return null
    }
    return accessToken
}
