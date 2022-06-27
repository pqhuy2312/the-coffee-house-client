import { categoriesApi } from 'api'
import p from 'assets/images/group_8de276faa50c486b9d485826c506803b.webp'
import l from 'assets/images/vector_706a88566eab4f009bed6eea93cd890b.webp'
import b from 'assets/images/vector_c337310f409d440f890b370ff9cefe44.webp'
import cover from 'assets/images/cover_8dca94a796324989af57bf9c1e5d80e8_master.webp'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Fragment, ReactNode, useMemo } from 'react'
import { useQuery } from 'react-query'
import { IMenuItem } from 'types'
import CollectionItem from './CollectionItem'
import Footer from './Footer'
import Header from './Header'
import Image from 'next/image'

interface ICollectionsLayout {
    children: ReactNode
}

const TOP_BAR = [
    {
        img: l,
        url: '/',
        text: '154 Cửa hàng khắp cả nước',
    },
    {
        img: p,
        url: '/',
        text: 'Đặt hàng: 1800.6936',
    },
    {
        img: b,
        url: '/',
        text: 'Freeship từ 50.000vnd',
    },
]

const CollectionsLayout: React.FC<ICollectionsLayout> = ({ children }) => {
    const { data: categories } = useQuery(
        'categories',
        categoriesApi.getCategories,
    )

    const CATEGORIES_DATA = useMemo(() => {
        const data = categories?.reduce((prev: Array<IMenuItem>, cur) => {
            const item: IMenuItem = {
                root: {
                    title: cur.title,
                    url: `/collections/${cur.slug}`,
                },
                children: cur.children.map((item) => ({
                    title: item.title,
                    url: `/collections/${item.slug}`,
                })),
            }
            prev.push(item)
            return prev
        }, [])
        data?.unshift({
            root: {
                title: 'Tất Cả',
                url: '/collections/all',
            },
            children: [],
        })
        return data
    }, [categories])
    return (
        <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="hidden">
                <symbol
                    id="logo"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 257.685 20"
                    fill="#000"
                >
                    <path
                        className="a"
                        d="M11.8,4.864c0,.266-.228.455-.569.455H7.97V20.234c0,.228-.19.455-.569.455H4.364a.521.521,0,0,1-.569-.455V5.319H.569C.228,5.319,0,5.129,0,4.864V2.093A.547.547,0,0,1,.569,1.6H11.2a.523.523,0,0,1,.569.493v2.77Z"
                        transform="translate(0 -0.993)"
                    ></path>
                    <path
                        className="a"
                        d="M52.056,1.2a.548.548,0,0,1,.569.455V19.948a.548.548,0,0,1-.569.455H48.982a.549.549,0,0,1-.569-.455V12.623H42.075v7.324a.548.548,0,0,1-.569.455H38.469a.549.549,0,0,1-.569-.455V1.655a.519.519,0,0,1,.569-.455h3.036a.521.521,0,0,1,.569.455V8.676H48.45V1.655A.519.519,0,0,1,49.02,1.2Z"
                        transform="translate(-23.517 -0.745)"
                    ></path>
                    <path
                        className="a"
                        d="M92.575,5.109V8.9h6.983c.38,0,.569.228.569.455v2.922c0,.228-.19.455-.569.455H92.575v3.757h8.463c.38,0,.607.228.607.455v2.96a.562.562,0,0,1-.607.455H88.969a.549.549,0,0,1-.569-.455V1.655c0-.266.228-.455.569-.455h12.106c.38,0,.607.228.607.455v2.96a.562.562,0,0,1-.607.455h-8.5Z"
                        transform="translate(-54.852 -0.745)"
                    ></path>
                    <path
                        className="a"
                        d="M169.786,14.494a.689.689,0,0,1,.759,0l2.125,2.125a.577.577,0,0,1,0,.759,9.672,9.672,0,0,1-6.793,2.732,9.429,9.429,0,0,1-9.677-9.829C156.2,4.513,160.185.3,165.877.3a9.865,9.865,0,0,1,6.831,2.77.7.7,0,0,1-.038.721l-2.125,2.125a.689.689,0,0,1-.759,0,5.651,5.651,0,0,0-3.909-1.67c-3.378,0-5.427,2.657-5.427,6.034,0,3.605,2.429,5.806,5.427,5.806a5.417,5.417,0,0,0,3.909-1.594"
                        transform="translate(-96.921 -0.186)"
                    ></path>
                    <path
                        className="a"
                        d="M211.588,7.324a3.207,3.207,0,1,0,6.414,0,3.207,3.207,0,1,0-6.414,0M221.418,19.2a.562.562,0,0,1-.607.455H208.628a.521.521,0,0,1-.569-.455V16.129a.523.523,0,0,1,.569-.493H220.81a.561.561,0,0,1,.607.493ZM207.3,7.324a7.459,7.459,0,0,1,14.915,0,7.46,7.46,0,0,1-14.915,0"
                        transform="translate(-128.628)"
                    ></path>
                    <path
                        className="a"
                        d="M260.475,5.585V9.152h6.983c.379,0,.569.228.569.455v3c0,.228-.19.455-.569.455h-6.983v7.1c0,.228-.19.455-.569.455h-3.036a.549.549,0,0,1-.569-.455V2.093a.523.523,0,0,1,.569-.493h12.106a.561.561,0,0,1,.607.493v3a.56.56,0,0,1-.607.493Z"
                        transform="translate(-159.032 -0.993)"
                    ></path>
                    <path
                        className="a"
                        d="M303.475,5.585V9.152h6.983c.379,0,.569.228.569.455v3c0,.228-.19.455-.569.455h-6.983v7.1c0,.228-.19.455-.569.455h-3.036a.549.549,0,0,1-.569-.455V2.093a.523.523,0,0,1,.569-.493h12.106a.561.561,0,0,1,.607.493v3a.56.56,0,0,1-.607.493Z"
                        transform="translate(-185.714 -0.993)"
                    ></path>
                    <path
                        className="a"
                        d="M346.413,5.109V8.9H353.4c.38,0,.569.228.569.455v2.922c0,.228-.19.455-.569.455h-6.983v3.757h8.463c.38,0,.607.228.607.455v2.96a.562.562,0,0,1-.607.455H342.769a.549.549,0,0,1-.569-.455V1.655c0-.266.228-.455.569-.455h12.106c.38,0,.607.228.607.455v2.96a.562.562,0,0,1-.607.455h-8.463Z"
                        transform="translate(-212.333 -0.745)"
                    ></path>
                    <path
                        className="a"
                        d="M390.013,5.109V8.9H397c.379,0,.569.228.569.455v2.922c0,.228-.19.455-.569.455h-6.983v3.757h8.463c.379,0,.607.228.607.455v2.96a.562.562,0,0,1-.607.455H386.369a.549.549,0,0,1-.569-.455V1.655c0-.266.228-.455.569-.455h12.106c.379,0,.607.228.607.455v2.96a.562.562,0,0,1-.607.455h-8.463Z"
                        transform="translate(-239.386 -0.745)"
                    ></path>
                    <path
                        className="a"
                        d="M469.594,1.2a.548.548,0,0,1,.569.455V19.948a.548.548,0,0,1-.569.455H466.52a.549.549,0,0,1-.569-.455V12.623h-6.376v7.324a.548.548,0,0,1-.569.455h-3.036a.549.549,0,0,1-.569-.455V1.655a.519.519,0,0,1,.569-.455h3.036a.521.521,0,0,1,.569.455V8.676h6.376V1.655a.519.519,0,0,1,.569-.455Z"
                        transform="translate(-282.573 -0.745)"
                    ></path>
                    <path
                        className="a"
                        d="M508.55,7.324a3.207,3.207,0,1,0,6.414,0,3.207,3.207,0,1,0-6.414,0M518.38,19.2a.562.562,0,0,1-.607.455H505.59a.521.521,0,0,1-.569-.455V16.129a.523.523,0,0,1,.569-.493h12.182a.561.561,0,0,1,.607.493ZM504.3,7.324a7.459,7.459,0,0,1,14.915,0,7.46,7.46,0,0,1-14.915,0"
                        transform="translate(-312.915)"
                    ></path>
                    <path
                        className="a"
                        d="M553.3,14.389V2.093a.547.547,0,0,1,.569-.493h3.036a.548.548,0,0,1,.569.493V14.351a3.117,3.117,0,0,0,3.188,2.619c1.594,0,3.15-.835,3.15-2.543V2.093a.547.547,0,0,1,.569-.493h3.074a.577.577,0,0,1,.569.493v12.3c0,4.137-3.188,6.565-7.362,6.565-4.061,0-7.362-2.543-7.362-6.565"
                        transform="translate(-343.319 -0.993)"
                    ></path>
                    <path
                        className="a"
                        d="M602,14.566c0-.266.228-.455.569-.455h3.036c.266,0,.569.152.569.455a1.847,1.847,0,0,0,2.049,1.784,1.88,1.88,0,0,0,2.049-1.822,2.233,2.233,0,0,0-2.049-2.049,7.543,7.543,0,0,1-2.96-.645A5.557,5.557,0,0,1,602,6.6a5.994,5.994,0,0,1,6.262-6c3.416,0,6.11,2.315,6.186,5.655a.519.519,0,0,1-.569.455h-3a.548.548,0,0,1-.569-.455A1.823,1.823,0,0,0,608.3,4.547,1.911,1.911,0,0,0,606.25,6.6,2.007,2.007,0,0,0,608.3,8.608a7.411,7.411,0,0,1,2.922.645,5.621,5.621,0,0,1,3.3,5.275c0,3.8-3.036,5.844-6.224,5.844-3.529-.114-6.262-2.125-6.3-5.806"
                        transform="translate(-373.537 -0.372)"
                    ></path>
                    <path
                        className="a"
                        d="M648.212,5.109V8.9H655.2c.38,0,.569.228.569.455v2.922c0,.228-.19.455-.569.455h-6.983v3.757h8.463c.38,0,.607.228.607.455v2.96a.562.562,0,0,1-.607.455H644.569A.549.549,0,0,1,644,19.91V1.655c0-.266.228-.455.569-.455h12.106c.38,0,.607.228.607.455v2.96a.562.562,0,0,1-.607.455h-8.463Z"
                        transform="translate(-399.598 -0.745)"
                    ></path>
                </symbol>
            </svg>
            <div className="layout flex items-center py-[10px] justify-center gap-x-[100px]">
                {TOP_BAR.map(({ url, text, img }, index) => (
                    <Fragment key={index}>
                        <Link href={url}>
                            <a className="flex items-center text-[#00000099] transition-colors hover:text-primary text-xs">
                                <img
                                    className="mr-[5px]"
                                    src={img.src}
                                    alt="icon"
                                />
                                <span>{text}</span>
                            </a>
                        </Link>
                    </Fragment>
                ))}
            </div>
            <Header />
            <main>
                <div className="layout pt-10 pb-12">
                    <div className="flex">
                        <div className="w-1/5 border-r-2 border-[#00000026]">
                            <ul className="sticky top-[70px]">
                                {CATEGORIES_DATA?.map((category, index) => (
                                    <Fragment key={index}>
                                        <CollectionItem category={category} />
                                    </Fragment>
                                ))}
                            </ul>
                        </div>
                        <div className="w-4/5 pl-[72px]">
                            <div className="relative pt-[39%] mb-10">
                                <Image
                                    src={cover.src}
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </div>
                            <div>{children}</div>
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    )
}

export default CollectionsLayout
