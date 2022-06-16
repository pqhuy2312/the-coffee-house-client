import { ChangeEvent } from 'react'

export type InputChange = ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>

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

export interface ICreateProductParams {
    name: string
    slug: string
    price: number
    info: string
    story: string
    images: string[]
    categoryId: number
    toppings: number[]
    sizes: IProductSize[]
}

export interface IProductImage {
    id: number
    productId: number
    url: string
    createdAt: Date
    updatedAt: Date
}

export interface IProduct {
    id: number
    name: string
    slug: string
    price: number
    info: string
    story: string
    images: IProductImage[]
    sizes: IProductSize[]
    toppings: ITopping[]
    categoryId: number
    createdAt: Date
    updatedAt: Date
}

export interface IProductSize {
    name: string
    price: number
}

export interface ITopping {
    id: number
    name: string
    price: number
    createdAt: Date
    updatedAt: Date
}

export interface IImageUploaded {
    public_id: string
    secure_url: string
}

export interface IPaginationParams {
    page: number
    limit: number
    sort?: string
}

export interface IPaginationResponse<T> extends IPaginationParams {
    totalRows: number
    firstPage: string
    previousPage: string
    nextPage: string
    lastPage: string
    totalPage: number
    rows: T
}
