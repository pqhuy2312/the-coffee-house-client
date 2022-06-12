import { categoriesApi } from 'api'
import { topicsApi } from 'api/topics'
import Link from 'next/link'
import { useMemo } from 'react'
import { useQuery } from 'react-query'
import Dropdown, { IDropdownCol } from './Dropdown'

const Header = () => {
    const { data: categories } = useQuery(
        'categories',
        categoriesApi.getCategories,
    )
    const { data: topics } = useQuery('topics', topicsApi.getTopics)

    const CATEGORIES_DATA = useMemo(
        () =>
            categories?.reduce((prev: Array<IDropdownCol>, cur) => {
                const item: IDropdownCol = {
                    root: {
                        title: cur.title,
                        url: `/categories/${cur.slug}`,
                    },
                    children: cur.children.map((item) => ({
                        title: item.title,
                        url: `/categories/${item.slug}`,
                    })),
                }
                prev.push(item)
                return prev
            }, []),
        [categories],
    )

    const TOPICS_DATA = useMemo(
        () =>
            topics?.reduce((prev: Array<IDropdownCol>, cur) => {
                const item: IDropdownCol = {
                    root: {
                        title: cur.title,
                        url: `/topics/${cur.slug}`,
                    },
                    children: cur.tags.map((item) => ({
                        title: item.title,
                        url: `/topics/${item.slug}`,
                    })),
                }
                prev.push(item)
                return prev
            }, []),
        [topics],
    )

    const NAV = useMemo(
        () => [
            {
                title: 'Cà phê',
                url: '/',
            },
            {
                title: 'Trà',
                url: '/',
            },
            {
                title: 'Menu',
                url: '/',
                dropdown: <Dropdown data={CATEGORIES_DATA || []} />,
            },
            {
                title: 'Chuyện nhà',
                url: '/',
                dropdown: <Dropdown data={TOPICS_DATA || []} />,
            },
            {
                title: 'Cửa hàng',
                url: '/',
            },
            {
                title: 'Tuyển dụng',
                url: '/',
            },
        ],
        [CATEGORIES_DATA, TOPICS_DATA],
    )

    return (
        <header className="sticky z-50 top-0 bg-[rgba(255,255,255,0.8)]">
            <nav className="flex items-center layout">
                <Link href="/">
                    <a className="logo">
                        <svg className="svg-logo">
                            <use
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                xlinkHref="#logo"
                            ></use>
                        </svg>
                    </a>
                </Link>
                <ul className="flex items-center ml-[70px]">
                    {NAV.map(({ url, title, dropdown }, index) => (
                        <li className="group" key={index}>
                            <Link href={url}>
                                <a className="text-sm px-4 py-5 font-semibold transition-colors duration-300 group hover:text-primary">
                                    {title}
                                    <span className="ml-1">
                                        {dropdown && (
                                            <svg
                                                width="6"
                                                height="4"
                                                viewBox="0 0 6 4"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="inline"
                                            >
                                                <path
                                                    d="M2.99992 3.33332L0.333252 0.666656H5.66659L2.99992 3.33332Z"
                                                    fill="black"
                                                    fillOpacity="0.6"
                                                    className="group-hover:fill-primary transition-colors duration-300"
                                                ></path>
                                            </svg>
                                        )}
                                    </span>
                                </a>
                            </Link>
                            {dropdown}
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    )
}

export default Header
