import React, { ReactElement } from 'react'
import AuthLayout from 'components/AuthLayout'
import { useForm } from 'react-hook-form'
import { ILoginParams } from 'types'
import TextField from 'components/TextField'
import Link from 'next/link'
import { useMutation } from 'react-query'
import { userApi } from 'api'
import { useRouter } from 'next/router'
import { setCookie } from 'nookies'

const Login = () => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ILoginParams>()
    const mutation = useMutation(userApi.login)
    const router = useRouter()

    const onSubmit = async (data: ILoginParams) => {
        try {
            const res = await mutation.mutateAsync(data)
            setCookie(null, 'accessToken', res, {
                maxAge: 12 * 60,
            })
            const to = router.query.next ? `/${router.query.next}` : '/'
            router.push(to)
        } catch (error) {}
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="font-semibold text-2xl text-gray-700 mb-6">
                Đăng nhập
            </h2>
            <div className="mb-5">
                <TextField
                    name="email"
                    label="Địa chỉ email *"
                    register={register('email', {
                        required: {
                            value: true,
                            message: 'Vui lòng nhập email',
                        },
                        pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: 'Email không hợp lệ',
                        },
                    })}
                    error={errors.email?.message}
                />
            </div>
            <div className="mb-5">
                <TextField
                    name="password"
                    label="Mật khẩu *"
                    type="password"
                    register={register('password', {
                        required: {
                            value: true,
                            message: 'Vui lòng nhập mật khẩu',
                        },
                        minLength: {
                            value: 6,
                            message: 'Mật khẩu phải chứa ít nhất 6 kí tự',
                        },
                    })}
                    error={errors.password?.message}
                />
            </div>
            <button className="primary-btn w-full">Đăng nhập</button>
            <span className="h-[2px] bg-gray-300 block my-5" />
            <Link href="/">
                <a className="text-primary mb-2 hover:underline">
                    Quên mật khẩu?
                </a>
            </Link>
            <Link href="/">
                <a className="text-primary hover:underline">Tạo tài khoản</a>
            </Link>
        </form>
    )
}

Login.getLayout = (page: ReactElement) => <AuthLayout>{page}</AuthLayout>

export default Login
