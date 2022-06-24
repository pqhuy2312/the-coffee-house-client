import AdminLayout from 'components/AdminLayout'
import Link from 'next/link'
import { ReactElement } from 'react'
import { FaPlus } from 'react-icons/fa'

const Index = () => {
    return (
        <div>
            <h3 className="text-black text-[18px] font-bold mb-5">Stores</h3>
            <div className="p-4 shadow-sm rounded-lg bg-white">
                <form className="flex justify-between h-10 gap-x-5">
                    <input
                        className="h-full flex-1 text-field text-sm max-w-[390px]"
                        placeholder={`Search by store name`}
                        type="text"
                    />

                    <Link href={`/admin/stores/create`}>
                        <a className="h-full flex items-center px-4 text-sm primary-btn">
                            <FaPlus className="text-base" />
                            <span className="ml-3">Add Store</span>
                        </a>
                    </Link>
                </form>
            </div>
        </div>
    )
}

Index.getLayout = (page: ReactElement) => <AdminLayout>{page}</AdminLayout>

export default Index
