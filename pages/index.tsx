import { ReactElement } from 'react'
import Layout from 'components/Layout'
import Banner from 'components/Banner'
import HomeMenu from 'components/HomeMenu'
import HomeBrand from 'components/HomeBrand'
import HomeStore from 'components/HomeStore'
import HomeBlog from 'components/HomeBlog'
import { GetStaticProps } from 'next'
import { dehydrate, QueryClient } from 'react-query'
import { categoriesApi, postsApi, productsApi, storesApi, topicsApi } from 'api'

const Home = () => {
    return (
        <div>
            <Banner />
            <HomeMenu />
            <HomeBrand />
            <HomeStore />
            <HomeBlog />
        </div>
    )
}

Home.getLayout = (page: ReactElement) => <Layout>{page}</Layout>

export const getStaticProps: GetStaticProps = async () => {
    const queryClient = new QueryClient()

    const topics = await topicsApi.getTopics()

    await Promise.all([
        queryClient.prefetchQuery('topics', topicsApi.getTopics),
        queryClient.prefetchQuery('categories', categoriesApi.getCategories),
        queryClient.prefetchQuery(['products', 1, 6], () =>
            productsApi.getProducts({
                limit: 6,
                page: 1,
            }),
        ),
        queryClient.prefetchQuery('stores', storesApi.getStores),
        queryClient.prefetchQuery('getHomeBlogs', () => {
            return Promise.all(
                topics!.map((topic) =>
                    postsApi.getPostsByTopic(topic.slug, {
                        limit: 3,
                        page: 1,
                    }),
                ),
            )
        }),
    ])

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
    }
}

export default Home
