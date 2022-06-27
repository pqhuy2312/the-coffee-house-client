import { categoriesApi, productsApi } from 'api'
import CollectionsLayout from 'components/CollectionsLayout'
import MenuBlock from 'components/MenuBlock'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import React, {
    Fragment,
    ReactElement,
    useEffect,
    useLayoutEffect,
} from 'react'
import { dehydrate, QueryClient, useQuery } from 'react-query'

const Collection = () => {
    const router = useRouter()
    const { data: category } = useQuery(
        ['category', router.query?.slug],
        () => categoriesApi.getCategoryBySlug(router.query?.slug as string),
        {
            enabled: !!router.query?.slug,
        },
    )

    return (
        <div>
            {category?.parentId ? (
                <MenuBlock title={category.title} slug={category.slug} />
            ) : (
                category?.children?.map((item) => (
                    <Fragment key={item.id}>
                        <MenuBlock title={item.title} slug={item.slug} />
                    </Fragment>
                ))
            )}
        </div>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const response = await categoriesApi.getCategories()

    const paths = response.reduce((prev, cur) => {
        if (cur.parentId) {
            prev.push({
                params: { slug: cur.slug },
            })
        } else {
            prev = [
                ...prev,
                ...cur.children.map((item) => ({
                    params: { slug: item.slug },
                })),
            ]
        }

        return prev
    }, [] as Array<any>)

    return {
        paths,
        fallback: 'blocking',
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const queryClient = new QueryClient()

    try {
        const res = await categoriesApi.getCategoryBySlug(
            params?.slug as string,
        )

        if (res.parentId) {
            await Promise.all([
                queryClient.prefetchInfiniteQuery(
                    `/categories/${res.slug}/products?limit=9`,
                    productsApi.getProductsByCategory,
                    {
                        getNextPageParam: (lastPage, pages) =>
                            lastPage.page + 1,
                    },
                ),
                queryClient.prefetchQuery(['category', params?.slug], () =>
                    categoriesApi.getCategoryBySlug(params?.slug as string),
                ),
            ])
        } else {
            await Promise.all([
                queryClient.prefetchQuery(['category', params?.slug], () =>
                    categoriesApi.getCategoryBySlug(params?.slug as string),
                ),
                ...res.children.map((category) =>
                    queryClient.prefetchInfiniteQuery(
                        `/categories/${category.slug}/products?limit=9`,
                        productsApi.getProductsByCategory,
                        {
                            getNextPageParam: (lastPage, pages) =>
                                lastPage.page + 1,
                        },
                    ),
                ),
            ])
        }
    } catch (error) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            dehydratedState: JSON.parse(JSON.stringify(dehydrate(queryClient))),
        },
        revalidate: 60,
    }
}

Collection.getLayout = (page: ReactElement) => (
    <CollectionsLayout>{page}</CollectionsLayout>
)

export default Collection
