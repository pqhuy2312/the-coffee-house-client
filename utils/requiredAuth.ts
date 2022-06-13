import { userApi } from 'api'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { getToken } from './getToken'

interface IOptions {
    role?: 'ADMIN' | 'USER'
}

export const requiredAuth = (gssp: GetServerSideProps, options?: IOptions) => {
    return async (ctx: GetServerSidePropsContext) => {
        try {
            const token = await getToken(ctx)

            if (!token) {
                return {
                    redirect: {
                        destination: `/dang-nhap?next=${encodeURIComponent(
                            ctx.resolvedUrl,
                        )}`,
                        permanent: false,
                    },
                }
            }
            const queryClient = new QueryClient()
            const res = await userApi.me(token)
            queryClient.setQueryData('me', res)

            if (options?.role === 'ADMIN' && res.role !== 'ADMIN') {
                return {
                    redirect: {
                        destination: '/',
                        permanent: false,
                    },
                }
            }

            const gsspData: { [key: string]: any } = await gssp(ctx)

            if (gsspData.redirect) {
                return {
                    redirect: {
                        ...gsspData.redirect,
                        dehydratedState: dehydrate(queryClient),
                    },
                }
            }

            return {
                props: {
                    ...gsspData.props,
                    dehydratedState: dehydrate(queryClient),
                },
            }
        } catch (error) {
            return {
                redirect: {
                    destination: `/dang-nhap?next=${encodeURIComponent(
                        ctx.resolvedUrl,
                    )}`,
                    permanent: false,
                },
            }
        }
    }
}
