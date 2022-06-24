import Link from 'next/link'
import phone from 'assets/images/phone_0a42df1c753c4fa0910108daa73fe2ef.webp'
import map from 'assets/images/map-pin-2-line_575ccb91b6f94a308d1bd507d4ae72a7.webp'
import fb from 'assets/images/fb.svg'
import instagram from 'assets/images/instagram.svg'
import Image from 'next/image'

const ABOUT_ITEMS = [
    {
        title: 'Về Chúng Tôi',
        href: '/',
    },
    {
        title: 'Sản phẩm',
        href: '/',
    },
    {
        title: 'Khuyến mãi',
        href: '/',
    },
    {
        title: 'Chuyện cà phê',
        href: '/',
    },
    {
        title: 'Cửa Hàng',
        href: '/',
    },
    {
        title: 'Tuyển dụng',
        href: '/',
    },
]

const RULES_ITEMS = [
    {
        title: 'Điều khoản sử dụng',
        href: '/',
    },
    {
        title: 'Quy tắc bảo mật',
        href: '/',
    },
]

const SOCIAL_lINKS = [
    {
        img: fb,
        href: 'https://www.facebook.com/The.Coffee.House.2014/',
    },
    {
        img: instagram,
        href: 'https://www.instagram.com/thecoffeehousevn/',
    },
]

const Footer = () => {
    return (
        <footer className="pt-8 pb-14 bg-[#000000D9] text-white">
            <div className="layout">
                <div className="grid grid-cols-4 gap-x-8">
                    <div>
                        <h3 className="text-sm font-semibold mb-4">
                            Giới thiệu
                        </h3>
                        <ul>
                            {ABOUT_ITEMS.map(({ href, title }, index) => (
                                <li className="mb-2" key={index}>
                                    <Link href={href}>
                                        <a
                                            className="inline-block text-xs text-white"
                                            title={title}
                                        >
                                            {title}
                                        </a>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-sm font-semibold mb-4">
                            Điều khoản
                        </h3>
                        <ul>
                            {RULES_ITEMS.map(({ href, title }, index) => (
                                <li className="mb-2" key={index}>
                                    <Link href={href}>
                                        <a
                                            className="inline-block text-xs text-white"
                                            title={title}
                                        >
                                            {title}
                                        </a>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <div className="flex items-center mb-6">
                            <Image src={phone.src} width={20} height={20} />
                            <span className="text-white font-semibold ml-2 text-sm">
                                Đặt hàng: 1800 6936
                            </span>
                        </div>
                        <div className="flex items-center mb-6">
                            <Image src={map.src} width={20} height={20} />
                            <span className=" font-semibold ml-2 text-sm">
                                Liên hệ
                            </span>
                        </div>
                        <p className="text-xs leading-5">
                            Tầng 3-4 Hub Building 195/10E Điện Biên Phủ, P.15 ,
                            Q.Bình Thạnh, TP.Hồ Chí Minh
                        </p>
                    </div>
                    <div>
                        <iframe
                            src="https://www.facebook.com/plugins/page.php?href=https%3A%2F%2Fwww.facebook.com%2FThe.Coffee.House.2014%2F&tabs=timeline&width=270&height=130&small_header=false&adapt_container_width=true&hide_cover=false&show_facepile=true&appId=995340251103954"
                            width="270"
                            height="130"
                            className="border-none overflow-hidden mb-6"
                            scrolling="no"
                            frameBorder="0"
                            allowFullScreen
                            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                        />
                        <ul className="flex gap-x-3">
                            {SOCIAL_lINKS.map(({ href, img }, index) => (
                                <li key={index}>
                                    <a
                                        href={href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Image
                                            src={img}
                                            width={24}
                                            height={24}
                                        />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
