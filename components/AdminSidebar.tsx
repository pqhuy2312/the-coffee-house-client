import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { MdDashboard } from 'react-icons/md'
import { RiShoppingBag3Line } from 'react-icons/ri'

interface IAdminSidebarProps {
    hide: boolean
}

const SIDEBAR_ITEMS = [
    {
        icon: MdDashboard,
        title: 'Dashboard',
        url: '/admin/dashboard',
        iconSize: 21,
    },
    {
        icon: RiShoppingBag3Line,
        title: 'Products',
        url: '/admin/products',
        iconSize: 21,
    },
]

const AdminSidebar: React.FC<IAdminSidebarProps> = ({ hide }) => {
    const router = useRouter()
    return (
        <div
            className={`sticky shadow-lg top-0 ${
                hide ? 'min-w-[50px]' : 'min-w-[250px]'
            } transition-all duration-500  h-screen`}
        >
            <div className="h-[70px] flex justify-center items-center">
                <Link href="/admin/dashboard">
                    <a className="text-primary text-xl font-bold mx-4">ADMIN</a>
                </Link>
            </div>
            <div className="mt-5">
                {SIDEBAR_ITEMS.map((item, index) => (
                    <li key={index}>
                        <Link href={item.url}>
                            <a
                                className={`py-3 px-6 relative flex ${
                                    hide ? 'justify-center' : ''
                                } items-center ${
                                    !router.asPath.startsWith(item.url)
                                        ? 'text-[#404040] lg:hover:text-black lg:hover:bg-[#f5f5f5]'
                                        : 'text-primary before:w-1 before:h-full before:rounded-3xl before:absolute before:top-0 before:left-0 before:bg-primary'
                                }`}
                            >
                                <item.icon
                                    style={{ fontSize: item.iconSize }}
                                    className="min-w-[20px] text-left"
                                />
                                {!hide && (
                                    <span className="ml-3 text-[13px] font-semibold">
                                        {item.title}
                                    </span>
                                )}
                            </a>
                        </Link>
                    </li>
                ))}
            </div>
        </div>
    )
}

export default AdminSidebar
