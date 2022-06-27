import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { formatDistance } from 'date-fns'
import vi from 'date-fns/locale/vi'
import { IPost } from 'types'

interface ILatestPostsProps {
    posts: Array<IPost>
}

const LatestPosts: React.FC<ILatestPostsProps> = ({ posts }) => {
    return (
        <div className="mt-16">
            <h3 className="text-2xl mb-8 text-center font-semibold">
                Bài viết mới nhất
            </h3>
            <div className="grid grid-cols-3 gap-8">
                {posts.map((post) => (
                    <div className="bg-[#FFF7E6] rounded-lg" key={post.id}>
                        <Link href={`/blogs/${post.topic.slug}/${post.slug}`}>
                            <a
                                title={post.title}
                                className="block pt-[48%] group overflow-hidden relative rounded-lg"
                            >
                                <Image
                                    src={post.thumbnail}
                                    layout="fill"
                                    objectFit="cover"
                                    className="scale-100 group-hover:scale-110 transition-transform duration-300"
                                />
                            </a>
                        </Link>
                        <div className="p-4">
                            <h3 className="text-primary font-semibold text-base mb-2">
                                {post.topic.title}
                            </h3>
                            <Link
                                href={`/blogs/${post.topic.slug}/${post.slug}`}
                            >
                                <a title={post.title} className="primary-link">
                                    <h2 className="line-clamp-1 mb-2">
                                        {post.title}
                                    </h2>
                                </a>
                            </Link>
                            <span className="text-sm mb-1">
                                {formatDistance(
                                    new Date(post.createdAt),
                                    new Date(),
                                    { addSuffix: true, locale: vi },
                                )}
                            </span>
                            <p className="text-sm leading-6 line-clamp-3">
                                {post.description}
                            </p>
                            <Link
                                href={`/blogs/${post.topic.slug}/${post.slug}`}
                            >
                                <a
                                    className="primary-btn px-6 mt-3"
                                    title="Xem thêm"
                                >
                                    Xem thêm
                                </a>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default LatestPosts
