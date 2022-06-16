import { productsApi } from 'api'
import hiTea from 'assets/images/banner_home_1ef9619ab8a04d3d9e00de230667eca1.webp'
import Image from 'next/image'
import Link from 'next/link'
import { useQuery } from 'react-query'

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
                        <div key={product.id}>
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
                    ))}
                </div>
            </div>
        </section>
    )
}

export default HomeMenu
