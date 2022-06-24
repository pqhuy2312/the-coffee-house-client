import { categoriesApi, tagsApi } from 'api'
import AdminLayout from 'components/AdminLayout'
import SelectField, { IOptions } from 'components/SelectField'
import Link from 'next/link'
import { ReactElement, useMemo } from 'react'
import { FaPlus } from 'react-icons/fa'
import { useQuery } from 'react-query'

const Index = () => {
    const { data: tags } = useQuery('tags', tagsApi.getTags)

    return (
        <div>
            <h3 className="text-black text-[18px] font-bold mb-5">Posts</h3>
            <div className="p-4 shadow-sm rounded-lg bg-white">
                <form className="flex justify-between h-10 gap-x-5">
                    <input
                        className="h-full flex-1 text-field text-sm max-w-[390px]"
                        placeholder={`Search post by name`}
                        type="text"
                    />
                    <SelectField
                        options={
                            tags?.map((tag) => ({
                                value: tag.id,
                                label: tag.title,
                            })) || []
                        }
                        placeholder="Tags"
                    />
                    <Link href={`/admin/posts/create`}>
                        <a className="h-full flex items-center px-4 text-sm primary-btn">
                            <FaPlus className="text-base" />
                            <span className="ml-3">Add Post</span>
                        </a>
                    </Link>
                </form>
            </div>
        </div>
    )
}

Index.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>

export default Index
