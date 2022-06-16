import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import 'swiper/css/autoplay'
import 'swiper/css/pagination'
import Image from 'next/image'
import Link from 'next/link'
import { Autoplay, Pagination } from 'swiper'

const IMAGES = [
    {
        image: 'https://file.hstatic.net/1000075078/file/web_desktop_7a5b6434eec242238dd14cb8c6ee0599.jpg',
        url: '/',
    },
    {
        image: 'https://file.hstatic.net/1000075078/file/desktop_765f950cd8db4f118836c76597e3fb0a.jpg',
        url: '/',
    },
    {
        image: 'https://file.hstatic.net/1000075078/file/desktop_413e1383e85144209c146556db280cff.jpg',
        url: '/',
    },
    {
        image: 'https://file.hstatic.net/1000075078/file/desktop-2_c3dc44c5e6fd4946ae5852912a4a1df5.jpg',
        url: '/',
    },
]

const Banner = () => {
    return (
        <section className="relative -translate-y-[60px]">
            <Swiper
                modules={[Pagination, Autoplay]}
                pagination={{ clickable: true }}
                autoplay
                slidesPerView={1}
            >
                {IMAGES.map(({ image, url }, index) => (
                    <SwiperSlide key={index}>
                        <Link href={url}>
                            <a className="relative w-full pt-[30.5%]">
                                <Image
                                    loading="eager"
                                    src={image}
                                    layout="fill"
                                    objectFit="cover"
                                />
                            </a>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    )
}

export default Banner
