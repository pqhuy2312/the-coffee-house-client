import { postsApi, topicsApi } from 'api'
import coffee from 'assets/images/coffee-2_2_92db24958ff14ac4b4249b3256f7a415.webp'
import Image from 'next/image'
import { Fragment } from 'react'
import { useQuery } from 'react-query'
import HomeListBlog from './HomeListBlog'

const HomeBlog = () => {
    const { data: topics } = useQuery('topics', topicsApi.getTopics)
    const { data } = useQuery(
        'getPostsByTopic',
        () => {
            return Promise.all(
                topics!.map((topic) =>
                    postsApi.getPostsByTopic(topic.slug, {
                        limit: 3,
                        page: 1,
                    }),
                ),
            )
        },
        {
            enabled: !!topics,
        },
    )

    return (
        <div className="bg-[#FFF7E6] pb-36 pt-11">
            <div className="layout">
                <div className="flex items-center justify-center mb-8">
                    <Image src={coffee.src} width={16} height={24} />
                    <h2 className="ml-2 text-[28px] font-semibold">
                        Chuyện Nhà
                    </h2>
                </div>
                <div>
                    {data?.map((posts, index) => (
                        <div className="mb-8" key={index}>
                            <HomeListBlog posts={posts.rows} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default HomeBlog
