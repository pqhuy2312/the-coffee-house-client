import { Swiper as Slider, SwiperSlide } from 'swiper/react'

import 'swiper/css/free-mode'
import 'swiper/css/thumbs'
import Swiper, { Autoplay, FreeMode, Navigation, Thumbs } from 'swiper'
import { Fragment, useRef, useState } from 'react'
import Image from 'next/image'

interface IProductSliderProps {
    images: Array<string>
}

const ProductSlider: React.FC<IProductSliderProps> = ({ images }) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<Swiper | null>(null)
    const [activeIndex, setActiveIndex] = useState<number>(0)
    const navigationPrevRef = useRef<HTMLDivElement>(null)
    const navigationNextRef = useRef<HTMLDivElement>(null)

    return (
        <div className="overflow-hidden">
            <Slider
                spaceBetween={10}
                thumbs={{ swiper: thumbsSwiper }}
                modules={[FreeMode, Navigation, Thumbs, Autoplay]}
                autoplay
                onSlideChange={(swiper) => {
                    setActiveIndex(swiper.activeIndex)
                }}
                navigation={{
                    prevEl: navigationPrevRef.current,
                    nextEl: navigationNextRef.current,
                }}
                onInit={(swiper: any) => {
                    swiper.params.navigation.prevEl = navigationPrevRef.current
                    swiper.params.navigation.nextEl = navigationNextRef.current
                    swiper.navigation.init()
                    swiper.navigation.update()
                }}
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <div className="pt-[100%] relative">
                            <Image
                                src={image}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-sm"
                            />
                        </div>
                    </SwiperSlide>
                ))}
                <div
                    className="review-swiper-button-prev z-10 absolute left-6 cursor-pointer  top-1/2 -translate-y-1/2"
                    ref={navigationPrevRef}
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {' '}
                        <path
                            d="M10.828 11.9997L15.778 16.9497L14.364 18.3637L8 11.9997L14.364 5.63574L15.778 7.04974L10.828 11.9997Z"
                            fill="black"
                            fillOpacity="0.6"
                        ></path>{' '}
                    </svg>
                </div>
                <div
                    className="review-swiper-button-next z-10 absolute right-6 cursor-pointer top-1/2 -translate-y-1/2"
                    ref={navigationNextRef}
                >
                    <svg
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {' '}
                        <path
                            d="M13.1722 11.9997L8.22217 7.04974L9.63617 5.63574L16.0002 11.9997L9.63617 18.3637L8.22217 16.9497L13.1722 11.9997Z"
                            fill="black"
                            fillOpacity="0.6"
                        ></path>{' '}
                    </svg>
                </div>
            </Slider>
            <Slider
                onSwiper={setThumbsSwiper}
                spaceBetween={10}
                slidesPerView={6}
                freeMode={true}
                watchSlidesProgress={true}
                modules={[FreeMode, Navigation, Thumbs]}
                className="mt-4"
            >
                {images.map((image, index) => (
                    <SwiperSlide key={index}>
                        <div
                            className={`pt-[100%] border cursor-pointer relative rounded-lg ${
                                activeIndex === index
                                    ? 'border-primary'
                                    : 'border-transparent'
                            }`}
                        >
                            <Image
                                className="rounded-lg"
                                src={image}
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Slider>
        </div>
    )
}

export default ProductSlider
