import { productsApi } from 'api'
import hiTea from 'assets/images/banner_home_1ef9619ab8a04d3d9e00de230667eca1.webp'
import Image from 'next/image'
import Link from 'next/link'
import { Fragment } from 'react'
import { useQuery } from 'react-query'
import ProductCard from './ProductCard'

const HomeMenu = () => {
    const { data: products } = useQuery(['products', 1, 6], () =>
        productsApi.getProducts({
            limit: 6,
            page: 1,
        }),
    )

    return (
        <section className="pb-[100px]">
            <div className="layout">
                <div className="grid grid-cols-4 gap-8">
                    <Link href="/">
                        <a className="block pt-[65%] relative col-span-2 shadow-card rounded-[10px] overflow-hidden">
                            <Image
                                src={hiTea.src}
                                layout="fill"
                                objectFit="cover"
                                loading="eager"
                            />
                        </a>
                    </Link>
                    {products?.rows.map((product) => (
                        <Fragment key={product.id}>
                            <ProductCard product={product} />
                        </Fragment>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default HomeMenu
