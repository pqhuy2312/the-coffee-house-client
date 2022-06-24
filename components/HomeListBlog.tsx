import Link from 'next/link'
import { Fragment } from 'react'
import { IPost } from 'types'
import PostCard from './PostCard'

interface IHomeListBlogProps {
    posts: Array<IPost>
}

const HomeListBlog: React.FC<IHomeListBlogProps> = ({ posts }) => {
    return (
        <div>
            <h3 className="text-[22px] pl-4 relative font-semibold  inline-block before:absolute before:w-1 before:h-full before:left-0 before:top-0 before:bg-primary">
                <Link href="/">
                    <a className="text-[#191919] hover:text-primary transition-colors duration-300">
                        {posts[0].topic.title}
                    </a>
                </Link>
            </h3>
            <div className="mt-6 grid grid-cols-3 gap-x-6">
                {posts.map((post) => (
                    <Fragment key={post.id}>
                        <PostCard post={post} />
                    </Fragment>
                ))}
            </div>
        </div>
    )
}

export default HomeListBlog
