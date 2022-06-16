import { userApi } from 'api'
import Image from 'next/image'
import Link from 'next/link'
import { ReactNode, useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import { IUser } from 'types'
import { BiBell } from 'react-icons/bi'
import AdminSidebar from './AdminSidebar'
import { useRouter } from 'next/router'

interface IAdminLayout {
    children: ReactNode
}

const AdminLayout: React.FC<IAdminLayout> = ({ children }) => {
    const { data, error, isLoading } = useQuery('me', () => userApi.me())
    const [hide, setHide] = useState(false)
    const router = useRouter()

    useEffect(() => {
        if (error || (data && data.role != 'ADMIN')) {
            router.push('/')
        }
    }, [error])

    if (isLoading) return null

    return (
        <div className="flex">
            <AdminSidebar hide={hide} />
            <div className="flex-1">
                <div className=" h-[70px] flex items-center justify-between shadow-md sticky top-0 z-50 bg-white">
                    <button
                        onClick={() => setHide(!hide)}
                        className="px-5 h-full flex"
                    >
                        <span className="bars m-auto" />
                    </button>
                    <div className="pr-5 flex items-center gap-x-4 text-gray-500">
                        <button>
                            <BiBell className="text-[26px]" />
                        </button>
                        <button className="cursor-pointer flex items-center">
                            <div className="w-8 h-8 relative">
                                <Image
                                    src={data?.avatar as string}
                                    layout="fill"
                                    objectFit="cover"
                                    className="rounded-full"
                                />
                            </div>
                            <span className="text-sm ml-2 font-medium">
                                {data?.userName}
                            </span>
                        </button>
                    </div>
                </div>
                <main className="pb-24 bg-[#F9FAFB] p-5">{children}</main>
            </div>
        </div>
    )
}

export default AdminLayout
