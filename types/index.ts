export interface IApiResponse<T> {
    success: boolean
    message: string
    data: T
}

export interface ICategory {
    id: number
    title: string
    slug: string
    children: Array<ICategory>
    createdAt: Date
    updatedAt: Date
}

export interface ITopic {
    id: number
    title: string
    slug: string
    tags: Array<ITopic>
    createdAt: Date
    updatedAt: Date
}

export interface IUser {
    id: number
    userName: string
    email: string
    avatar: string
    role: 'USER' | 'ADMIN'
    socialId: string
    address: IAddress
    createdAt: Date
    updatedAt: Date
}

export interface IAddress {
    id: number
    phone: string
    address: string
    userId: number
    createdAt: Date
    updatedAt: Date
}

export interface ILoginParams {
    email: string
    password: string
}
