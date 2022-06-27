import Image from 'next/image'
import Link from 'next/link'
import { IPost } from 'types'
import { format } from 'date-fns'
import { renderHTML } from './EditorField'
import parse from 'html-react-parser'

interface IPostCardProps {
    post: IPost
}

const PostCard: React.FC<IPostCardProps> = ({ post }) => {
    return (
        <div>
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
            <div className="my-4">
                <span className="text-gray-500 text-sm">
                    {format(new Date(post.createdAt), 'dd/MM/yyyy')}
                </span>
                <Link href={`/blogs/${post.topic.slug}/${post.slug}`}>
                    <a
                        title={post.title}
                        className="my-2 text-[18px] line-clamp-1 font-semibold text-[#191919] hover:text-primary duration-300 transition-colors"
                    >
                        {post.title}
                    </a>
                </Link>
                <p className="line-clamp-3 text-sm leading-6 font-normal">
                    {post.description}
                </p>
            </div>
        </div>
    )
}

export default PostCard
