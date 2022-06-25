import Image from 'next/image'
import Link from 'next/link'
import { IProduct } from 'types'

interface IProductCardProps {
    product: IProduct
}

const ProductCard: React.FC<IProductCardProps> = ({ product }) => {
    return (
        <div>
            <Link href={`/products/${product.slug}`}>
                <a
                    className="shadow-card block pt-[100%] relative overflow-hidden rounded-[10px]"
                    title={product.name}
                >
                    <Image
                        src={product.images[0].url}
                        layout="fill"
                        objectFit="cover"
                        loading="eager"
                    />
                </a>
            </Link>
            <Link href={`/products/${product.slug}`}>
                <a
                    className="text-base mt-3 font-semibold duration-300 text-[#191919] hover:text-primary transition-colors line-clamp-2"
                    title={product.name}
                >
                    {product.name}
                </a>
            </Link>
            <span className="text-[#00000099] text-sm mt-3">
                {product.price.toLocaleString()} đ
            </span>
        </div>
    )
}

export default ProductCard
