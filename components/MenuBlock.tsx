import { productsApi } from 'api'
import { Fragment } from 'react'
import { useInfiniteQuery } from 'react-query'
import ProductCard from './ProductCard'

interface IMenuBlockProps {
    title: string
    slug: string
}

const MenuBlock: React.FC<IMenuBlockProps> = ({ title, slug }) => {
    const {
        data,
        error,
        fetchNextPage,
        hasNextPage,
        isFetching,
        isFetchingNextPage,
        status,
    } = useInfiniteQuery(
        `/categories/${slug}/products?limit=9`,
        productsApi.getProductsByCategory,
        {
            getNextPageParam: (lastPage, pages) => lastPage.page + 1,
        },
    )

    return (
        <div className="mb-5">
            <h3 className="text-2xl mb-6 font-semibold">{title}</h3>
            <div className="grid grid-cols-3 gap-8">
                {data?.pages.map((page) =>
                    page.rows.map((product) => (
                        <Fragment key={product.id}>
                            <ProductCard product={product} />
                        </Fragment>
                    )),
                )}
            </div>
        </div>
    )
}

export default MenuBlock
