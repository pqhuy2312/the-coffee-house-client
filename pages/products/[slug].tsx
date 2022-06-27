import { productsApi } from 'api'
import InfoAndStory from 'components/InfoAndStory'
import Layout from 'components/Layout'
import Meta from 'components/Meta'
import ProductSlider from 'components/ProductSlider'
import RelatedProducts from 'components/RelatedProducts'
import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, {
    ReactElement,
    useEffect,
    useLayoutEffect,
    useMemo,
    useState,
} from 'react'
import { dehydrate, QueryClient, useQuery } from 'react-query'
import { IProductSize, ITopping } from 'types'

const DetailProduct = () => {
    const router = useRouter()
    const { data: product } = useQuery(
        ['product', router.query?.slug],
        () => productsApi.getProductBySlug(router.query?.slug as string),
        {
            enabled: !!router.query?.slug,
        },
    )
    const { data: relatedProducts } = useQuery(
        ['relatedProducts', product?.slug, 1, 4],
        () =>
            productsApi.getRelatedProducts(router.query?.slug as string, {
                page: 1,
                limit: 6,
            }),
        {
            enabled: !!router.query?.slug,
        },
    )

    const [price, setPrice] = useState<number>(() => {
        if (!product) return 0
        if ((product?.sizes.length as number) > 0) {
            return product?.sizes[0].price
        }
        return product?.price
    })
    const [activeSize, setActiveSize] = useState<IProductSize | undefined>(
        () => {
            return product?.sizes[0]
        },
    )
    const [activeTopping, setActiveTopping] = useState<ITopping>()

    const IMAGES = useMemo(
        () => product?.images.map((image) => image.url),
        [product],
    )

    return (
        <div className="layout pb-10">
            <Meta title={product?.name} />
            <ul className="flex my-8 text-sm">
                <li>
                    <Link href="/collections/all">
                        <a className="primary-link">Menu</a>
                    </Link>
                </li>
                <li className="mx-[5px] text-gray-500">/</li>
                <li>
                    <Link href="/collections/all">
                        <a className="primary-link">
                            {product?.category.title}
                        </a>
                    </Link>
                </li>
                <li className="mx-[5px] text-gray-500">/</li>
                <li className="text-gray-500 font-semibold">{product?.name}</li>
            </ul>
            <div className="grid grid-cols-2 gap-x-8">
                <ProductSlider images={IMAGES || []} />
                <div>
                    <h1 className="text-[18px] font-semibold mb-3 leading-6">
                        {product?.name}
                    </h1>
                    <span className="text-2xl font-semibold text-primary">
                        {price.toLocaleString()} đ
                    </span>
                    <div>
                        {(product?.sizes?.length as number) > 0 && (
                            <div className="mt-4">
                                <h4 className="text-base mb-2">Kích thước</h4>
                                <div className="flex gap-x-4">
                                    {product?.sizes.map((size) => (
                                        <div
                                            key={size.id}
                                            className={`flex items-center text-gray-500 cursor-pointer px-5 text-base border h-10 font-semibold border-[rgba(0,0,0,0.15)] transition-all duration-300 ${
                                                activeSize?.id === size.id
                                                    ? 'bg-primary text-white'
                                                    : ''
                                            }`}
                                            onClick={() => {
                                                setActiveSize(size)
                                                setPrice(
                                                    size.price +
                                                        (activeTopping?.price ||
                                                            0),
                                                )
                                            }}
                                        >
                                            <svg
                                                width="15"
                                                height="20"
                                                viewBox="0 0 13 16"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                {' '}
                                                <path
                                                    d="M11.6511 1.68763H10.3529V0.421907C10.3529 0.194726 10.1582 0 9.93104 0H2.17444C1.94726 0 1.75254 0.194726 1.75254 0.421907V1.65517H0.454361C0.194726 1.68763 0 1.88235 0 2.10953V4.18661C0 4.41379 0.194726 4.60852 0.421907 4.60852H1.33063L1.72008 8.8925L1.78499 9.76876L2.30426 15.6105C2.33671 15.8377 2.49899 16 2.72617 16H9.28195C9.50913 16 9.70385 15.8377 9.70385 15.6105L10.2231 9.76876L10.288 8.8925L10.6775 4.60852H11.5862C11.8134 4.60852 12.0081 4.41379 12.0081 4.18661V2.10953C12.073 1.88235 11.8783 1.68763 11.6511 1.68763ZM2.56389 8.40568H3.50507C3.47262 8.56795 3.47262 8.73022 3.47262 8.8925C3.47262 9.02231 3.47262 9.15213 3.50507 9.28195H2.66126L2.6288 8.92495L2.56389 8.40568ZM9.47667 8.92495L9.44422 9.28195H8.56795C8.60041 9.15213 8.60041 9.02231 8.60041 8.8925C8.60041 8.73022 8.56795 8.56795 8.56795 8.40568H9.50913L9.47667 8.92495ZM7.72414 8.8925C7.72414 9.83367 6.97769 10.5801 6.03651 10.5801C5.09534 10.5801 4.34888 9.83367 4.34888 8.8925C4.34888 7.95132 5.09534 7.20487 6.03651 7.20487C6.97769 7.20487 7.72414 7.95132 7.72414 8.8925ZM8.92495 15.1562H3.18053L2.72617 10.1582H3.82961C4.28398 10.9371 5.09534 11.4564 6.03651 11.4564C6.97769 11.4564 7.8215 10.9371 8.24341 10.1582H9.34686L8.92495 15.1562ZM9.60649 7.52941H8.21095C7.75659 6.81542 6.94523 6.3286 6.03651 6.3286C5.12779 6.3286 4.31643 6.81542 3.86207 7.52941H2.49899L2.23935 4.60852H9.86613L9.60649 7.52941ZM11.1968 3.73225H10.3205H1.75254H0.876268V2.56389H2.17444H2.2069H2.23935H8.27586C8.50304 2.56389 8.69777 2.36917 8.69777 2.14199C8.69777 1.91481 8.50304 1.72008 8.27586 1.72008H2.6288V0.876268H9.47667V2.10953C9.47667 2.33671 9.6714 2.53144 9.89858 2.53144H11.1968V3.73225Z"
                                                    fill={`${
                                                        activeSize?.id ===
                                                        size.id
                                                            ? '#fff'
                                                            : '#6B72A1'
                                                    }`}
                                                ></path>{' '}
                                            </svg>
                                            <span className="ml-2">{`${
                                                size.name
                                            }${
                                                size.price > product.price
                                                    ? ` + ${
                                                          size.price -
                                                          product.price
                                                      }đ`
                                                    : ''
                                            }`}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <div>
                        {(product?.toppings?.length as number) > 0 && (
                            <div className="mt-4">
                                <h4 className="text-base mb-2">Topping</h4>
                                <div className="flex flex-wrap gap-4">
                                    {product?.toppings.map((topping) => (
                                        <div
                                            key={topping.id}
                                            className={`flex items-center text-gray-500 cursor-pointer px-5 text-base border h-10 font-semibold border-[rgba(0,0,0,0.15)] transition-all duration-300 ${
                                                activeTopping?.id === topping.id
                                                    ? 'bg-primary text-white'
                                                    : ''
                                            }`}
                                            onClick={() => {
                                                if (
                                                    topping.id ===
                                                    activeTopping?.id
                                                ) {
                                                    setPrice(
                                                        (price) =>
                                                            price -
                                                            activeTopping.price,
                                                    )
                                                    setActiveTopping(undefined)
                                                } else {
                                                    setPrice(
                                                        (price) =>
                                                            price +
                                                            topping.price,
                                                    )
                                                    setActiveTopping(topping)
                                                }
                                            }}
                                        >
                                            <span className="ml-2 whitespace-nowrap">{`${
                                                topping.name
                                            } + ${topping.price.toLocaleString()}đ`}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="mt-5">
                        <button className="w-full primary-btn flex justify-center items-center">
                            <span className="ml-2">Đặt giao tận nơi</span>
                        </button>
                    </div>
                </div>
            </div>
            <hr className="my-8" />
            <InfoAndStory
                info={product?.info as string}
                story={product?.story as string}
            />
            <hr className="my-8" />
            <RelatedProducts products={relatedProducts?.rows || []} />
        </div>
    )
}

DetailProduct.getLayout = (page: ReactElement) => <Layout>{page}</Layout>

export const getStaticPaths: GetStaticPaths = async () => {
    const response = await productsApi.getProducts({
        limit: 100,
        page: 1,
    })

    return {
        paths: response.rows.map((item) => ({
            params: { slug: `${item.slug}` },
        })),
        fallback: 'blocking',
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const queryClient = new QueryClient()

    try {
        await productsApi.getProductBySlug(params?.slug as string)

        await Promise.all([
            queryClient.prefetchQuery(['product', params?.slug], () =>
                productsApi.getProductBySlug(params?.slug as string),
            ),
            queryClient.prefetchQuery(
                ['relatedProducts', params?.slug, 1, 4],
                () =>
                    productsApi.getRelatedProducts(params?.slug as string, {
                        page: 1,
                        limit: 6,
                    }),
            ),
        ])
    } catch (error) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
        revalidate: 60,
    }
}

export default DetailProduct
