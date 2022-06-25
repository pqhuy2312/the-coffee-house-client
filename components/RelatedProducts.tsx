import { Fragment, memo } from 'react'
import { IProduct } from 'types'
import ProductCard from './ProductCard'

interface IRelatedProductsProps {
    products: Array<IProduct>
}

const RelatedProducts: React.FC<IRelatedProductsProps> = ({ products }) => {
    return (
        <div>
            <h4 className="text-[18px] mb-2 font-semibold">
                Sản phẩm liên quan
            </h4>
            <div className="grid grid-cols-6 gap-5">
                {products.map((product) => (
                    <Fragment key={product.id}>
                        <ProductCard product={product} />
                    </Fragment>
                ))}
            </div>
        </div>
    )
}

export default memo(RelatedProducts)
