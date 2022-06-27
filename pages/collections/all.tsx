import { categoriesApi, productsApi } from 'api'
import CollectionsLayout from 'components/CollectionsLayout'
import MenuBlock from 'components/MenuBlock'
import { GetStaticProps } from 'next'
import React, { Fragment, ReactElement } from 'react'
import { dehydrate, QueryClient, useInfiniteQuery, useQuery } from 'react-query'

const AllCollections = () => {
    const { data: categories } = useQuery(
        'categories',
        categoriesApi.getCategories,
    )

    return (
        <div>
            {categories?.map((item) =>
                item.children.map((category) => (
                    <Fragment key={category.id}>
                        <MenuBlock
                            title={category.title}
                            slug={category.slug}
                        />
                    </Fragment>
                )),
            )}
        </div>
    )
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const queryClient = new QueryClient()

    const res = await categoriesApi.getCategories()

    const prefetchQueries = res.reduce((prev, cur) => {
        const prefetchQueries = cur.children.map((category) =>
            queryClient.prefetchInfiniteQuery(
                `/categories/${category.slug}/products?limit=9`,
                productsApi.getProductsByCategory,
                {
                    getNextPageParam: (lastPage, pages) => lastPage.page + 1,
                },
            ),
        )
        return [...prev, ...prefetchQueries]
    }, [] as Array<Promise<void>>)

    await Promise.all([
        queryClient.prefetchQuery('categories', categoriesApi.getCategories),
        ...prefetchQueries,
    ])

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
        revalidate: 60,
    }
}

AllCollections.getLayout = (page: ReactElement) => (
    <CollectionsLayout>{page}</CollectionsLayout>
)

export default AllCollections
