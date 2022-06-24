import { storesApi } from 'api'
import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'
import { useQuery } from 'react-query'
import { Autoplay, Navigation, Pagination } from 'swiper'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import f1 from 'assets/images/flower-home1.svg'
import f2 from 'assets/images/flower-home2.svg'

const HomeStore = () => {
    const { data: stores, isLoading } = useQuery('stores', storesApi.getStores)
    const navigationPrevRef = useRef<HTMLDivElement>(null)
    const navigationNextRef = useRef<HTMLDivElement>(null)
    const [swipe, setSwipe] = useState<any>()

    if (isLoading) return null

    return (
        <section className="pt-11 pb-14 relative">
            <Swiper
                modules={[Navigation]}
                onBeforeInit={(swipper) => setSwipe(swipper)}
                loop
            >
                {stores?.map((store) => (
                    <SwiperSlide key={store.id}>
                        <div className="flex items-center">
                            <div className="pl-[93px] flex-[43.75%]">
                                <div className="w-3/4">
                                    <h3 className="text-[28px] font-semibold leading-[1.4] mb-1">
                                        {store.name}
                                    </h3>
                                    <p className="text-base break-words mb-3">
                                        {store.description}
                                    </p>
                                    <Link href={`/store/${store.slug}`}>
                                        <a className="primary-btn py-2 px-20">
                                            Tìm hiểu thêm
                                        </a>
                                    </Link>
                                    <div className="mt-3 flex">
                                        <div
                                            onClick={() => swipe?.slidePrev()}
                                            className="cursor-pointer rotate-180"
                                        >
                                            <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M12 11V8L16 12L12 16V13H8V11H12ZM12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20Z"
                                                    fill="black"
                                                    fill-opacity="0.6"
                                                ></path>
                                            </svg>
                                        </div>
                                        <div
                                            onClick={() => swipe?.slideNext()}
                                            className="cursor-pointer ml-4"
                                        >
                                            <svg
                                                width="24"
                                                height="24"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                            >
                                                <path
                                                    d="M12 11V8L16 12L12 16V13H8V11H12ZM12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM12 20C16.42 20 20 16.42 20 12C20 7.58 16.42 4 12 4C7.58 4 4 7.58 4 12C4 16.42 7.58 20 12 20Z"
                                                    fill="black"
                                                    fill-opacity="0.6"
                                                ></path>
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex-[56.25%] overflow-hidden">
                                <Swiper
                                    modules={[Pagination, Autoplay, Navigation]}
                                    pagination={{ clickable: true }}
                                    autoplay
                                    navigation={{
                                        prevEl: navigationPrevRef.current,
                                        nextEl: navigationNextRef.current,
                                    }}
                                    loop
                                    onInit={(swiper: any) => {
                                        swiper.params.navigation.prevEl =
                                            navigationPrevRef.current
                                        swiper.params.navigation.nextEl =
                                            navigationNextRef.current
                                        swiper.navigation.init()
                                        swiper.navigation.update()
                                    }}
                                >
                                    {store.images.map((img) => (
                                        <SwiperSlide key={img.id}>
                                            <div className="pt-[66.6667%] relative">
                                                <Image
                                                    src={img.url}
                                                    layout="fill"
                                                    objectFit="cover"
                                                    className="rounded-lg"
                                                />
                                            </div>
                                        </SwiperSlide>
                                    ))}
                                    <div
                                        className="review-swiper-button-prev z-10 absolute left-6 cursor-pointer  top-1/2 -translate-y-1/2"
                                        ref={navigationPrevRef}
                                    >
                                        <svg
                                            width="40"
                                            height="40"
                                            viewBox="0 0 40 40"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            {' '}
                                            <path
                                                d="M13.0466 18.3333H33.3333V21.6666H13.0466L21.9866 30.6066L19.63 32.9633L6.66663 20L19.63 7.03662L21.9866 9.39329L13.0466 18.3333Z"
                                                fill="white"
                                            ></path>{' '}
                                        </svg>
                                    </div>
                                    <div
                                        className="review-swiper-button-next z-10 absolute right-6 cursor-pointer top-1/2 -translate-y-1/2"
                                        ref={navigationNextRef}
                                    >
                                        <svg
                                            width="40"
                                            height="40"
                                            viewBox="0 0 40 40"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            {' '}
                                            <path
                                                d="M26.9534 18.3333L18.0134 9.39329L20.3701 7.03662L33.3334 20L20.3701 32.9633L18.0134 30.6066L26.9534 21.6666H6.66675V18.3333H26.9534Z"
                                                fill="white"
                                            ></path>{' '}
                                        </svg>
                                    </div>
                                </Swiper>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className="absolute top-[210px] left-[calc(43.7%-105px)]">
                <Image src={f1} width={188} height={199} />
            </div>
            <div className="absolute top-[63px] left-[calc(43.7%-80px)]">
                <Image src={f2} width={182} height={189} />
            </div>
        </section>
    )
}

export default HomeStore
