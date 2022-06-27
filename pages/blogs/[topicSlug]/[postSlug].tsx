import { postsApi } from 'api'
import Layout from 'components/Layout'
import { GetStaticPaths, GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { ReactElement } from 'react'
import { dehydrate, QueryClient, useQuery } from 'react-query'
import parse from 'html-react-parser'
import { mdParser } from 'components/EditorField'
import LatestPosts from 'components/LatestPosts'

const DetailPost = () => {
    const router = useRouter()
    const { data: post } = useQuery(
        ['post', router.query?.postSlug],
        () => postsApi.getPost(router.query?.postSlug as string),
        {
            enabled: !!router.query?.postSlug,
        },
    )
    const { data: posts } = useQuery(
        ['latestPostsOfTopic', router.query?.topicSlug, 1, 6],
        () =>
            postsApi.getPostsByTopic(router.query?.topicSlug as string, {
                page: 1,
                limit: 6,
                not: post?.id as number,
            }),
        {
            enabled: !!router.query?.topicSlug,
        },
    )

    return (
        <div className="pb-[400px]">
            <div className="h-[500px] relative">
                <Image
                    src={post?.thumbnail as string}
                    layout="fill"
                    objectFit="cover"
                />
            </div>
            <div className="layout">
                <div className="max-w-[70%] mx-auto">
                    <ul className="flex my-8 text-sm">
                        <li>
                            <Link href="/collections/all">
                                <a className="primary-link">Blog</a>
                            </Link>
                        </li>
                        <li className="mx-[5px] text-gray-500">|</li>
                        <li className="text-gray-500 font-semibold">
                            {post?.topic.title}
                        </li>
                    </ul>
                    <h1 className="text-[34px] font-semibold leading-[1.4] mb-8">
                        {post?.title}
                    </h1>
                    <div className="post-content">
                        {parse(mdParser.render(post?.content as string))}
                    </div>
                    <hr className="my-8" />
                </div>
                <LatestPosts posts={posts?.rows || []} />
            </div>
        </div>
    )
}

DetailPost.getLayout = (page: ReactElement) => <Layout>{page}</Layout>

export const getStaticPaths: GetStaticPaths = async () => {
    const response = await postsApi.getPosts({
        limit: 100,
        page: 1,
    })

    return {
        paths: response.rows.map((item) => ({
            params: {
                topicSlug: item.topic.slug,
                postSlug: item.slug,
            },
        })),
        fallback: 'blocking',
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const queryClient = new QueryClient()

    try {
        const post = await postsApi.getPost(params?.postSlug as string)
        if (post.topic.slug !== params?.slug) {
            return {
                redirect: {
                    destination: '/',
                    permanent: false,
                },
            }
        }

        await Promise.all([
            queryClient.prefetchQuery(['post', params?.postSlug], () =>
                postsApi.getPost(params?.postSlug as string),
            ),
            queryClient.prefetchQuery(
                ['latestPostsOfTopic', params?.topicSlug, 1, 6],
                () =>
                    postsApi.getPostsByTopic(params?.topicSlug as string, {
                        page: 1,
                        limit: 6,
                        not: post?.id as number,
                    }),
            ),
        ])
    } catch (error) {
        return {
            redirect: {
                destination: '/',
                permanent: false,
            },
        }
    }

    return {
        props: {
            dehydratedState: dehydrate(queryClient),
        },
        revalidate: 60,
    }
}

export default DetailPost
