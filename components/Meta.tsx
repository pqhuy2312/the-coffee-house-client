import Head from 'next/head'
import { useEffect, useState } from 'react'

interface IMetaProps {
    title?: string
    description?: string
    image?: string
}

const Meta: React.FC<IMetaProps> = ({
    title = 'The Coffee House - Delivery 1800 6936',
    description = 'Hơn 150 cửa hàng The Coffee House tại Thành Phố Hồ Chí Minh, Hà Nội, Vũng Tàu, Bắc Ninh, Bình Dương, Cần Thơ,  Đà Nẵng, Đắk Lắk,  Đồng Nai, Hải Phòng, Hưng Yên, Nghệ An, Thanh Hoá, Thừa Thiên Huế và Tiền Giang sẵn sàng phục vụ bạn. Giao hàng miễn phí tại các thành phố qua chỉ cần gọi 1800 6936 !',
    image = '/share_fb_home.webp',
}) => {
    const [og_url, setog_url] = useState('')

    useEffect(() => {
        setog_url(window.location.href)
    }, [])

    return (
        <Head>
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />

            <link rel="canonical" href={og_url} />

            <meta
                property="og:url"
                content={og_url ? og_url : 'https://example.com'}
            />
            <meta property="og:type" content="website" />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />

            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={image} />
        </Head>
    )
}

export default Meta
