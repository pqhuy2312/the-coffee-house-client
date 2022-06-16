import AdminLayout from 'components/AdminLayout'
import SelectField, { IOptions } from 'components/SelectField'
import { GetServerSideProps } from 'next'
import Link from 'next/link'
import React, { ReactElement, useMemo } from 'react'
import { requiredAuth } from 'utils'
import { FaPlus } from 'react-icons/fa'
import { useQuery } from 'react-query'
import { categoriesApi } from 'api'

const Index = () => {
    const { data: categories } = useQuery(
        'categories',
        categoriesApi.getCategories,
    )

    const CATEGORIES = useMemo(
        () =>
            categories?.reduce((prev: IOptions[], cur) => {
                prev.push({
                    value: cur.id,
                    label: cur.title,
                })
                if (cur.children.length > 0) {
                    prev = [
                        ...prev,
                        ...cur.children.map((item) => ({
                            value: item.id,
                            label: item.title,
                        })),
                    ]
                }

                return prev
            }, []),
        [categories],
    )

    return (
        <div>
            <h3 className="text-black text-[18px] font-bold mb-5">Courses</h3>
            <div className="p-4 shadow-sm rounded-lg bg-white">
                <form className="flex justify-between h-10 gap-x-5">
                    <input
                        className="h-full flex-1 text-field text-sm max-w-[390px]"
                        placeholder={`Search by product name`}
                        type="text"
                    />
                    <SelectField
                        options={
                            CATEGORIES?.map((item) => ({
                                value: item.value,
                                label: item.label,
                            })) || []
                        }
                    />
                    <Link href={`/admin/products/create`}>
                        <a className="h-full flex items-center px-4 text-sm primary-btn">
                            <FaPlus className="text-base" />
                            <span className="ml-3">Add Product</span>
                        </a>
                    </Link>
                </form>
            </div>
        </div>
    )
}

Index.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>

export default Index
